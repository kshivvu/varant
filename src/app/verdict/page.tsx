"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle2, Zap, Search, Target } from "lucide-react";
import VerdictCard, { ConfidenceBar } from "@/components/VerdictCard";
import { VerdictData } from "@/types/council";
import { useChime } from "@/hooks/useChime";
import Link from "next/link";
import InterruptionModal from "@/components/InterruptionModal";

import jsPDF from "jspdf";

async function exportShastra(
  question: string,
  verdict: VerdictData,
  matraScore: number,
) {
  const res = await fetch("/api/shastra", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, verdict, matraScore }),
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `shastra-${Date.now()}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
function parseVerdict(raw: string): VerdictData {
  const sections: Record<string, string> = {};
  const sectionHeaders = [
    "Consensus Points",
    "Consensus",
    "Key Tensions",
    "Tensions",
    "Recommendation",
    "Matra",
    "The Unseen",
    "What You\u2019re Missing",
    "What's Missing",
    "Missing Information",
    "What You Need",
  ];

  const normalized = raw.replace(/[\u2018\u2019]/g, "'");
  let currentSection = "";

  for (const line of normalized.split("\n")) {
    const trimmed = line.trim();
    const cleanedLine = trimmed.replace(/^#+\s*/, "").replace(/\*\*/g, "");

    const matchedHeader = sectionHeaders.find((h) =>
      cleanedLine.toLowerCase().startsWith(h.toLowerCase()),
    );

    if (matchedHeader) {
      if (matchedHeader === "Consensus") currentSection = "Consensus Points";
      else if (matchedHeader === "Tensions") currentSection = "Key Tensions";
      else if (
        matchedHeader.toLowerCase().includes("missing") ||
        matchedHeader.toLowerCase().includes("need") ||
        matchedHeader.toLowerCase().includes("unseen")
      )
        currentSection = "The Unseen";
      else currentSection = matchedHeader;
      sections[currentSection] = "";
    } else if (currentSection) {
      sections[currentSection] = (
        sections[currentSection] +
        "\n" +
        trimmed
      ).trim();
    }
  }

  let confidence = 65;
  let confidenceExplanation = "";
  const confidenceRaw = sections["Matra"] || sections["Confidence Score"] || "";

  const pipeMatch = confidenceRaw.match(/(\d+)\s*\|?\s*([\s\S]*)/);
  if (pipeMatch) {
    confidence = Math.min(100, Math.max(0, parseInt(pipeMatch[1], 10)));
    confidenceExplanation = pipeMatch[2]?.trim() || "";
  } else {
    const numMatch = confidenceRaw.match(/(\d+)/);
    if (numMatch)
      confidence = Math.min(100, Math.max(0, parseInt(numMatch[1], 10)));
    confidenceExplanation = confidenceRaw
      .replace(/\d+%?/, "")
      .replace(/\|/, "")
      .trim();
  }

  return {
    consensus: sections["Consensus Points"] || "No consensus data available.",
    tensions: sections["Key Tensions"] || "No tension data available.",
    recommendation:
      sections["Recommendation"] || "No recommendation available.",
    confidence,
    confidenceExplanation,
    missing:
      sections["The Unseen"] ||
      sections["What You're Missing"] ||
      "No missing info identified.",
  };
}

export default function VerdictScreen() {
  const [showContinue, setShowContinue] = useState(false);
  const [continueContext, setContinueContext] = useState("");
  const [unseenQuestions, setUnseenQuestions] = useState<string[]>([]);
  const [unseenIndex, setUnseenIndex] = useState(0);
  const [unseenAnswers, setUnseenAnswers] = useState<string[]>([]);
  const [showUnseenModal, setShowUnseenModal] = useState(false);
  const [continueReady, setContinueReady] = useState(false);
  const router = useRouter();
  const [verdict, setVerdict] = useState<VerdictData | null>(null);
  const [rawVerdict, setRawVerdict] = useState("");
  const [question, setQuestion] = useState("");
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const { playChime, isMuted, toggleMute } = useChime();
  const scoreAnimStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("Varant_verdict");
    if (!stored) {
      router.push("/");
      return;
    }
    const data = JSON.parse(stored);
    setQuestion(data.question);
    setRawVerdict(data.verdictRaw);
    setVerdict(parseVerdict(data.verdictRaw));
  }, [router]);
  const launchContinuation = async () => {
    // Extract raw unseen text
    const unseenMatch = rawVerdict.match(
      /##\s*The Unseen\s*([\s\S]*?)(?=##|$)/,
    );
    const unseenRaw = unseenMatch ? unseenMatch[1].trim() : "";

    if (!unseenRaw) {
      submitContinuation([]);
      return;
    }

    // Convert observations to actual questions via AI
    try {
      const res = await fetch("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "unseen_questions",
          question: "",
          content: unseenRaw,
        }),
      });
      const data = await res.json();
      const questions: string[] = data.questions || [];

      if (questions.length > 0) {
        setUnseenQuestions(questions);
        setUnseenIndex(0);
        setShowUnseenModal(true);
      } else {
        submitContinuation([]);
      }
    } catch {
      submitContinuation([]);
    }
  };

  const handleUnseenAnswer = (answer: string) => {
    const newAnswers = [...unseenAnswers, answer];
    setUnseenAnswers(newAnswers);

    if (unseenIndex + 1 < unseenQuestions.length) {
      setUnseenIndex((i) => i + 1);
    } else {
      setShowUnseenModal(false);
      submitContinuation(newAnswers);
    }
  };

  const handleUnseenSkip = () => {
    const newAnswers = [...unseenAnswers, ""];
    setUnseenAnswers(newAnswers);

    if (unseenIndex + 1 < unseenQuestions.length) {
      setUnseenIndex((i) => i + 1);
    } else {
      setShowUnseenModal(false);
      submitContinuation(newAnswers);
    }
  };

  const submitContinuation = (answers: string[]) => {
    const unseenSection = unseenQuestions
      .map((q, i) => (answers[i] ? `Q: ${q}\nA: ${answers[i]}` : ""))
      .filter(Boolean)
      .join("\n\n");

    const enrichedContext = [
      `[Previous Nirnaya]\n${rawVerdict}`,
      continueContext ? `[Additional Context]\n${continueContext}` : "",
      unseenSection ? `[Answers to The Unseen]\n${unseenSection}` : "",
    ]
      .filter(Boolean)
      .join("\n\n---\n\n");

    sessionStorage.setItem(
      "Varant_session",
      JSON.stringify({
        question,
        context: enrichedContext,
        isContinuation: true,
      }),
    );

    router.push("/council");
  };
  useGSAP(
    () => {
      if (!verdict) return;

      // Premium cinematic GSAP timeline entry
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });

      tl.fromTo(
        headerRef.current,
        { y: -40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
      )
        .fromTo(
          questionRef.current,
          { y: 30, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
          "-=0.6",
        )
        .fromTo(
          ".gs-verdict-card",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: {
              each: 0.3,
              onStart: () => {
                playChime();
              },
            },
          },
          "-=0.6",
        )
        .fromTo(
          ".gs-actions",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4",
        );
    },
    { scope: containerRef, dependencies: [verdict] },
  );

  useEffect(() => {
    if (verdict && !scoreAnimStarted.current) {
      scoreAnimStarted.current = true;
      const target = verdict.confidence;
      const duration = 1500;

      // Delay score animation until it appears in the GSAP cascade
      setTimeout(() => {
        const startTime = performance.now();
        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setAnimatedScore(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, 2400);
    }
  }, [verdict]);

  const copyToClipboard = useCallback(async () => {
    const text = `VARANT SHASTRA\n${"=".repeat(40)}\n\nQuestion: ${question}\n\n${rawVerdict}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [question, rawVerdict]);

  const startNew = () => {
    sessionStorage.removeItem("Varant_session");
    sessionStorage.removeItem("Varant_verdict");
    router.push("/");
  };
  const [continuationLoading, setContinuationLoading] = useState(false);
  if (!verdict) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#E8711A]/20 border-t-[#E8711A] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-screen sarvam-hero-grad z-[-1] opacity-70" />

      <main className="min-h-screen pb-24 font-sans" ref={containerRef}>
        {/* Dynamic Island Header */}
        <div
          className="pt-8 px-6 sticky top-6 z-50 flex justify-center pointer-events-none"
          ref={headerRef}
        >
          <div className="bg-white/80 backdrop-blur-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-6 py-3 flex items-center justify-between gap-12 pointer-events-auto transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] min-w-[320px]">
            <h1 className="text-xl font-normal tracking-[-0.02em] font-[family-name:var(--font-display)] text-[#1A1A1A]">
              <span className="text-[#E8711A]">V</span>arant
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase">
                Nirnaya
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 mt-4">
          {/* Question / Hero Block */}
          <div
            ref={questionRef}
            className="w-full bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[32px] p-10 md:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.04)] mb-8 flex flex-col justify-center"
          >
            <span className="text-[11px] font-bold text-[#767676] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
              The Sabha&apos;s Final Nirnaya
            </span>
            <p className="text-4xl md:text-5xl lg:text-5xl font-[family-name:var(--font-display)] text-[#1A1A1A] leading-[1.2] tracking-tight">
              &quot;{question}&quot;
            </p>
          </div>

          {/* Verdict Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Full Width Consensus */}
            <div className="md:col-span-12 gs-verdict-card h-full">
              <VerdictCard
                className="h-full"
                title="Consensus Points"
                icon={<CheckCircle2 className="w-5 h-5" />}
                accentColor="border-l-[3px] border-l-[#4CAF70]"
                content={verdict.consensus}
              />
            </div>

            {/* Split Middle: Tensions & The Unseen */}
            <div className="md:col-span-6 gs-verdict-card h-full">
              <VerdictCard
                className="h-full"
                title="Key Tensions"
                icon={<Zap className="w-5 h-5" />}
                accentColor="border-l-[3px] border-l-[#F5A623]"
                content={verdict.tensions}
              />
            </div>

            <div className="md:col-span-6 gs-verdict-card h-full">
              <VerdictCard
                className="h-full"
                title="The Unseen"
                icon={<Search className="w-5 h-5" />}
                accentColor="border-l-[3px] border-l-blue-400"
                content={verdict.missing}
              />
            </div>

            {/* Bottom: Recommendation alongside TensionMeter equivalent (ConfidenceBar) */}
            <div className="md:col-span-8 gs-verdict-card h-full">
              <VerdictCard
                className="h-full"
                title="Recommendation"
                icon={<Target className="w-5 h-5" />}
                accentColor="border-l-[3px] border-l-[#E8711A]"
                content={verdict.recommendation}
              />
            </div>

            <div className="md:col-span-4 gs-verdict-card h-full">
              <ConfidenceBar
                score={animatedScore}
                explanation={verdict.confidenceExplanation}
              />
            </div>
          </div>
          {/* Continue Vichar */}
          {!showContinue ? (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowContinue(true)}
                className="text-[13px] font-medium text-[#78716c] border border-[#E8E3DC] px-6 py-2.5 rounded-full hover:border-[#D97706]/40 hover:text-[#1A1510] transition-all"
              >
                ↩ Continue this Vichar
              </button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto mt-10 space-y-4">
              <div className="varant-council-card rounded-2xl p-6">
                <p className="text-[11px] font-semibold text-[#78716c] uppercase tracking-widest mb-3">
                  विचार जारी · Continue the Vichar
                </p>
                <p className="text-[13px] text-[#57534E] mb-4">
                  Add new context, constraints, or information. The Sabha will
                  reconvene with the previous Nirnaya as foundation — and The
                  Unseen questions will be asked before it begins.
                </p>
                <textarea
                  className="w-full text-[14px] p-4 border border-[#E8E3DC] rounded-xl bg-white/80 resize-none focus:outline-none focus:border-[#D97706]/50 min-h-[100px]"
                  placeholder="What's changed? New constraints, new information, a decision you've already made..."
                  value={continueContext}
                  onChange={(e) => setContinueContext(e.target.value)}
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={async () => {
                      setContinuationLoading(true);
                      await launchContinuation();
                      setContinuationLoading(false);
                    }}
                    disabled={continuationLoading}
                    className="bg-[#1A1510] text-white px-6 py-2.5 rounded-full text-[13px] font-semibold hover:bg-[#9B1C1C] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <span className="text-[#D97706]">⚖</span>
                    {continuationLoading
                      ? "Preparing questions..."
                      : "Reconvene the Sabha"}
                  </button>
                  <button
                    onClick={() => setShowContinue(false)}
                    className="text-[13px] text-[#A0998F] px-4 py-2.5 rounded-full hover:bg-[#F5F2EE] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Unseen modal — fires one question at a time */}
          {showUnseenModal && unseenQuestions[unseenIndex] && (
            <InterruptionModal
              personaId="skeptic"
              question={unseenQuestions[unseenIndex]}
              onAnswer={handleUnseenAnswer}
              onSkip={handleUnseenSkip}
            />
          )}
          {/* Actions */}
          <div className="flex flex-col items-center gap-6 mt-16 mb-24 gs-actions w-full">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={copyToClipboard}
                className="border border-[#E8E3DC] text-[#1A1510] px-6 py-3 rounded-full text-[14px] font-medium hover:border-[#D97706]/40 transition-all"
              >
                {copied ? "✓ Copied" : "📋 Copy Shastra"}
              </button>

              <button
                onClick={() =>
                  exportShastra(question, verdict, verdict.confidence)
                }
                className="border border-[#E8E3DC] text-[#1A1510] px-6 py-3 rounded-full text-[14px] font-medium hover:border-[#D97706]/40 transition-all"
              >
                📜 Export Shastra
              </button>
              <Link
                href="/smriti"
                className="border border-[#E8E3DC] text-[#1A1510] px-6 py-3 rounded-full text-[14px] font-medium hover:border-[#D97706]/40 transition-all flex items-center justify-center"
              >
                📖 View your Smriti
              </Link>
            </div>

            <button
              onClick={startNew}
              className="btn-primary px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] mt-2"
            >
              Begin a New Vichar →
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
