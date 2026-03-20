import { useState } from "react";
import { MessageSquarePlus, ArrowRight } from "lucide-react";

interface InterjectionBarProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  submitted?: boolean;
  submittedText?: string;
}

export default function InterjectionBar({
  onSubmit,
  disabled,
  submitted,
  submittedText,
}: InterjectionBarProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || disabled) return;
    onSubmit(text.trim());
    setText("");
  };

  if (submitted) {
    return (
      <div className="fixed bottom-8 left-0 right-0 px-4 sm:px-6 z-40 flex justify-center pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl border border-[#E8E3DC] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[480px] w-full flex flex-col gap-4 pointer-events-auto">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D97706]/10 text-[#D97706] shrink-0">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#1A1510] text-[14px] font-semibold">
                Your challenge has been recorded.
              </span>
              <span className="text-[#767676] text-[12px] flex items-center gap-1.5">
                The Sabha will address it in Khandana
                <ArrowRight className="w-3 h-3 text-[#9B1C1C]" />
              </span>
            </div>
          </div>

          {submittedText && (
            <div className="bg-[#FAF9F7] rounded-xl p-4 border-l-2 border-[#D97706]/30">
              <p className="text-[14px] font-[family-name:var(--font-lora)] italic text-[#3D3830] leading-[1.6]">
                &ldquo;{submittedText}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 sm:px-6 z-50 pointer-events-none">
      <div className="max-w-2xl mx-auto flex items-center p-2 bg-white/90 backdrop-blur-xl border border-[#E8E3DC]/80 rounded-full pointer-events-auto shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:shadow-[0_4px_20px_rgba(217,119,6,0.08)] focus-within:border-[#D97706]/25 group">
        <div className="pl-5 text-[#767676] group-focus-within:text-[#D97706] transition-colors duration-300">
          <MessageSquarePlus className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Speak to the Sabha..."
          disabled={disabled}
          className="flex-1 bg-transparent px-4 py-2.5 text-[14px] text-[#1A1510] placeholder:text-[#B8B0A8] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !text.trim()}
          className="bg-[#1A1510] text-white ml-2 py-2.5 px-6 rounded-full text-[13px] font-medium hover:bg-[#9B1C1C] disabled:bg-[#D5CEC6] disabled:cursor-not-allowed transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
