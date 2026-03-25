import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import type { MultipleChoiceConfig } from "../../types";

export interface MultipleChoiceProps {
  config: MultipleChoiceConfig;
  onComplete: (stars: number) => void;
}

export default function MultipleChoice({
  config,
  onComplete,
}: MultipleChoiceProps) {
  const [tapCount, setTapCount] = useState(0);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [correctId, setCorrectId] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const handleSelect = useCallback(
    (id: string) => {
      if (finished || wrongIds.has(id) || id === correctId) return;

      const nextTap = tapCount + 1;
      setTapCount(nextTap);

      if (id === config.correctId) {
        setCorrectId(id);
        setFinished(true);
        const stars = nextTap === 1 ? 3 : nextTap === 2 ? 2 : 1;
        window.setTimeout(() => onComplete(stars), 800);
        return;
      }

      setWrongIds((prev) => new Set(prev).add(id));
    },
    [
      config.correctId,
      correctId,
      finished,
      onComplete,
      tapCount,
      wrongIds,
    ],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 px-4 pb-6">
      <h2 className="text-center font-display text-2xl leading-tight text-text sm:text-3xl">
        {config.prompt}
      </h2>

      <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
        {config.items.map((item) => {
          const isCorrect = correctId === item.id;
          const isWrong = wrongIds.has(item.id);
          const disabled = finished || isWrong;

          return (
            <motion.button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(item.id)}
              whileTap={disabled ? undefined : { scale: 0.95 }}
              animate={
                isWrong
                  ? { x: [0, -6, 6, -4, 4, 0] }
                  : isCorrect
                    ? { scale: [1, 1.12, 1.05] }
                    : {}
              }
              transition={
                isWrong
                  ? { duration: 0.45, ease: "easeInOut" }
                  : isCorrect
                    ? { type: "spring", stiffness: 400, damping: 12 }
                    : {}
              }
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-[4px] p-4 font-body shadow-[4px_4px_0_rgba(45,52,54,0.12)] transition-colors ${
                isCorrect
                  ? "border-success bg-success text-white"
                  : isWrong
                    ? "border-error/80 bg-error/90 text-white"
                    : "border-primary/40 bg-surface-raised text-text hover:border-primary hover:bg-primary-light/15"
              } ${disabled && !isCorrect ? "opacity-90" : ""}`}
            >
              <span className="text-5xl leading-none" aria-hidden>
                {item.icon}
              </span>
              <span className="text-center text-base font-bold">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {wrongIds.size > 0 && !finished && (
        <p className="text-center font-body text-sm font-semibold text-text-muted">
          Almost — pick another one. You&apos;ve got this!
        </p>
      )}
    </div>
  );
}
