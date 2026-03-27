import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface PathNodeProps {
  title: string;
  status: "locked" | "current" | "completed";
  stars: number;
  moduleColor: string;
  icon: string;
  imageUrl?: string;
  index: number;
  onClick: () => void;
}

function StarDots({ count, className }: { count: number; className?: string }) {
  const n = Math.min(3, Math.max(0, Math.floor(count)));
  return (
    <div
      className={`flex gap-0.5 justify-center ${className ?? ""}`}
      aria-label={`${n} out of 3 stars`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`text-[10px] leading-none ${i < n ? "text-amber-200" : "text-white/35"}`}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

const PathNode = forwardRef<HTMLButtonElement, PathNodeProps>(function PathNode(
  {
    title,
    status,
    stars,
    moduleColor,
    icon,
    imageUrl,
    index,
    onClick,
  },
  ref,
) {
  const locked = status === "locked";
  const delay = index * 0.05;

  const baseButton =
    "relative flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-4 shadow-[4px_4px_0_0_rgba(45,52,54,0.12)] outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary/40";

  if (locked) {
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.button
          ref={ref}
          type="button"
          disabled
          aria-disabled
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 26, delay }}
          className={`${baseButton} cursor-not-allowed border-node-locked bg-node-locked/45 text-text-muted opacity-80`}
        >
          <span className="text-2xl leading-none" aria-hidden>
            🔒
          </span>
        </motion.button>
        <p className="font-body max-w-[7.5rem] text-center text-sm text-text-muted">{title}</p>
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.button
          ref={ref}
          type="button"
          onClick={onClick}
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.08, 1],
          }}
          transition={{
            opacity: { type: "spring", stiffness: 380, damping: 26, delay },
            y: { type: "spring", stiffness: 380, damping: 26, delay },
            scale: {
              repeat: Infinity,
              duration: 1.35,
              ease: "easeInOut",
              delay: delay + 0.2,
            },
          }}
          style={{ borderColor: moduleColor }}
          className={`${baseButton} cursor-pointer bg-surface-raised`}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" className="h-12 w-12 object-contain drop-shadow-sm" />
          ) : (
            <span className="text-3xl leading-none drop-shadow-sm" aria-hidden>
              {icon}
            </span>
          )}
        </motion.button>
        <p className="font-body max-w-[7.5rem] text-center text-sm font-medium text-text">{title}</p>
      </div>
    );
  }

  // completed
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26, delay }}
        style={{
          backgroundColor: moduleColor,
          boxShadow: `0 0 0 1px ${moduleColor}, 0 6px 20px -4px ${moduleColor}99, 4px 4px 0 0 rgba(45,52,54,0.15)`,
        }}
        className={`${baseButton} cursor-pointer border-white text-white`}
      >
        <span className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-xs font-bold text-white shadow-sm backdrop-blur-[1px]">
          ✓
        </span>
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-10 w-10 object-contain drop-shadow-md" />
        ) : (
          <span className="text-2xl leading-none drop-shadow-md" aria-hidden>
            {icon}
          </span>
        )}
        <StarDots count={stars} className="mt-0.5" />
      </motion.button>
      <p className="font-body max-w-[7.5rem] text-center text-sm font-medium text-text">{title}</p>
    </div>
  );
});

export default PathNode;
