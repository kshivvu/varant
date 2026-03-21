"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import PersonaCard from "@/components/PersonaCard";
import VerdictCard, { ConfidenceBar } from "@/components/VerdictCard";
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
  VerdictData,
} from "@/types/council";
import { extractMatra, extractRecommendation } from "@/lib/smriti";
import {
  CheckCircle2,
  Zap,
  Search,
  Target,
  ArrowRight,
  Shield,
  Anchor,
  Copy,
  Check,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  color: string;
  isHost: boolean;
}

interface TeamMessage {
  id: string;
  memberName: string;
  content: string;
  type: string;
  createdAt: string;
}

function renderFormattedText(text: string) {
  // Replace **bold** and *bold* with <strong> tags
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#1A1510", fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <strong key={i} style={{ color: "#1A1510", fontWeight: 600 }}>
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

interface TeamSession {
  id: string;
  code: string;
  decision: string;
  context: string;
  status: string;
  members: TeamMember[];
  messages: TeamMessage[];
  shastra: string | null;
}

export default function TeamSessionPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;

  const [session, setSession] = useState<TeamSession | null>(null);
  const [myMember, setMyMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [personaResponses, setPersonaResponses] = useState<
    Record<PersonaId, string>
  >({
    skeptic: "",
    optimist: "",
    pragmatist: "",
    "devils-advocate": "",
  });
  const [personaStatuses, setPersonaStatuses] = useState<
    Record<PersonaId, PersonaStatus>
  >({
    skeptic: "waiting",
    optimist: "waiting",
    pragmatist: "waiting",
    "devils-advocate": "waiting",
  });

  const [tensionScore, setTensionScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sabhaStarted, setSabhaStarted] = useState(false);
  const [prashna, setPrashna] = useState("");
  const [targetVoice, setTargetVoice] = useState<string | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isPersonaTyping, setIsPersonaTyping] = useState<
    Record<PersonaId, boolean>
  >({
    skeptic: false,
    optimist: false,
    pragmatist: false,
    "devils-advocate": false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Session duration timer
  useEffect(() => {
    if (session?.status === "active") {
      const interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session?.status]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTensionLabel = (score: number | null) => {
    if (score === null) return "CALCULATING...";
    if (score < 30) return "LOW";
    if (score < 60) return "MODERATE";
    if (score < 85) return "HIGH";
    return "CRITICAL";
  };

  console.log("Session state:", session);
  console.log("Persona responses:", personaResponses);

  useGSAP(
    () => {
      gsap.from(".chamber-reveal", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch(`/api/team/${code}`);
      if (res.ok) {
        const data = await res.json();
        setSession(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
  }, [code]);

  const startSabha = useCallback(async () => {
    if (!session || sabhaStarted) return;
    setSabhaStarted(true);

    const PERSONA_ORDER: PersonaId[] = [
      "skeptic",
      "optimist",
      "pragmatist",
      "devils-advocate",
    ];

    for (const personaId of PERSONA_ORDER) {
      setPersonaStatuses((prev) => ({ ...prev, [personaId]: "speaking" }));
      setIsPersonaTyping((prev) => ({ ...prev, [personaId]: true }));

      try {
        if (!session.decision) throw new Error("No decision found in session");

        const response = await fetch("/api/council", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "persona",
            question: session.decision,
            context: session.context || "",
            round: Round.PRATHAM_PAKSHA,
            personaId: personaId,
          }),
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: `HTTP ${response.status}` }));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;

              try {
                const data = JSON.parse(trimmed.slice(6));
                if (data.token) {
                  fullContent += data.token;
                  setPersonaResponses((prev) => ({
                    ...prev,
                    [personaId]: fullContent,
                  }));
                }
              } catch (e) {}
            }
          }
        }

        setPersonaStatuses((prev) => ({ ...prev, [personaId]: "done" }));
        setIsPersonaTyping((prev) => ({ ...prev, [personaId]: false }));

        // Log to activity feed
        await fetch(`/api/team/${code}/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memberName: personaId.charAt(0).toUpperCase() + personaId.slice(1),
            content: `${personaId.charAt(0).toUpperCase() + personaId.slice(1)} has spoken.`,
            type: "activity",
          }),
        });
        fetchSession();
      } catch (error) {
        console.error(`Error streaming ${personaId}:`, error);
        setPersonaStatuses((prev) => ({ ...prev, [personaId]: "done" }));
        setIsPersonaTyping((prev) => ({ ...prev, [personaId]: false }));
      }

      // Small delay between personas
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }, [session, sabhaStarted, code, fetchSession]);

  // Initial load
  useEffect(() => {
    const stored = sessionStorage.getItem("Varant_team_member");
    if (!stored) {
      router.push(`/team/join/${code}`);
      return;
    }
    const member = JSON.parse(stored);
    if (member.code !== code) {
      router.push(`/team/join/${code}`);
      return;
    }
    setMyMember(member);
    fetchSession();
  }, [code, router, fetchSession]);

  // Trigger Sabha auto-start
  useEffect(() => {
    if (session && session.status === "active" && !sabhaStarted) {
      startSabha();
    }
  }, [session, sabhaStarted, startSabha]);

  // Polling for session updates
  useEffect(() => {
    if (!myMember) return;
    const interval = setInterval(fetchSession, 3000);
    return () => clearInterval(interval);
  }, [myMember, fetchSession]);

  // Auto-scroll activity feed
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session?.messages]);

  // Typing simulation
  useEffect(() => {
    if (session?.status === "active" && !isComplete) {
      const personas: PersonaId[] = [
        "skeptic",
        "optimist",
        "pragmatist",
        "devils-advocate",
      ];
      const interval = setInterval(() => {
        const randomPersona =
          personas[Math.floor(Math.random() * personas.length)];
        setIsPersonaTyping((prev) => ({ ...prev, [randomPersona]: true }));
        setTimeout(() => {
          setIsPersonaTyping((prev) => ({ ...prev, [randomPersona]: false }));
        }, 3000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [session?.status, session?.status === "complete" && session?.shastra]);

  const handleRaisePrashna = async () => {
    if (!prashna.trim() || !myMember || !session) return;
    const text = prashna.trim();
    const target = targetVoice;
    setPrashna("");

    // Log to activity feed
    await fetch(`/api/team/${code}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberName: myMember.name,
        content: target ? `@${target}: ${text}` : text,
        type: "prashna",
      }),
    });
    fetchSession();

    // Call council API with the prashna
    try {
      const response = await fetch("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "persona",
          question: session.decision,
          context: session.context,
          prashna: text,
          targetPersona: target?.toLowerCase() || null,
          round: Round.KHANDANA,
          previousResponses: personaResponses,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // Reset targeted voice(s) to show new response
      if (target) {
        const targetId = target.toLowerCase() as PersonaId;
        setPersonaResponses((prev) => ({ ...prev, [targetId]: "" }));
        setPersonaStatuses((prev) => ({ ...prev, [targetId]: "speaking" }));
        setIsPersonaTyping((prev) => ({ ...prev, [targetId]: true }));
      } else {
        setPersonaResponses({
          skeptic: "",
          optimist: "",
          pragmatist: "",
          "devils-advocate": "",
        });
        setPersonaStatuses({
          skeptic: "speaking",
          optimist: "speaking",
          pragmatist: "speaking",
          "devils-advocate": "speaking",
        });
        setIsPersonaTyping({
          skeptic: true,
          optimist: true,
          pragmatist: true,
          "devils-advocate": true,
        });
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            try {
              const data = JSON.parse(trimmed.slice(6));
              if (data.token) {
                if (target) {
                  const targetId = target.toLowerCase() as PersonaId;
                  setPersonaResponses((prev) => ({
                    ...prev,
                    [targetId]: prev[targetId] + data.token,
                  }));
                } else if (data.persona) {
                  const pId = data.persona as PersonaId;
                  setPersonaResponses((prev) => ({
                    ...prev,
                    [pId]: prev[pId] + data.token,
                  }));
                }
              }
            } catch (e) {}
          }
        }
      }

      // Mark as done
      if (target) {
        const targetId = target.toLowerCase() as PersonaId;
        setPersonaStatuses((prev) => ({ ...prev, [targetId]: "done" }));
        setIsPersonaTyping((prev) => ({ ...prev, [targetId]: false }));
      } else {
        setPersonaStatuses({
          skeptic: "done",
          optimist: "done",
          pragmatist: "done",
          "devils-advocate": "done",
        });
        setIsPersonaTyping({
          skeptic: false,
          optimist: false,
          pragmatist: false,
          "devils-advocate": false,
        });
      }
      fetchSession();
    } catch (error) {
      console.error("Prashna failed:", error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!myMember || !content.trim()) return;
    try {
      await fetch(`/api/team/${code}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberName: myMember.name,
          content,
          type: "prashna",
        }),
      });
      fetchSession();
    } catch (error) {
      console.error("Message send failed", error);
    }
  };

  const handleFinalize = async () => {
    if (!myMember?.isHost || !session) return;
    setIsProcessing(true);

    const mockVerdict: VerdictData = {
      consensus:
        "The team agreed that the risk of inaction outweighs the risk of pivot.",
      tensions:
        "Conflict between long-term vision and short-term survival metrics.",
      recommendation:
        "Execute the pivot immediately with a 3-month burn constraint.",
      confidence: 78,
      confidenceExplanation: "High consensus among advisors and founders.",
      missing:
        "Customer acquisition cost for the new segment remains unvalidated.",
    };

    try {
      await fetch(`/api/team/${code}/finalize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shastra: mockVerdict }),
      });
      fetchSession();
    } catch (error) {
      console.error("Finalization failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyShastra = () => {
    if (!session?.shastra) return;
    const verdict = JSON.parse(session.shastra);
    const text = `TEAM SHASTRA · ${code}\nMembers: ${session.members.map((m) => m.name).join(", ")}\n\nDecision: ${session.decision}\n\nRecommendation: ${verdict.recommendation}\nConfidence: ${verdict.confidence}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#E8E3DC] border-t-[#9B1C1C] animate-spin mx-auto mb-6 rounded-full" />
          <p
            style={{ fontFamily: "var(--font-mono), IBM Plex Mono, monospace" }}
            className="text-[10px] uppercase tracking-widest text-[#9B1C1C] font-bold"
          >
            ENTERING CHAMBER...
          </p>
        </div>
      </div>
    );
  }

  const isComplete = session.status === "complete" && session.shastra;
  const teamVerdict: VerdictData | null = isComplete
    ? JSON.parse(session.shastra!)
    : null;

  return (
    <div
      style={{
        backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(193,127,36,0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(46,91,138,0.04) 0%, transparent 50%)
      `,
      }}
      className="min-h-screen bg-[#FAF9F7] text-[#1A1510] flex overflow-hidden font-sans"
    >
      {/* LEFT SIDEBAR */}
      <aside className="w-[280px] bg-white border-r border-[#E8E3DC] flex flex-col p-6 shrink-0 shadow-sm relative z-20">
        <div className="border-b border-[#E8E3DC] pb-6 mb-6 flex items-center justify-between">
          <span
            style={{ fontFamily: "var(--font-mono), IBM Plex Mono, monospace" }}
            className="text-[11px] text-[#9B1C1C] tracking-[0.2em] font-bold"
          >
            VARANT
          </span>
          <span
            style={{ fontFamily: "var(--font-mono), IBM Plex Mono, monospace" }}
            className="text-[9px] text-[#767676] uppercase tracking-widest font-medium"
          >
            SABHA
          </span>
        </div>

        <div className="mb-8 p-4 bg-[#FAF9F7] rounded-xl border border-[#E8E3DC]/50">
          <div className="flex items-center justify-between mb-1">
            <span
              style={{
                fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
              }}
              className="text-[9px] text-[#767676] uppercase font-bold tracking-widest"
            >
              SESSION CODE
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
              }}
              className="text-[9px] text-[#4A4740] font-medium"
            >
              {formatDuration(sessionDuration)}
            </span>
          </div>
          <span
            style={{ fontFamily: "var(--font-mono), IBM Plex Mono, monospace" }}
            className="text-[16px] text-[#1A1510] tracking-[0.1em] uppercase font-bold"
          >
            {code}
          </span>
        </div>

        <div className="mb-8 flex-1 flex flex-col min-h-0">
          <span
            style={{ fontFamily: "var(--font-mono), IBM Plex Mono, monospace" }}
            className="text-[9px] text-[#767676] uppercase block mb-4 tracking-widest font-bold"
          >
            COUNCIL MEMBERS
          </span>
          <div className="space-y-1 overflow-y-auto pr-2 scrollbar-hide">
            {session.members.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  member.id === myMember?.id
                    ? "bg-[#9B1C1C]/5 border-[#9B1C1C]/20 shadow-sm"
                    : "bg-white border-transparent hover:border-[#E8E3DC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: member.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#1A1510] font-semibold leading-tight">
                      {member.name} {member.id === myMember?.id ? "(You)" : ""}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-mono), IBM Plex Mono, monospace",
                      }}
                      className="text-[9px] text-[#767676] uppercase tracking-tighter font-medium"
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
                {member.isHost && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9B1C1C] opacity-40" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span
                style={{
                  fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                }}
                className="text-[8px] font-bold text-[#767676] uppercase tracking-widest"
              >
                SANGHARSHA
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                }}
                className="text-[8px] font-bold text-[#9B1C1C]"
              >
                {getTensionLabel(tensionScore)}
              </span>
            </div>
            <TensionMeter score={tensionScore} />
          </div>

          <div className="p-4 bg-white border border-[#E8E3DC] rounded-xl">
            <span
              style={{
                fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
              }}
              className="text-[9px] text-[#767676] uppercase block mb-3 tracking-widest font-bold"
            >
              LATEST ACTIVITY
            </span>
            <div className="max-h-[120px] overflow-y-auto scrollbar-hide space-y-3">
              {session.messages
                .slice(-5)
                .reverse()
                .map((msg) => {
                  const member = session.members.find(
                    (m) => m.name === msg.memberName,
                  );
                  const isTargeted = msg.content.includes("@");
                  const targetMatch = msg.content.match(/@(\w+)/);
                  const targetName = targetMatch ? targetMatch[1] : null;

                  return (
                    <div key={msg.id} className="text-[10px] leading-tight">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: member?.color || "#767676",
                          }}
                        />
                        <span
                          className={`font-bold ${
                            msg.memberName === myMember?.name
                              ? "text-[#C17F24]"
                              : "text-[#1A1510]"
                          }`}
                        >
                          {msg.memberName}
                        </span>
                        {targetName && (
                          <span className="text-[#9B1C1C] font-mono text-[9px]">
                            → @{targetName}
                          </span>
                        )}
                      </div>
                      <p className="text-[#4A4740] line-clamp-2 pl-3 border-l border-[#E8E3DC] ml-0.5">
                        {msg.content.replace(/@\w+:\s*/, "")}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="flex-1 flex flex-col relative overflow-y-auto"
        ref={containerRef}
      >
        <div className="sticky top-0 z-40 bg-[#FAF9F7]/80 backdrop-blur-md border-b border-[#E8E3DC] px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
              }}
              className="text-[10px] text-[#767676] uppercase tracking-[0.2em] font-bold"
            >
              {isComplete
                ? `TEAM SHASTRA · ${session.members.length} MEMBERS`
                : `SABHA IN SESSION · ${session.members.length} VOICES`}
            </span>
          </div>
          {!isComplete && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E53E3E] animate-pulse" />
              <span className="text-[9px] font-bold text-[#E53E3E] uppercase tracking-widest">
                Live
              </span>
            </div>
          )}
        </div>

        <div className="max-w-5xl mx-auto w-full px-12 py-16 space-y-16">
          {/* Decision */}
          <div className="bg-white border border-[#E8E3DC] p-12 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#9B1C1C]/10" />
            <span
              style={{
                fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
              }}
              className="text-[10px] text-[#9B1C1C] uppercase tracking-widest block mb-8 font-bold"
            >
              THE VARA BEFORE THE COUNCIL
            </span>
            <h2
              style={{ fontFamily: "var(--font-cormorant), Cormorant, serif" }}
              className="text-[48px] font-[300] leading-[1.15] mb-8 text-[#1A1510]"
            >
              &ldquo;{session.decision}&rdquo;
            </h2>

            {session.context && (
              <div className="mb-10 p-6 bg-[#FAF9F7] rounded-xl border border-[#E8E3DC]/50">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Cormorant, serif",
                  }}
                  className="text-[19px] italic text-[#555] leading-relaxed"
                >
                  {session.context}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {session.members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-2.5 bg-white border border-[#E8E3DC] px-4 py-2 rounded-full shadow-sm"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                    }}
                    className="text-[11px] text-[#1A1510] uppercase tracking-wider font-bold"
                  >
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!isComplete ? (
            /* ACTIVE DEBATE VIEW */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PERSONAS.map((persona) => {
                  const isSpeaking =
                    personaStatuses[persona.id as PersonaId] === "speaking";
                  const isDone =
                    personaStatuses[persona.id as PersonaId] === "done";
                  const hasResponse =
                    !!personaResponses[persona.id as PersonaId];
                  const isTargeted = targetVoice?.toLowerCase() === persona.id;

                  return (
                    <div
                      key={persona.id}
                      className={`chamber-reveal border p-10 bg-white relative group shadow-sm rounded-2xl hover:shadow-md transition-all ${
                        isSpeaking
                          ? "border-[#C17F24] border-l-[3px] animate-[pulse_1.5s_ease_infinite]"
                          : "border-[#E8E3DC]"
                      }`}
                    >
                      {isTargeted && (
                        <div className="absolute top-0 left-0 w-full bg-[#C17F24]/10 border-l-2 border-[#C17F24] py-2 px-10 animate-in fade-in duration-500">
                          <span
                            style={{
                              fontFamily:
                                "var(--font-mono), IBM Plex Mono, monospace",
                            }}
                            className="text-[8px] text-[#C17F24] font-bold uppercase tracking-widest"
                          >
                            @{persona.name} — RESPONDING TO PRASHNA
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-1.5 h-10 rounded-full"
                            style={{
                              backgroundColor:
                                persona.id === "skeptic"
                                  ? "#E53E3E"
                                  : persona.id === "optimist"
                                    ? "#4A7C59"
                                    : persona.id === "pragmatist"
                                      ? "#8B6914"
                                      : "#2E5B8A",
                            }}
                          />
                          <div>
                            <h3
                              style={{
                                fontFamily:
                                  "var(--font-cormorant), Cormorant, serif",
                              }}
                              className="text-[24px] font-[300] text-[#1A1510] leading-none"
                            >
                              {persona.name}
                            </h3>
                            <span
                              style={{
                                fontFamily:
                                  "var(--font-mono), IBM Plex Mono, monospace",
                              }}
                              className="text-[10px] text-[#767676] uppercase tracking-[0.2em] font-bold"
                            >
                              {persona.sanskrit}
                            </span>
                          </div>
                        </div>
                        {isSpeaking && (
                          <div className="flex items-center gap-2">
                            <span
                              style={{
                                fontFamily:
                                  "var(--font-mono), IBM Plex Mono, monospace",
                              }}
                              className="text-[7px] text-[#C17F24] font-bold uppercase tracking-widest"
                            >
                              SPEAKING
                            </span>
                            <div className="flex gap-1.5">
                              <div className="w-1.5 h-1.5 bg-[#C17F24] rounded-full animate-bounce [animation-delay:-0.3s]" />
                              <div className="w-1.5 h-1.5 bg-[#C17F24] rounded-full animate-bounce [animation-delay:-0.15s]" />
                              <div className="w-1.5 h-1.5 bg-[#C17F24] rounded-full animate-bounce" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "var(--font-dm-sans), DM Sans, sans-serif",
                        }}
                        className="min-h-[160px] text-[15px] text-[#555] leading-relaxed italic border border-[#E8E3DC]/50 p-6 bg-[#FAF9F7]/50 rounded-xl transition-colors group-hover:border-[#9B1C1C]/20"
                      >
                        {personaResponses[persona.id as PersonaId] ? (
                          <div className="not-italic">
                            {renderFormattedText(
                              personaResponses[persona.id as PersonaId],
                            )}
                          </div>
                        ) : session.status === "waiting" ? (
                          "Waiting for the host to convene the Sabha..."
                        ) : isPersonaTyping[persona.id as PersonaId] ? (
                          "The voice is interjecting..."
                        ) : (
                          "The voice is observing the council..."
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Host Control */}
              {myMember?.isHost && session.status === "active" && (
                <div className="flex justify-center pt-12">
                  <button
                    onClick={handleFinalize}
                    disabled={isProcessing}
                    style={{
                      fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                    }}
                    className="bg-[#1A1510] text-white px-16 py-6 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#9B1C1C] flex items-center gap-4 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
                  >
                    {isProcessing
                      ? "RENDERING NIRNAYA..."
                      : "RENDER THE NIRNAYA →"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* COMPLETED SHASTRA VIEW */
            <div className="space-y-10 animate-in fade-in duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-12">
                  <VerdictCard
                    title="Consensus Points"
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    accentColor="border-l-[3px] border-l-[#4CAF70]"
                    content={teamVerdict!.consensus}
                  />
                </div>
                <div className="md:col-span-6">
                  <VerdictCard
                    title="Key Tensions"
                    icon={<Zap className="w-5 h-5" />}
                    accentColor="border-l-[3px] border-l-[#D97706]"
                    content={teamVerdict!.tensions}
                  />
                </div>
                <div className="md:col-span-6">
                  <VerdictCard
                    title="The Unseen"
                    icon={<Search className="w-5 h-5" />}
                    accentColor="border-l-[3px] border-l-blue-400"
                    content={teamVerdict!.missing}
                  />
                </div>
                <div className="md:col-span-8">
                  <VerdictCard
                    title="Recommendation"
                    icon={<Target className="w-5 h-5" />}
                    accentColor="border-l-[3px] border-l-[#9B1C1C]"
                    content={teamVerdict!.recommendation}
                  />
                </div>
                <div className="md:col-span-4">
                  <ConfidenceBar
                    score={teamVerdict!.confidence}
                    explanation={teamVerdict!.confidenceExplanation}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-6 pt-12">
                <button
                  onClick={copyShastra}
                  style={{
                    fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                  }}
                  className="px-10 py-5 rounded-full border border-[#E8E3DC] text-[#1A1510] text-[11px] font-bold uppercase tracking-widest hover:bg-[#F5F2EC] flex items-center gap-3 transition-all"
                >
                  {copied ? "LINK COPIED ✓" : "COPY SHASTRA"}
                </button>
                <Link
                  href="/"
                  style={{
                    fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                  }}
                  className="bg-[#1A1510] text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#9B1C1C] transition-all shadow-lg"
                >
                  RETURN TO HOME
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Prashna Bar (only if not complete) */}
        {!isComplete && (
          <div className="sticky bottom-0 z-50">
            {/* @mention quick tags — show above input */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 8,
                padding: "0 24px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                  fontSize: 9,
                  color: "#4A4740",
                  letterSpacing: "0.1em",
                  alignSelf: "center",
                }}
              >
                SPEAK TO:
              </span>

              {/* "Sabha" = all voices */}
              <button
                onClick={() => setTargetVoice(null)}
                style={{
                  fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor:
                    targetVoice === null ? "#C17F24" : "rgba(193,127,36,0.2)",
                  color: targetVoice === null ? "#C17F24" : "#4A4740",
                  background:
                    targetVoice === null
                      ? "rgba(193,127,36,0.08)"
                      : "transparent",
                  borderRadius: 0,
                }}
              >
                @Sabha
              </button>

              {/* Individual voice tags */}
              {[
                { name: "Vitarka", color: "#E53E3E" },
                { name: "Asha", color: "#4A7C59" },
                { name: "Yukti", color: "#8B6914" },
                { name: "Vipaksha", color: "#2E5B8A" },
              ].map((v) => (
                <button
                  key={v.name}
                  onClick={() => setTargetVoice(v.name)}
                  style={{
                    fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor:
                      targetVoice === v.name
                        ? v.color
                        : "rgba(193,127,36,0.15)",
                    color: targetVoice === v.name ? v.color : "#4A4740",
                    background:
                      targetVoice === v.name ? `${v.color}15` : "transparent",
                    borderRadius: 0,
                  }}
                >
                  @{v.name}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div
              style={{
                display: "flex",
                gap: 0,
                borderTop: "1px solid rgba(193,127,36,0.12)",
                padding: "16px 24px",
                background: "#FAF9F7", // Match the page background
              }}
            >
              {/* Show selected target as prefix */}
              {targetVoice && (
                <span
                  style={{
                    fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                    fontSize: 11,
                    color: "#C17F24",
                    alignSelf: "center",
                    marginRight: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  @{targetVoice}
                </span>
              )}

              <input
                value={prashna}
                onChange={(e) => setPrashna(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRaisePrashna()}
                placeholder={
                  targetVoice
                    ? `Challenge ${targetVoice} directly...`
                    : "Speak to the Sabha..."
                }
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(193,127,36,0.2)",
                  color: "#1A1510",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontSize: 14,
                  padding: "8px 0",
                  outline: "none",
                }}
              />

              <button
                onClick={handleRaisePrashna}
                disabled={!prashna.trim()}
                style={{
                  marginLeft: 16,
                  background: prashna.trim() ? "#C17F24" : "transparent",
                  border: "1px solid rgba(193,127,36,0.3)",
                  color: prashna.trim() ? "#FFFFFF" : "#4A4740",
                  fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  cursor: prashna.trim() ? "pointer" : "not-allowed",
                  borderRadius: "9999px",
                  whiteSpace: "nowrap",
                }}
              >
                RAISE PRASHNA
              </button>
            </div>
            <div className="pb-4 text-center bg-[#FAF9F7]">
              <span
                style={{
                  fontFamily: "var(--font-mono), IBM Plex Mono, monospace",
                }}
                className="text-[9px] text-[#767676] uppercase tracking-[0.25em] font-bold"
              >
                ANY MEMBER CAN INTERJECT AT ANY TIME
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
