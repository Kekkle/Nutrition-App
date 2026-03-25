import { motion } from "framer-motion";

const barColorClasses = {
  primary: "bg-primary",
  "primary-light": "bg-primary-light",
  secondary: "bg-secondary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  carb: "bg-carb",
  fat: "bg-fat",
  protein: "bg-protein",
} as const;

type ThemeBarColor = keyof typeof barColorClasses;

export type ProgressBarProps = {
  current: number;
  total: number;
  color?: string;
  size?: "md" | "lg";
};

export default function ProgressBar({
  current,
  total,
  color = "primary",
  size = "md",
}: ProgressBarProps) {
  const safeTotal = total > 0 ? total : 1;
  const pct = Math.min(100, Math.max(0, (current / safeTotal) * 100));
  const barClass =
    color in barColorClasses
      ? barColorClasses[color as ThemeBarColor]
      : barColorClasses.primary;

  const heightClass = size === "lg" ? "h-3" : "h-2";

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-gray-200 ${heightClass}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        layout
        className={`h-full rounded-full ${barClass}`}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />
    </div>
  );
}
