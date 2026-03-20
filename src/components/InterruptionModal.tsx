import { useState } from "react";
import { Persona, PersonaId } from "@/types/council";
import { PERSONAS } from "@/lib/prompts";
import { ShieldAlert, Sparkles, Anchor, Shuffle } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface InterruptionModalProps {
  personaId: PersonaId;
  question: string;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
}

const personaIcons: Record<PersonaId, React.ReactNode> = {
  skeptic: <ShieldAlert className="w-4 h-4" />,
  optimist: <Sparkles className="w-4 h-4" />,
  pragmatist: <Anchor className="w-4 h-4" />,
  "devils-advocate": <Shuffle className="w-4 h-4" />,
};

export default function InterruptionModal({
  personaId,
  question,
  onAnswer,
  onSkip,
}: InterruptionModalProps) {
  const [answer, setAnswer] = useState("");
  const persona = PERSONAS.find((p) => p.id === personaId) as Persona;
  const icon = personaIcons[personaId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pb-20">
      <div
        className="absolute inset-0 bg-[#0F0C08]/30 backdrop-blur-sm"
        onClick={onSkip}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.12),0_0_0_1px_rgba(26,21,16,0.04)] flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F5F2EC] text-[#1A1510]">
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#767676] uppercase">
              {persona.name} asks
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="text-[#1A1510] text-xl md:text-2xl font-[family-name:var(--font-display)] leading-[1.35] tracking-tight">
            <MarkdownRenderer content={question.replace(/^"|"$/g, "")} />
          </div>
        </div>

        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
            className="w-full bg-[#FAF9F7] border border-[#E8E3DC] rounded-xl p-5 text-[15px] text-[#1A1510] placeholder:text-[#B8B0A8] focus:outline-none focus:border-[#D97706]/30 focus:ring-2 focus:ring-[#D97706]/10 transition-all duration-200 resize-none h-28"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onAnswer(answer)}
            disabled={!answer.trim()}
            className="flex-1 bg-[#1A1510] text-white py-3 rounded-full text-[14px] font-medium hover:bg-[#9B1C1C] disabled:bg-[#D5CEC6] disabled:cursor-not-allowed transition-all duration-200"
          >
            Answer & Continue
          </button>
          <button
            onClick={onSkip}
            className="flex-1 py-3 rounded-full text-[14px] font-medium border border-[#E8E3DC] text-[#3D3830] hover:bg-[#F5F2EC] transition-all duration-200"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
