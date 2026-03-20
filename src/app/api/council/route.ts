import { NextRequest, NextResponse } from "next/server";
import { CouncilRequest, Round } from "@/types/council";
import {
  getPersona,
  getNirnayaPrompt,
  PERSONAS,
  NIRNAYA_MODEL,
} from "@/lib/prompts";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function callOpenRouter(
  model: string,
  systemPrompt: string,
  userMessage: string,
  maxTokens: number,
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://Varant.app",
        "X-Title": "Varant - Multi-AI Debate Engine",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.8,
        max_tokens: maxTokens,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error("OpenRouter API error:", errorData);
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated";
}

async function callOpenRouterStream(
  model: string,
  systemPrompt: string,
  userMessage: string,
  maxTokens: number,
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://Varant.app",
        "X-Title": "Varant - Multi-AI Debate Engine",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.8,
        max_tokens: maxTokens,
        stream: true,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error("OpenRouter API error:", errorData);
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  return response.body;
}

export async function POST(req: NextRequest) {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "your_key_here") {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured. Add it to .env.local" },
      { status: 500 },
    );
  }

  try {
    const body: CouncilRequest = await req.json();
    const {
      type,
      question,
      context,
      round,
      personaId,
      previousResponses,
      interjection,
      content,
    } = body;

    if (!question && type !== "summary" && type !== "unseen_questions") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 },
      );
    }

    // ─── Interruption Question ───
    if (type === "interruption_question") {
      const round1Summary = (previousResponses || [])
        .filter((r) => r.round === Round.PRATHAM_PAKSHA)
        .map((r) => {
          const p = PERSONAS.find((p) => p.id === r.personaId);
          return `[${p?.name || r.personaId}]: ${r.content}`;
        })
        .join("\n\n");

      const content = await callOpenRouter(
        "google/gemini-2.5-flash-lite",
        `You are Vitarka (वितर्क) — a sharp, direct critical thinker. You ask uncomfortable questions that cut through vague thinking.`,
        `The user's decision question: "${question}"${context ? `\nContext: ${context}` : ""}\n\nHere are the Pratham Paksha responses:\n${round1Summary}\n\nBased on these responses and the user's question, generate ONE sharp, uncomfortable Prashna (essential question) that you (Vitarka) would ask the user directly. It should be specific to their situation, not generic. Max 25 words. Do NOT use quotes around the question. Just output the question.`,
        100,
      );

      return NextResponse.json({
        personaId: "skeptic",
        question: content.trim().replace(/^["']|["']$/g, ""),
      });
    }

    // ─── Tension Score ───
    if (type === "tension_score") {
      const responseSummary = (previousResponses || [])
        .map((r) => {
          const p = PERSONAS.find((p) => p.id === r.personaId);
          return `[${p?.name || r.personaId}]: ${r.content}`;
        })
        .join("\n\n");

      const content = await callOpenRouter(
        "google/gemini-2.5-flash-lite",
        "You are a neutral analyst. You measure disagreement levels.",
        `Given these Sabha responses about "${question}":\n\n${responseSummary}\n\nOutput ONLY a number 0-100 representing how divided the Sabha is. 0 = full consensus, 100 = complete disagreement. No explanation, just the number.`,
        10,
      );

      const score = Math.min(
        100,
        Math.max(0, parseInt(content.trim(), 10) || 50),
      );
      return NextResponse.json({ score });
    }
    // ─── Summary ───
    if (type === "summary") {
      const persona = PERSONAS.find((p) => p.id === personaId);
      const result = await callOpenRouter(
        "google/gemini-2.5-flash-lite",
        `You are a razor-sharp summarizer. Your job is to compress a thinker's response into 2-3 punchy sentences that capture their core stance and reasoning — nothing more. Rules: use **bold** for the single most critical insight only. No filler, no preamble, no "In summary". Write in the speaker's voice. Always write complete sentences — never cut off.`,
        `Compress this response from ${persona?.name || personaId} into 2-3 complete sentences. Bold only the sharpest insight:\n\n${content}`,
        200,
      );
      return NextResponse.json({ summary: result.trim() });
    }
    // ─── Unseen to Questions ───
    if (type === "unseen_questions") {
      const result = await callOpenRouter(
        "google/gemini-2.5-flash-lite",
        `You are Vitarka (वितर्क). Convert observations about missing information into sharp, direct questions addressed to the user. Each question should be max 15 words. Output ONLY the questions, one per line, no numbering, no bullets.`,
        `Convert each of these missing information observations into a direct question for the user:\n\n${content}`,
        200,
      );
      const questions = result
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 10 && l.includes("?"));
      return NextResponse.json({ questions });
    }

    // ─── Nirnaya (non-streaming) ───
    if (type === "verdict" || round === Round.NIRNAYA) {
      const systemPrompt = getNirnayaPrompt();
      const model = NIRNAYA_MODEL;

      const responseSummary = (previousResponses || [])
        .map((r) => {
          const p = PERSONAS.find((p) => p.id === r.personaId);
          return `[${p?.name || r.personaId} — Round ${r.round}]\n${r.content}`;
        })
        .join("\n\n---\n\n");

      const userMessage = `The decision question: "${question}"${context ? `\n\nAdditional context: ${context}` : ""}${interjection ? `\n\nUser's interjection during the Sabha: "${interjection}"` : ""}\n\nHere are all the responses from the Sabha:\n\n${responseSummary}\n\nNow produce your final structured Nirnaya.`;

      const content = await callOpenRouter(
        model,
        systemPrompt,
        userMessage,
        1200,
      );
      return NextResponse.json({ content, personaId, round });
    }

    // ─── Persona Response (streaming SSE) ───
    if (!personaId) {
      return NextResponse.json(
        { error: "personaId is required" },
        { status: 400 },
      );
    }

    const persona = getPersona(personaId);
    let userMessage: string;
    const maxTokens = 500;

    if (round === Round.KHANDANA) {
      const round1Summary = (previousResponses || [])
        .filter((r) => r.round === Round.PRATHAM_PAKSHA)
        .map((r) => {
          const p = PERSONAS.find((p) => p.id === r.personaId);
          return `[${p?.name || r.personaId}]: ${r.content}`;
        })
        .join("\n\n");

      userMessage = `The decision question: "${question}"${context ? `\n\nContext: ${context}` : ""}${interjection ? `\n\nThe user has interjected with this additional context: "${interjection}"` : ""}\n\nHere are all four initial voices from Pratham Paksha:\n\n${round1Summary}\n\nNow critique, challenge, or build on what the other voices said. You MUST START your response with the format: REBUTTING [Voice Name]: "[one key sentence you're challenging from them]" on the first line, then write your rebuttal on the next line. Pick the voice you disagree with most. Keep your total response to ~100 words.`;
    } else {
      userMessage = `The decision question: "${question}"${context ? `\n\nAdditional context: ${context}` : ""}\n\nGive your perspective on this decision. Keep your response to 100-150 words.`;
    }

    // Stream with SSE
    const upstreamBody = await callOpenRouterStream(
      persona.model,
      persona.systemPrompt,
      userMessage,
      maxTokens,
    );

    if (!upstreamBody) {
      return NextResponse.json({ error: "No stream body" }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstreamBody.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;

              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ token: "", done: true })}\n\n`,
                  ),
                );
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const token = parsed.choices?.[0]?.delta?.content || "";
                if (token) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ token, done: false })}\n\n`,
                    ),
                  );
                }
              } catch {
                // Skip unparseable chunks
              }
            }
          }

          // Ensure we send a done signal
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ token: "", done: true })}\n\n`,
            ),
          );
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream failed", done: true })}\n\n`,
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Sabha API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
