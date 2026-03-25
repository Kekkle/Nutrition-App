import { motion } from "framer-motion";

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

function EmojiRow({ emojis, size = "text-5xl" }: { emojis: string[]; size?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {emojis.map((e, i) => (
        <EmojiIcon key={i} emoji={e} size={size} delay={i * 0.08} />
      ))}
    </div>
  );
}

function SceneWrapper({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl ${bg} px-4 py-6`}>
      {children}
    </div>
  );
}

const ILLUSTRATIONS: Record<string, () => React.ReactNode> = {
  "phone-with-colorful-app-icons": () => (
    <SceneWrapper bg="bg-primary-light/40">
      <motion.div {...floatVariant} className="text-8xl">📱</motion.div>
      <EmojiRow emojis={["📞", "📷", "🎮", "💬", "🎵", "📸"]} size="text-4xl" />
    </SceneWrapper>
  ),

  "phone-screen-essential-apps-row": () => (
    <SceneWrapper bg="bg-success/15">
      <p className="font-display text-lg text-success">Essential</p>
      <EmojiRow emojis={["📞", "📷", "💬"]} size="text-6xl" />
      <p className="font-body text-sm text-text-muted">You need these every day</p>
    </SceneWrapper>
  ),

  "phone-screen-fun-apps-row": () => (
    <SceneWrapper bg="bg-accent/15">
      <p className="font-display text-lg text-accent">Fun</p>
      <EmojiRow emojis={["🎮", "📸", "🎵"]} size="text-6xl" />
      <p className="font-body text-sm text-text-muted">Nice to have, but not necessary</p>
    </SceneWrapper>
  ),

  "phone-multitasking-many-app-windows": () => (
    <SceneWrapper bg="bg-primary-light/30">
      <div className="grid grid-cols-3 gap-2">
        {["📞", "📷", "🎮", "💬", "🎵", "📸", "🗺️", "📧", "🛒"].map((e, i) => (
          <motion.div
            key={i}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-raised shadow-sm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="text-2xl">{e}</span>
          </motion.div>
        ))}
      </div>
      <p className="font-body text-sm text-text-muted">All running at once!</p>
    </SceneWrapper>
  ),

  "split-phone-and-silhouette-body-transition": () => (
    <SceneWrapper bg="bg-secondary/10">
      <div className="flex items-center gap-6">
        <motion.span className="text-7xl" {...floatVariant}>📱</motion.span>
        <motion.span
          className="font-display text-3xl text-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          =
        </motion.span>
        <motion.span className="text-7xl" {...floatVariant}>🧍</motion.span>
      </div>
    </SceneWrapper>
  ),

  "two-buckets-essential-vs-fun-labels": () => (
    <SceneWrapper bg="bg-warning/10">
      <p className="font-display text-lg text-text">Time to sort!</p>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">⭐</span>
          <span className="font-body text-sm font-semibold text-success">Essential</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">🎉</span>
          <span className="font-body text-sm font-semibold text-accent">Fun</span>
        </div>
      </div>
    </SceneWrapper>
  ),

  // --- Node 1.2: Charge the phone ---
  "phone-battery-icon-almost-empty": () => (
    <SceneWrapper bg="bg-error/10">
      <motion.div {...pulseVariant} className="text-8xl">📱</motion.div>
      <div className="flex items-center gap-2">
        <span className="text-4xl">🪫</span>
        <div className="h-6 w-32 overflow-hidden rounded-full border-2 border-error/40 bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-error"
            initial={{ width: "5%" }}
            animate={{ width: ["5%", "8%", "5%"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      <p className="font-body text-sm font-semibold text-error">Almost empty!</p>
    </SceneWrapper>
  ),

  "dark-phone-screen-power-off": () => (
    <SceneWrapper bg="bg-gray-800">
      <motion.div
        className="text-8xl opacity-30 grayscale"
        animate={{ opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        📱
      </motion.div>
      <p className="font-body text-sm text-gray-400">Nothing works...</p>
    </SceneWrapper>
  ),

  "charging-cable-plugged-into-phone": () => (
    <SceneWrapper bg="bg-success/10">
      <div className="flex items-end gap-1">
        <motion.span className="text-7xl" {...floatVariant}>📱</motion.span>
        <motion.span
          className="text-5xl"
          animate={{ x: [4, 0, 4] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🔌
        </motion.span>
      </div>
      <p className="font-body text-sm text-success font-semibold">Charging...</p>
    </SceneWrapper>
  ),

  "lightning-bolts-flowing-into-battery-bar": () => (
    <SceneWrapper bg="bg-warning/15">
      <EmojiRow emojis={["⚡", "⚡", "⚡"]} size="text-5xl" />
      <div className="h-8 w-40 overflow-hidden rounded-full border-2 border-warning/50 bg-gray-200">
        <motion.div
          className="h-full rounded-full bg-warning"
          initial={{ width: "10%" }}
          animate={{ width: "85%" }}
          transition={{ duration: 2, ease: "easeOut" as const }}
        />
      </div>
      <p className="font-display text-base text-warning">Electricity = power</p>
    </SceneWrapper>
  ),

  "phone-screen-bright-apps-active": () => (
    <SceneWrapper bg="bg-success/15">
      <motion.div className="text-8xl" {...pulseVariant}>📱</motion.div>
      <div className="h-6 w-32 overflow-hidden rounded-full border-2 border-success/40 bg-gray-200">
        <div className="h-full w-full rounded-full bg-success" />
      </div>
      <p className="font-body text-sm font-semibold text-success">Fully charged!</p>
    </SceneWrapper>
  ),

  "thinking-kid-question-mark-phone": () => (
    <SceneWrapper bg="bg-primary-light/30">
      <div className="flex items-center gap-4">
        <motion.span className="text-7xl" {...floatVariant}>🤔</motion.span>
        <motion.span
          className="font-display text-6xl text-primary"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ?
        </motion.span>
      </div>
    </SceneWrapper>
  ),

  // --- Node 1.3: Build the body ---
  "cartoon-body-outline-next-to-phone-character": () => (
    <SceneWrapper bg="bg-secondary/10">
      <div className="flex items-center gap-6">
        <motion.span className="text-7xl" {...floatVariant}>📱</motion.span>
        <motion.span className="font-display text-4xl text-primary">→</motion.span>
        <motion.span className="text-7xl" {...floatVariant}>🧍</motion.span>
      </div>
      <p className="font-body text-sm text-text-muted">Your body works like a phone</p>
    </SceneWrapper>
  ),

  "body-outline-brain-glow-head": () => (
    <SceneWrapper bg="bg-primary-light/20">
      <motion.span className="text-8xl" {...pulseVariant}>🧠</motion.span>
      <p className="font-display text-lg text-primary">Control center</p>
      <p className="font-body text-xs text-text-muted">Think, feel, decide</p>
    </SceneWrapper>
  ),

  "body-outline-heart-glow-chest-left": () => (
    <SceneWrapper bg="bg-error/10">
      <motion.span
        className="text-8xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        ❤️
      </motion.span>
      <p className="font-display text-lg text-error">Pumps blood</p>
      <p className="font-body text-xs text-text-muted">Never stops beating</p>
    </SceneWrapper>
  ),

  "body-outline-lungs-glow-chest": () => (
    <SceneWrapper bg="bg-secondary/15">
      <motion.span
        className="text-8xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
      >
        🫁
      </motion.span>
      <p className="font-display text-lg text-secondary">Breathe in, breathe out</p>
    </SceneWrapper>
  ),

  "body-outline-muscles-arms-and-stomach-belly": () => (
    <SceneWrapper bg="bg-carb-light">
      <div className="flex items-center gap-6">
        <EmojiIcon emoji="💪" size="text-7xl" />
        <EmojiIcon emoji="🍲" size="text-7xl" delay={0.15} />
      </div>
      <p className="font-display text-base text-text">Move + digest</p>
    </SceneWrapper>
  ),

  "body-outline-with-organs-all-lit-up": () => (
    <SceneWrapper bg="bg-primary-light/25">
      <div className="relative">
        <motion.span className="text-8xl" {...pulseVariant}>🧍</motion.span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {["🧠", "❤️", "🫁", "💪", "🍲"].map((e, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            {e}
          </motion.span>
        ))}
      </div>
      <p className="font-body text-sm font-semibold text-primary">All running right now!</p>
    </SceneWrapper>
  ),

  // --- Node 1.4: Fill the battery ---
  "body-outline-with-battery-meter-empty": () => (
    <SceneWrapper bg="bg-error/10">
      <motion.span className="text-7xl" {...floatVariant}>🧍</motion.span>
      <div className="flex items-center gap-2">
        <span className="text-3xl">🔋</span>
        <div className="h-6 w-32 overflow-hidden rounded-full border-2 border-error/40 bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-error"
            animate={{ width: ["8%", "12%", "8%"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      <p className="font-body text-sm text-error">Body needs fuel too!</p>
    </SceneWrapper>
  ),

  "plate-of-supportive-foods-energy-rays": () => (
    <SceneWrapper bg="bg-carb/10">
      <motion.div {...pulseVariant}>
        <EmojiRow emojis={["🍎", "🥦", "🍞", "🥚", "🍗"]} size="text-5xl" />
      </motion.div>
      <p className="font-display text-lg text-carb">Food = energy</p>
    </SceneWrapper>
  ),

  "water-glass-body-hydration-flow-arrows": () => (
    <SceneWrapper bg="bg-secondary/10">
      <motion.span className="text-8xl" {...floatVariant}>💧</motion.span>
      <p className="font-display text-base text-secondary">Keeps everything flowing</p>
    </SceneWrapper>
  ),

  "moon-pillow-kid-sleeping-cozy": () => (
    <SceneWrapper bg="bg-primary/10">
      <div className="flex items-center gap-4">
        <EmojiIcon emoji="🌙" size="text-6xl" />
        <EmojiIcon emoji="😴" size="text-7xl" delay={0.1} />
        <EmojiIcon emoji="🛏️" size="text-6xl" delay={0.2} />
      </div>
      <p className="font-display text-base text-primary">Recovery time</p>
    </SceneWrapper>
  ),

  "body-battery-icon-filling-from-three-sources": () => (
    <SceneWrapper bg="bg-success/10">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🍎</span>
        <span className="text-4xl">💧</span>
        <span className="text-4xl">😴</span>
        <span className="font-display text-2xl text-success">→</span>
        <span className="text-4xl">🔋</span>
      </div>
      <div className="h-7 w-40 overflow-hidden rounded-full border-2 border-success/40 bg-gray-200">
        <motion.div
          className="h-full rounded-full bg-success"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeOut" as const }}
        />
      </div>
      <p className="font-body text-sm font-semibold text-success">All three fill your battery</p>
    </SceneWrapper>
  ),

  "two-labeled-buckets-powers-vs-does-not": () => (
    <SceneWrapper bg="bg-warning/10">
      <p className="font-display text-lg text-text">Sort them!</p>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">✅</span>
          <span className="font-body text-sm font-semibold text-success">Powers you</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">⛔</span>
          <span className="font-body text-sm font-semibold text-error">Does not</span>
        </div>
      </div>
    </SceneWrapper>
  ),

  // --- Node 1.5: Mystery boxes ---
  "kid-eating-balanced-meal-smiling": () => (
    <SceneWrapper bg="bg-carb/10">
      <div className="flex items-center gap-3">
        <EmojiIcon emoji="😋" size="text-7xl" />
        <div className="flex flex-col gap-1">
          <EmojiRow emojis={["🍎", "🥖", "🍗"]} size="text-4xl" />
        </div>
      </div>
      <p className="font-body text-sm text-text-muted">Food keeps you going</p>
    </SceneWrapper>
  ),

  "three-different-foods-side-by-side": () => (
    <SceneWrapper bg="bg-primary-light/20">
      <div className="flex items-center gap-6">
        {[
          { emoji: "🍎", label: "Apple" },
          { emoji: "🍞", label: "Bread" },
          { emoji: "🥛", label: "Yogurt" },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="text-5xl">{f.emoji}</span>
            <span className="font-body text-xs text-text-muted">{f.label}</span>
          </motion.div>
        ))}
      </div>
      <p className="font-body text-sm text-text-muted">Different foods, different jobs</p>
    </SceneWrapper>
  ),

  "magnifying-glass-over-plate-zoom-to-molecules": () => (
    <SceneWrapper bg="bg-secondary/10">
      <div className="relative">
        <span className="text-7xl">🍽️</span>
        <motion.span
          className="absolute -right-4 -top-2 text-5xl"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔍
        </motion.span>
      </div>
      <p className="font-body text-sm text-text-muted">What's inside our food?</p>
    </SceneWrapper>
  ),

  "three-mystery-boxes-labeled-question-marks": () => (
    <SceneWrapper bg="bg-primary/10">
      <div className="flex items-center gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-primary/30 bg-primary-light/40 shadow-md"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <span className="font-display text-3xl text-primary">?</span>
          </motion.div>
        ))}
      </div>
      <p className="font-display text-base text-primary">Three mystery groups</p>
    </SceneWrapper>
  ),

  "purple-mascot-waving-next-to-closed-boxes": () => (
    <SceneWrapper bg="bg-primary-light/25">
      <div className="flex items-center gap-4">
        <motion.span
          className="text-7xl"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          👋
        </motion.span>
        <div className="flex gap-2">
          {["🟡", "🟢", "🟣"].map((c, i) => (
            <motion.div
              key={i}
              className="flex h-14 w-14 items-center justify-center rounded-xl border-3 border-text/15 bg-surface-raised shadow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <span className="text-2xl">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="font-body text-sm text-text-muted">Coming up next!</p>
    </SceneWrapper>
  ),

  "quiz-panel-number-options-preview": () => (
    <SceneWrapper bg="bg-warning/10">
      <motion.span
        className="font-display text-5xl text-primary"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        How many?
      </motion.span>
      <div className="flex gap-3">
        {["2", "3", "5", "10"].map((n, i) => (
          <motion.div
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-primary/30 bg-surface-raised font-display text-xl text-primary shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {n}
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
      <p className="text-center font-body text-sm text-text-muted">{name}</p>
    </div>
  );
}
