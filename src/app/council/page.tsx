"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PersonaCard from "@/components/PersonaCard";
import RoundProgress from "@/components/RoundProgress";
import InterjectionBar from "@/components/InterjectionBar";
import InterruptionModal from "@/components/InterruptionModal";
import TensionMeter from "@/components/TensionMeter";
import { PERSONAS } from "@/lib/prompts";
import {
  PersonaResponse,
  Round,
  PersonaId,
  PersonaStatus,
} from "@/types/council";
import {
  extractMatra,
  extractRecommendation,
  saveToSmriti,
} from "@/lib/smriti";

async function streamPersona(
  params: {
    question: string;
    context: string;
    round: Round;
    personaId: PersonaId;
    previousResponses?: {
      personaId: PersonaId;
      round: Round;
      content: string;
    }[];
    interjection?: string;
  },
  onToken: (token: string) => void,
): Promise<string> {
  const res = await fetch("/api/council", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "persona", ...params }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No readable stream");

  const decoder = new TextDecoder();
  let fullContent = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data: ")) continue;

      try {
        const data = JSON.parse(trimmed.slice(6));
        if (data.done) continue;
        if (data.token) {
          fullContent += data.token;
          onToken(fullContent);
        }
      } catch {
        // Skip
      }
    }
  }

  return fullContent;
}

async function callCouncilJSON(body: Record<string, unknown>) {
  const res = await fetch("/api/council", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

const PERSONA_ORDER: PersonaId[] = [
  "skeptic",
  "optimist",
  "pragmatist",
  "devils-advocate",
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function CouncilScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [currentRound, setCurrentRound] = useState(1);

  const [round1Responses, setRound1Responses] = useState<PersonaResponse[]>([]);
  const [round2Responses, setRound2Responses] = useState<PersonaResponse[]>([]);
  const [personaStatuses, setPersonaStatuses] = useState<
    Record<PersonaId, PersonaStatus>
  >({
    skeptic: "waiting",
    optimist: "waiting",
    pragmatist: "waiting",
    "devils-advocate": "waiting",
  });

  const [interjection, setInterjection] = useState("");
  const [interjectionSubmitted, setInterjectionSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [round1Complete, setRound1Complete] = useState(false);
  const [round2Complete, setRound2Complete] = useState(false);

  const [showInterruption, setShowInterruption] = useState(false);
  const [interruptionQuestion, setInterruptionQuestion] = useState("");
  const [interruptionPersona, setInterruptionPersona] =
    useState<PersonaId>("skeptic");
  const [interruptionAnswer, setInterruptionAnswer] = useState("");
  const [interruptionDismissed, setInterruptionDismissed] = useState(false);

  const [tensionScore, setTensionScore] = useState<number | null>(null);

  const hasStartedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const tensionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
      )
        .fromTo(
          questionRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          tensionRef.current,
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7 },
          "-=0.6",
        )
        .fromTo(
          ".gs-persona-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("Varant_session");
    if (!stored) {
      router.push("/");
      return;
    }
    const data = JSON.parse(stored);
    setQuestion(data.question);
    setContext(data.context || "");
  }, [router]);

  const updateResponse = useCallback(
    (round: Round, personaId: PersonaId, updates: Partial<PersonaResponse>) => {
      const setter =
        round === Round.PRATHAM_PAKSHA
          ? setRound1Responses
          : setRound2Responses;
      setter((prev) => {
        const existing = prev.find((r) => r.personaId === personaId);
        if (existing)
          return prev.map((r) =>
            r.personaId === personaId ? { ...r, ...updates } : r,
          );
        return [
          ...prev,
          {
            personaId,
            round,
            content: "",
            loading: false,
            error: null,
            status: "waiting" as PersonaStatus,
            ...updates,
          },
        ];
      });
    },
    [],
  );

  const runRound1 = useCallback(async () => {
    if (!question) return;
    setIsProcessing(true);

    const initial: PersonaResponse[] = PERSONA_ORDER.map((id) => ({
      personaId: id,
      round: Round.PRATHAM_PAKSHA,
      content: "",
      loading: false,
      error: null,
      status: "waiting" as PersonaStatus,
    }));
    setRound1Responses(initial);
    setPersonaStatuses({
      skeptic: "waiting",
      optimist: "waiting",
      pragmatist: "waiting",
      "devils-advocate": "waiting",
    });

    const completedResponses: PersonaResponse[] = [];

    for (const personaId of PERSONA_ORDER) {
      setPersonaStatuses((prev) => ({ ...prev, [personaId]: "speaking" }));
      updateResponse(Round.PRATHAM_PAKSHA, personaId, {
        loading: true,
        status: "speaking",
      });

      try {
        const content = await streamPersona(
          { question, context, round: Round.PRATHAM_PAKSHA, personaId },
          (sc) =>
            updateResponse(Round.PRATHAM_PAKSHA, personaId, {
              content: sc,
              loading: true,
              status: "speaking",
            }),
        );
        setPersonaStatuses((prev) => ({ ...prev, [personaId]: "done" }));
        updateResponse(Round.PRATHAM_PAKSHA, personaId, {
          content,
          loading: false,
          status: "done",
        });
        completedResponses.push({
          personaId,
          round: Round.PRATHAM_PAKSHA,
          content,
          loading: false,
          error: null,
          status: "done",
        });
      } catch (err) {
        setPersonaStatuses((prev) => ({ ...prev, [personaId]: "done" }));
        updateResponse(Round.PRATHAM_PAKSHA, personaId, {
          content: "",
          loading: false,
          error: err instanceof Error ? err.message : "Error",
          status: "done",
        });
        completedResponses.push({
          personaId,
          round: Round.PRATHAM_PAKSHA,
          content: "",
          loading: false,
          error: err instanceof Error ? err.message : "Error",
          status: "done",
        });
      }

      if (personaId !== PERSONA_ORDER[PERSONA_ORDER.length - 1])
        await delay(400);
    }

    setRound1Complete(true);
    setIsProcessing(false);

    const prevResponses = completedResponses
      .filter((r) => r.content)
      .map((r) => ({
        personaId: r.personaId,
        round: r.round,
        content: r.content,
      }));
    try {
      const [tensionData, interruptionData] = await Promise.all([
        callCouncilJSON({
          type: "tension_score",
          question,
          previousResponses: prevResponses,
        }),
        callCouncilJSON({
          type: "interruption_question",
          question,
          context,
          previousResponses: prevResponses,
        }),
      ]);
      setTensionScore(tensionData.score);
      setInterruptionPersona(interruptionData.personaId || "skeptic");
      setInterruptionQuestion(interruptionData.question || "");
      setShowInterruption(true);
    } catch (err) {
      console.error("Post-round1 calls failed:", err);
    }
  }, [question, context, updateResponse]);

  const runRound2 = useCallback(async () => {
    setIsProcessing(true);
    setCurrentRound(2);
    setPersonaStatuses({
      skeptic: "waiting",
      optimist: "waiting",
      pragmatist: "waiting",
      "devils-advocate": "waiting",
    });

    const initial: PersonaResponse[] = PERSONA_ORDER.map((id) => ({
      personaId: id,
      round: Round.KHANDANA,
      content: "",
      loading: false,
      error: null,
      status: "waiting" as PersonaStatus,
    }));
    setRound2Responses(initial);

    const prevResponses = round1Responses
      .filter((r) => r.content && !r.error)
      .map((r) => ({
        personaId: r.personaId,
        round: r.round,
        content: r.content,
      }));
    const combinedInterjection = [interjection, interruptionAnswer]
      .filter(Boolean)
      .join("\n\n");
    const completedResponses: PersonaResponse[] = [];

    for (const personaId of PERSONA_ORDER) {
      setPersonaStatuses((prev) => ({ ...prev, [personaId]: "speaking" }));
      updateResponse(Round.KHANDANA, personaId, {
        loading: true,
        status: "speaking",
      });

      try {
        const content = await streamPersona(
          {
            question,
            context,
            round: Round.KHANDANA,
            personaId,
            previousResponses: prevResponses,
            interjection: combinedInterjection || undefined,
          },
          (sc) =>
            updateResponse(Round.KHANDANA, personaId, {
              content: sc,
              loading: true,
              status: "speaking",
            }),
        );
        setPersonaStatuses((prev) => ({ ...prev, [personaId]: "done" }));
        updateResponse(Round.KHANDANA, personaId, {
          content,
          loading: false,
          status: "done",
        });
        completedResponses.push({
          personaId,
          round: Round.KHANDANA,
          content,
          loading: false,
          error: null,
          status: "done",
        });
      } catch (err) {
        setPersonaStatuses((prev) => ({ ...prev, [personaId]: "done" }));
        updateResponse(Round.KHANDANA, personaId, {
          content: "",
          loading: false,
          error: err instanceof Error ? err.message : "Error",
          status: "done",
        });
        completedResponses.push({
          personaId,
          round: Round.KHANDANA,
          content: "",
          loading: false,
          error: err instanceof Error ? err.message : "Error",
          status: "done",
        });
      }

      if (personaId !== PERSONA_ORDER[PERSONA_ORDER.length - 1])
        await delay(400);
    }

    setRound2Complete(true);
    setIsProcessing(false);

    const allResponses = [
      ...prevResponses,
      ...completedResponses
        .filter((r) => r.content)
        .map((r) => ({
          personaId: r.personaId,
          round: r.round,
          content: r.content,
        })),
    ];
    try {
      const tensionData = await callCouncilJSON({
        type: "tension_score",
        question,
        previousResponses: allResponses,
      });
      setTensionScore(tensionData.score);
    } catch (err) {
      console.error("Tension refetch failed:", err);
    }
  }, [
    question,
    context,
    round1Responses,
    interjection,
    interruptionAnswer,
    updateResponse,
  ]);

  const runVerdict = useCallback(async () => {
    setIsProcessing(true);
    setCurrentRound(3);

    const allPrev = [
      ...round1Responses
        .filter((r) => r.content)
        .map((r) => ({
          personaId: r.personaId,
          round: r.round,
          content: r.content,
        })),
      ...round2Responses
        .filter((r) => r.content)
        .map((r) => ({
          personaId: r.personaId,
          round: r.round,
          content: r.content,
        })),
    ];
    const combinedInterjection = [interjection, interruptionAnswer]
      .filter(Boolean)
      .join("\n\n");

    try {
      const data = await callCouncilJSON({
        type: "verdict",
        question,
        context,
        round: Round.NIRNAYA,
        previousResponses: allPrev,
        interjection: combinedInterjection || undefined,
      });
      const verdictPayload = {
        question,
        context,
        round1Responses: round1Responses.filter((r) => r.content),
        round2Responses: round2Responses.filter((r) => r.content),
        verdictRaw: data.content,
      };
      sessionStorage.setItem("Varant_verdict", JSON.stringify(verdictPayload));

      // Save to Smriti
      saveToSmriti({
        question,
        context,
        verdictRaw: data.content,
        matraScore: extractMatra(data.content),
        recommendation: extractRecommendation(data.content),
      });

      router.push("/verdict");
    } catch (err) {
      console.error("Verdict error:", err);
      setIsProcessing(false);
    }
  }, [
    question,
    context,
    round1Responses,
    round2Responses,
    interjection,
    interruptionAnswer,
    router,
  ]);

  useEffect(() => {
    if (question && !hasStartedRef.current) {
      hasStartedRef.current = true;
      runRound1();
    }
  }, [question, runRound1]);

  const handleInterjection = (text: string) => {
    setInterjection(text);
    setInterjectionSubmitted(true);
  };
  const handleInterruptionAnswer = (answer: string) => {
    setInterruptionAnswer(answer);
    setShowInterruption(false);
    setInterruptionDismissed(true);
  };
  const handleInterruptionSkip = () => {
    setShowInterruption(false);
    setInterruptionDismissed(true);
  };

  const activeRound = currentRound;
  const activeResponses = activeRound === 1 ? round1Responses : round2Responses;
  const showProceedToRound2 =
    round1Complete &&
    !round2Complete &&
    currentRound === 1 &&
    (interruptionDismissed || !showInterruption);

  return (
    <>
      <div className="fixed inset-0 z-[-2] varant-council-bg" />
      <div
        className="varant-grain-overlay fixed inset-0 z-[-1]"
        aria-hidden="true"
      />

      <main
        className="min-h-screen pb-24 font-sans bg-transparent"
        ref={containerRef}
      >
        {/* Header — Sarvam-inspired: clean, disciplined */}
        <div
          className="pt-6 px-4 sm:px-6 sticky top-4 z-50 pointer-events-none flex justify-center"
          ref={headerRef}
        >
          <div className="bg-white/90 backdrop-blur-xl border border-[#E8E3DC]/80 rounded-full px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between gap-8 pointer-events-auto min-w-0 max-w-2xl w-full">
            <a
              href="/"
              className="text-[15px] font-semibold tracking-[-0.01em] text-[#1A1510] shrink-0"
            >
              <span className="bg-[linear-gradient(135deg,#D97706_0%,#9B1C1C_50%,#1E3A8A_100%)] bg-clip-text text-transparent">
                v
              </span>
              arant
            </a>
            <RoundProgress currentRound={currentRound} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            {/* Core Inquiry — gradient accent, geometric */}
            <div
              ref={questionRef}
              className="lg:col-span-8 varant-council-card rounded-2xl p-8 md:p-10 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="h-px w-5 bg-[linear-gradient(90deg,#D97706,#9B1C1C)] opacity-60" />
                <span className="text-[10px] font-semibold text-[#767676] uppercase tracking-[0.18em]">
                  प्रश्न · The Core Inquiry
                </span>
              </div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-display)] text-[#1A1510] leading-[1.1] tracking-tight">
                &ldquo;{question}&rdquo;
              </p>
            </div>

            {/* Tension — Sangharsha */}
            <div ref={tensionRef} className="lg:col-span-4">
              <TensionMeter score={tensionScore} />
            </div>

            {/* Sabha debate — four voices in conversation */}
            <div className="lg:col-span-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px flex-1 max-w-[80px] bg-[linear-gradient(90deg,transparent,#D97706)] opacity-60" />
                <span className="text-[11px] font-semibold text-[#78716c] uppercase tracking-[0.12em]">
                  {currentRound === 1
                    ? "वाद-विवाद · The debate begins"
                    : "खंडन · Cross-examination"}{" "}
                  — four voices in dialogue
                </span>
                <span className="h-px flex-1 max-w-[80px] bg-[linear-gradient(90deg,#9B1C1C,transparent)] opacity-60" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {PERSONAS.map((persona) => (
                  <div
                    key={`${persona.id}-${activeRound}`}
                    className="h-full gs-persona-card"
                  >
                    <PersonaCard
                      persona={persona}
                      response={activeResponses.find(
                        (r) => r.personaId === persona.id,
                      )}
                      status={personaStatuses[persona.id]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Proceed to Khandana */}
          {showProceedToRound2 && (
            <div className="flex justify-center pt-12 pb-8">
              <button
                onClick={runRound2}
                disabled={isProcessing}
                className="bg-[#1A1510] text-white px-8 py-3.5 rounded-full text-[14px] font-medium hover:bg-[#9B1C1C] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                Proceed to Khandana
                <span className="text-[#D97706]">→</span>
              </button>
            </div>
          )}

          {/* Render Nirnaya */}
          {round2Complete && currentRound === 2 && (
            <div className="flex justify-center pt-12 pb-8">
              <button
                onClick={runVerdict}
                disabled={isProcessing}
                className="bg-white/90 backdrop-blur-md text-[#1A1510] border border-[#E8E3DC] rounded-full px-8 py-3.5 text-[14px] font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(155,28,28,0.08)] hover:border-[#9B1C1C]/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                Render the Nirnaya
              </button>
            </div>
          )}

          {currentRound === 3 && isProcessing && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-6 h-6 border-2 border-[#E8E3DC] border-t-[#D97706] rounded-full animate-spin" />
              <p className="text-[10px] font-semibold text-[#767676] uppercase tracking-[0.18em]">
                Nirnaya is deliberating
              </p>
            </div>
          )}
        </div>

        {currentRound <= 2 && (
          <InterjectionBar
            onSubmit={handleInterjection}
            disabled={isProcessing}
            submitted={interjectionSubmitted}
            submittedText={interjection}
          />
        )}

        {showInterruption && interruptionQuestion && (
          <InterruptionModal
            personaId={interruptionPersona}
            question={interruptionQuestion}
            onAnswer={handleInterruptionAnswer}
            onSkip={handleInterruptionSkip}
          />
        )}
      </main>
    </>
  );
}
