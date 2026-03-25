import { motion } from "framer-motion";

const FILLED = "#F59E0B";
const EMPTY = "#B2BEC3";

const sizeMap = {
  sm: { box: 20, stroke: 1.5 },
  md: { box: 28, stroke: 2 },
  lg: { box: 36, stroke: 2.25 },
} as const;

function StarIcon({
  filled,
  size,
}: {
  filled: boolean;
  size: "sm" | "md" | "lg";
}) {
  const { box, stroke } = sizeMap[size];
  return (
    <svg
      width={box}
      height={box}
      viewBox="0 0 24 24"
      fill={filled ? FILLED : "none"}
      stroke={filled ? FILLED : EMPTY}
      strokeWidth={stroke}
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export type StarRatingProps = {
  stars: number;
  size?: "sm" | "md" | "lg";
};

export default function StarRating({ stars, size = "md" }: StarRatingProps) {
  const clamped = Math.min(3, Math.max(0, Math.floor(stars)));
  const gap = size === "sm" ? "gap-0.5" : size === "md" ? "gap-1" : "gap-1.5";

  return (
    <div
      className={`flex items-center ${gap}`}
      role="img"
      aria-label={`${clamped} out of 3 stars`}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={clamped > 0 ? { opacity: 0, scale: 0, y: 8 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 18,
            delay: clamped > 0 ? i * 0.08 : 0,
          }}
        >
          <StarIcon filled={i < clamped} size={size} />
        </motion.div>
      ))}
    </div>
  );
}
