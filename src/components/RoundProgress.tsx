"use client";

interface RoundProgressProps {
  currentRound: number;
}

const steps = [
  { number: 1, label: "Pratham Paksha" },
  { number: 2, label: "Khandana" },
  { number: 3, label: "Nirnaya" },
];

export default function RoundProgress({ currentRound }: RoundProgressProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-1 min-w-0">
      {steps.map((step, idx) => {
        const isCompleted = currentRound > step.number;
        const isActive = currentRound === step.number;

        return (
          <div
            key={step.number}
            className="flex items-center gap-1 sm:gap-1.5 min-w-0"
          >
            <div
              className={`flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-semibold transition-colors duration-300 truncate ${
                isActive
                  ? "text-[#1A1510]"
                  : isCompleted
                    ? "text-[#767676]"
                    : "text-[#B8B0A8]"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                  isActive
                    ? "bg-[#D97706]"
                    : isCompleted
                      ? "bg-[#767676]"
                      : "bg-[#E8E3DC]"
                }`}
              />
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.number}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-3 h-px shrink-0 transition-colors duration-300 ${
                  isCompleted ? "bg-[#767676]/40" : "bg-[#E8E3DC]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
