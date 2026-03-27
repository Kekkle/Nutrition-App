import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

const floatVariant = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const pulseVariant = {
  animate: {
    scale: [1, 1.08, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const beveledBoxClass =
  "rounded-2xl bg-gradient-to-br from-white/40 to-black/10 p-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.15)]";

function BeveledIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${beveledBoxClass} ${className}`.trim()}>{children}</div>
  );
}

function SceneWrapper({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl ${bg} px-4 py-6`}>
      {children}
    </div>
  );
}

function EmojiIcon({ emoji, size = "text-6xl", delay = 0 }: { emoji: string; size?: string; delay?: number }) {
  return (
    <motion.span
      className={`${size} select-none`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18, delay }}
      role="img"
    >
      {emoji}
    </motion.span>
  );
}

function DigestiveTractSvg() {
  return (
    <svg
      viewBox="0 0 200 240"
      className="mx-auto h-52 w-44 max-w-full shrink-0"
      aria-hidden
    >
      <path
        d="M100 18 C 140 38, 155 78, 130 110 C 105 142, 70 150, 55 175 C 40 200, 55 228, 95 218 C 130 210, 150 185, 135 155 C 120 125, 85 118, 75 88 C 65 58, 85 28, 100 18 Z"
        fill="none"
        stroke="#E11D48"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100 40 Q 125 65, 118 95 Q 110 125, 85 145 Q 60 168, 78 195"
        fill="none"
        stroke="#FB7185"
        strokeWidth="6"
        strokeLinecap="round"
        opacity={0.85}
      />
    </svg>
  );
}

function MysteryBoxesInteractive() {
  const [revealed, setRevealed] = useState([false, false, false]);
  const contents = ["🍞", "🍗", "🧈"];

  const reveal = (index: number) => {
    setRevealed((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <SceneWrapper bg="bg-primary/10">
      <div className="flex items-center justify-center gap-4" style={{ perspective: 1000 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-24 w-24"
            animate={revealed[i] ? { y: 0 } : { y: [0, -8, 0] }}
            transition={
              revealed[i]
                ? { duration: 0.2 }
                : { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const }
            }
          >
            <motion.button
              type="button"
              onClick={() => reveal(i)}
              className="relative h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={revealed[i] ? "Revealed" : "Mystery box"}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
            >
              <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: revealed[i] ? 180 : 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" as const }}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center ${beveledBoxClass}`}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                  }}
                >
                  <span className="font-display text-4xl text-primary">?</span>
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center ${beveledBoxClass}`}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className="text-5xl select-none">{contents[i]}</span>
                </div>
              </motion.div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </SceneWrapper>
  );
}

const ILLUSTRATIONS: Record<string, () => ReactNode> = {
  "phone-with-colorful-app-icons": () => (
    <SceneWrapper bg="bg-primary-light/40">
      <div className="flex w-full max-w-xl flex-row flex-wrap items-center justify-center gap-6">
        <motion.div {...floatVariant}>
          <img src="/images/celly-character.png" alt="Celly" className="h-40 w-auto drop-shadow-lg sm:h-48" />
        </motion.div>
        <div className="grid grid-cols-3 gap-1.5">
          {["📞", "📷", "💬", "🕐", "🗺️", "📅", "🎵", "🎮", "🛍️", "▶️"].map((e, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04, type: "spring", stiffness: 260, damping: 20 }}
            >
              <BeveledIcon className="p-1.5">
                <span className="text-4xl select-none">{e}</span>
              </BeveledIcon>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneWrapper>
  ),

  "phone-screen-essential-apps-row": () => (
    <SceneWrapper bg="bg-success/20">
      <div className="grid max-w-sm grid-cols-3 gap-3">
        {["📞", "📷", "💬", "🕐", "🗺️", "📅"].map((e, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, ease: "easeOut" as const }}
          >
            <BeveledIcon className="p-2">
              <span className="text-5xl select-none">{e}</span>
            </BeveledIcon>
          </motion.div>
        ))}
      </div>
    </SceneWrapper>
  ),

  "phone-screen-fun-apps-row": () => (
    <SceneWrapper bg="bg-accent/25">
      <div className="flex max-w-md flex-wrap items-center justify-center gap-3">
        {["🎵", "🎮", "🛍️", "▶️"].map((e, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08, type: "spring", stiffness: 280, damping: 22 }}
          >
            <BeveledIcon className="p-2">
              <span className="text-5xl select-none">{e}</span>
            </BeveledIcon>
          </motion.div>
        ))}
      </div>
    </SceneWrapper>
  ),

  "phone-multitasking-many-app-windows": () => (
    <SceneWrapper bg="bg-primary-light/30">
      <div className="grid max-w-xs grid-cols-3 gap-2">
        {["📞", "📷", "🎮", "💬", "🎵", "🗺️", "📧", "🛒"].map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, ease: "easeOut" as const }}
          >
            <BeveledIcon className="p-1.5">
              <span className="text-3xl select-none">{e}</span>
            </BeveledIcon>
          </motion.div>
        ))}
      </div>
    </SceneWrapper>
  ),

  "split-phone-and-silhouette-body-transition": () => (
    <SceneWrapper bg="bg-secondary/10">
      <div className="flex w-full max-w-md items-center justify-center">
        <div className="flex flex-1 justify-end">
          <motion.div {...floatVariant}>
            <img src="/images/celly-character.png" alt="Celly" className="h-32 w-auto drop-shadow-lg sm:h-40" />
          </motion.div>
        </div>
        <motion.span
          className="mx-4 font-display text-4xl text-primary select-none sm:mx-6"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          =
        </motion.span>
        <div className="flex flex-1 justify-start">
          <motion.div {...floatVariant}>
            <img src="/images/body-outline.png" alt="Body" className="h-32 w-auto drop-shadow-lg sm:h-40" />
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  ),

  "celly-gray-uncharged": () => (
    <SceneWrapper bg="bg-error/10">
      <motion.div {...pulseVariant}>
        <img
          src="/images/celly-character.png"
          alt="Celly uncharged"
          className="h-40 w-auto drop-shadow-lg grayscale sm:h-48"
        />
      </motion.div>
      <div className="flex items-center gap-2">
        <BeveledIcon className="p-2">
          <span className="text-4xl select-none">🪫</span>
        </BeveledIcon>
        <div className="h-7 w-36 overflow-hidden rounded-full border-2 border-error/40 bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-error"
            initial={{ width: "5%" }}
            animate={{ width: ["5%", "8%", "5%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </div>
      </div>
    </SceneWrapper>
  ),

  "celly-with-charger": () => (
    <SceneWrapper bg="bg-success/10">
      <div className="flex items-center gap-4">
        <motion.div {...floatVariant}>
          <img
            src="/images/celly-character.png"
            alt="Celly"
            className="h-36 w-auto drop-shadow-lg grayscale-[50%] sm:h-44"
          />
        </motion.div>
        <motion.div
          animate={{ x: [4, 0, 4] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <img
            src="/images/charger-character.png"
            alt="Charger"
            className="h-28 w-auto drop-shadow-lg sm:h-36"
          />
        </motion.div>
      </div>
      <div className="flex items-center gap-2">
        {["⚡", "⚡", "⚡"].map((e, i) => (
          <motion.span
            key={i}
            className="text-2xl select-none"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" as const }}
          >
            {e}
          </motion.span>
        ))}
      </div>
    </SceneWrapper>
  ),

  "celly-fully-charged": () => (
    <SceneWrapper bg="bg-success/20">
      <motion.div {...pulseVariant}>
        <img
          src="/images/celly-character.png"
          alt="Celly fully charged"
          className="h-40 w-auto drop-shadow-lg sm:h-48"
        />
      </motion.div>
      <div className="flex items-center gap-2">
        <BeveledIcon className="p-2">
          <span className="text-4xl select-none">🔋</span>
        </BeveledIcon>
        <div className="h-7 w-36 overflow-hidden rounded-full border-2 border-success/40 bg-gray-200">
          <div className="h-full w-full rounded-full bg-success" />
        </div>
      </div>
    </SceneWrapper>
  ),

  "body-apps-overview": () => (
    <SceneWrapper bg="bg-primary-light/25">
      <div className="relative flex flex-col items-center gap-4">
        <motion.div {...floatVariant}>
          <span className="text-9xl select-none">🧍</span>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {["🧠", "❤️", "🫁", "🍲"].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 * i, type: "spring", stiffness: 260, damping: 18 }}
            >
              <BeveledIcon className="p-2">
                <span className="text-5xl select-none">{e}</span>
              </BeveledIcon>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneWrapper>
  ),

  "brain-icon-large": () => (
    <SceneWrapper bg="bg-primary-light/20">
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 4px rgba(108, 92, 231, 0.25), 0 12px 28px rgba(108, 92, 231, 0.3)",
            "0 0 0 14px rgba(108, 92, 231, 0.12), 0 12px 36px rgba(108, 92, 231, 0.45)",
            "0 0 0 4px rgba(108, 92, 231, 0.25), 0 12px 28px rgba(108, 92, 231, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
        className="rounded-2xl"
      >
        <BeveledIcon>
          <span className="text-9xl select-none">🧠</span>
        </BeveledIcon>
      </motion.div>
    </SceneWrapper>
  ),

  "heart-icon-large": () => (
    <SceneWrapper bg="bg-error/10">
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <BeveledIcon>
          <span className="text-9xl select-none">❤️</span>
        </BeveledIcon>
      </motion.div>
    </SceneWrapper>
  ),

  "lungs-icon-large": () => (
    <SceneWrapper bg="bg-secondary/15">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <BeveledIcon>
          <span className="text-9xl select-none">🫁</span>
        </BeveledIcon>
      </motion.div>
    </SceneWrapper>
  ),

  "digestive-tract-icon": () => (
    <SceneWrapper bg="bg-error/5">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <DigestiveTractSvg />
      </motion.div>
    </SceneWrapper>
  ),

  "muscles-icon-large": () => (
    <SceneWrapper bg="bg-carb-light">
      <BeveledIcon>
        <span className="text-9xl select-none">💪</span>
      </BeveledIcon>
    </SceneWrapper>
  ),

  "bones-icon-large": () => (
    <SceneWrapper bg="bg-secondary/10">
      <BeveledIcon>
        <span className="text-9xl select-none">🦴</span>
      </BeveledIcon>
    </SceneWrapper>
  ),

  "skin-icon-large": () => (
    <SceneWrapper bg="bg-primary-light/20">
      <div className="flex items-center justify-center gap-4">
        <BeveledIcon className="p-2">
          <span className="text-8xl select-none">🌡️</span>
        </BeveledIcon>
        <BeveledIcon className="p-2">
          <span className="text-8xl select-none">🛡️</span>
        </BeveledIcon>
      </div>
    </SceneWrapper>
  ),

  "all-systems-running": () => {
    const orbit = ["🧠", "❤️", "🫁", "💪", "🦴", "🛡️"];
    const radiusPx = 92;
    return (
      <SceneWrapper bg="bg-primary-light/25">
        <div className="relative mx-auto h-56 w-56 shrink-0 sm:h-64 sm:w-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-8xl select-none sm:text-9xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }}
              >
                🧍
              </motion.span>
            </motion.span>
          </div>
          {orbit.map((emoji, i) => {
            const n = orbit.length;
            const angleDeg = (360 / n) * i - 90;
            const rad = (angleDeg * Math.PI) / 180;
            const x = radiusPx * Math.cos(rad);
            const y = radiusPx * Math.sin(rad);
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ marginLeft: -28, marginTop: -28 }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{
                  delay: 0.12 + i * 0.1,
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
              >
                <BeveledIcon className="p-1.5">
                  <span className="text-3xl select-none sm:text-4xl">{emoji}</span>
                </BeveledIcon>
              </motion.div>
            );
          })}
        </div>
      </SceneWrapper>
    );
  },

  "body-outline-with-battery-meter-empty": () => (
    <SceneWrapper bg="bg-error/10">
      <motion.div {...floatVariant}>
        <BeveledIcon>
          <span className="text-9xl select-none">🧍</span>
        </BeveledIcon>
      </motion.div>
      <div className="flex items-center gap-2">
        <BeveledIcon className="p-2">
          <span className="text-4xl select-none">🔋</span>
        </BeveledIcon>
        <div className="h-7 w-36 overflow-hidden rounded-full border-2 border-error/40 bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-error"
            animate={{ width: ["8%", "12%", "8%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </div>
      </div>
    </SceneWrapper>
  ),

  "plate-of-supportive-foods-energy-rays": () => (
    <SceneWrapper bg="bg-carb/10">
      <motion.div {...pulseVariant} className="flex flex-wrap justify-center gap-2">
        {["🍎", "🥦", "🍞", "🥚", "🍗"].map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 280, damping: 20 }}
          >
            <BeveledIcon className="p-2">
              <span className="text-6xl select-none sm:text-7xl">{e}</span>
            </BeveledIcon>
          </motion.div>
        ))}
      </motion.div>
    </SceneWrapper>
  ),

  "water-glass-body-hydration-flow-arrows": () => (
    <SceneWrapper bg="bg-secondary/10">
      <div className="flex flex-col items-center gap-2">
        <motion.div {...floatVariant}>
          <BeveledIcon>
            <span className="text-9xl select-none">💧</span>
          </BeveledIcon>
        </motion.div>
        <div className="flex gap-2 select-none" aria-hidden>
          {["⬇️", "⬇️", "⬇️"].map((a, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" as const }}
            >
              {a}
            </motion.span>
          ))}
        </div>
      </div>
    </SceneWrapper>
  ),

  "moon-pillow-kid-sleeping-cozy": () => (
    <SceneWrapper bg="bg-primary/10">
      <div className="flex items-center gap-4">
        <motion.div {...floatVariant}>
          <BeveledIcon className="p-2">
            <EmojiIcon emoji="🌙" size="text-7xl" />
          </BeveledIcon>
        </motion.div>
        <BeveledIcon className="p-2">
          <EmojiIcon emoji="😴" size="text-8xl" delay={0.1} />
        </BeveledIcon>
        <motion.div {...floatVariant}>
          <BeveledIcon className="p-2">
            <EmojiIcon emoji="🛏️" size="text-7xl" delay={0.2} />
          </BeveledIcon>
        </motion.div>
      </div>
    </SceneWrapper>
  ),

  "food-main-fuel": () => (
    <SceneWrapper bg="bg-carb/10">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {["🍎", "🥖", "🍗", "🥑"].map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
          >
            <BeveledIcon className="p-2">
              <span className="text-7xl select-none sm:text-8xl">{e}</span>
            </BeveledIcon>
          </motion.div>
        ))}
      </div>
    </SceneWrapper>
  ),

  "mystery-boxes-clickable": () => <MysteryBoxesInteractive />,

  "macros-coming-up-next": () => (
    <SceneWrapper bg="bg-primary-light/25">
      <div className="flex w-full max-w-lg flex-row flex-wrap items-start justify-center gap-6 sm:gap-10">
        {[
          { emoji: "🍞", label: "Carbs", color: "text-carb" },
          { emoji: "🍗", label: "Protein", color: "text-protein" },
          { emoji: "🧈", label: "Fats", color: "text-fat" },
        ].map((col, i) => (
          <motion.div
            key={col.label}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, ease: "easeOut" as const }}
          >
            <BeveledIcon className="p-2">
              <span className="text-8xl select-none sm:text-9xl">{col.emoji}</span>
            </BeveledIcon>
            <span className={`font-display text-lg ${col.color}`}>{col.label}</span>
          </motion.div>
        ))}
      </div>
    </SceneWrapper>
  ),
};

export default function PanelIllustration({ name }: { name: string }) {
  const render = ILLUSTRATIONS[name];
  if (render) return <>{render()}</>;

  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-primary-light/30 px-4 py-6">
      <span className="text-center font-body text-sm text-text-muted">{name}</span>
    </div>
  );
}
