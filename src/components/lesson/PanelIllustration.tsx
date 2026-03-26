import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

/* ——— Grid backgrounds ——— */

const lightGridStyle: CSSProperties = {
  backgroundColor: "#FFF5EE",
  backgroundImage: `
    linear-gradient(rgba(200, 180, 170, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 180, 170, 0.15) 1px, transparent 1px)
  `,
  backgroundSize: "24px 24px",
};

const darkGridStyle: CSSProperties = {
  backgroundColor: "#4A4494",
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
  `,
  backgroundSize: "24px 24px",
};

function GridScene({
  variant,
  children,
  className = "",
}: {
  variant: "light" | "dark";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl px-4 py-6 ${className}`}
      style={variant === "light" ? lightGridStyle : darkGridStyle}
    >
      {children}
    </div>
  );
}

/* ——— Canva assets ——— */

function CanvaImg({
  src,
  alt,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`max-h-full max-w-full object-contain ${className}`}
      style={style}
      draggable={false}
    />
  );
}

const CANVA = (filename: string) => `/images/canva/${filename}`;

/* ——— SVG icons (thick strokes, rounded, cartoony) ——— */

const svgDefault = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconLightning({ className = "text-amber-400", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        {...svgDefault}
        d="M36 4L14 34h16l-6 26 28-32H38l4-24z"
        fill="currentColor"
        stroke="#F59E0B"
        strokeWidth={2}
      />
    </svg>
  );
}

function IconBrain({ glow = false, size = 100 }: { glow?: boolean; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="text-violet-200"
      aria-hidden
      animate={
        glow
          ? {
              filter: [
                "drop-shadow(0 0 8px rgba(196, 181, 253, 0.9))",
                "drop-shadow(0 0 18px rgba(196, 181, 253, 1))",
                "drop-shadow(0 0 8px rgba(196, 181, 253, 0.9))",
              ],
            }
          : undefined
      }
      transition={glow ? { duration: 2, repeat: Infinity, ease: "easeInOut" as const } : undefined}
    >
      <path
        {...svgDefault}
        stroke="#E9D5FF"
        fill="rgba(139,92,246,0.35)"
        d="M32 8c-4 0-8 3-9 7-4 1-7 5-7 10 0 3 1 6 4 8-1 2-1 4 0 6 2 4 7 6 12 5v-36zm0 0c4 0 8 3 9 7 4 1 7 5 7 10 0 3-1 6-4 8 1 2 1 4 0 6-2 4-7 6-12 5v-36z"
      />
      <path {...svgDefault} stroke="#DDD6FE" d="M26 22c2 2 4 2 6 0M32 28v10M28 36h8" />
    </motion.svg>
  );
}

function IconHeart({ size = 88 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="text-rose-400"
      aria-hidden
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" as const }}
    >
      <path
        {...svgDefault}
        stroke="#FB7185"
        fill="rgba(251,113,133,0.35)"
        d="M32 54S8 38 8 24c0-8 6-14 14-14 4 0 8 2 10 6 2-4 6-6 10-6 8 0 14 6 14 14 0 14-24 30-24 30z"
      />
    </motion.svg>
  );
}

function IconLungs({ size = 96 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="text-sky-300"
      aria-hidden
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }}
    >
      <path {...svgDefault} stroke="#7DD3FC" d="M32 8v14" />
      <path
        {...svgDefault}
        stroke="#BAE6FD"
        fill="rgba(125,211,252,0.25)"
        d="M32 22c-6 0-10 6-12 14l-4 18c2 2 6 3 10 2l6-20c1-4 0-8-2-10-2-2-4-4-6-4v0z"
      />
      <path
        {...svgDefault}
        stroke="#BAE6FD"
        fill="rgba(125,211,252,0.25)"
        d="M32 22c6 0 10 6 12 14l4 18c-2 2-6 3-10 2l-6-20c-1-4 0-8 2-10 2-2 4-4 6-4v0z"
      />
      <path {...svgDefault} stroke="#7DD3FC" d="M20 36c2 4 4 6 6 8M44 36c-2 4-4 6-6 8" />
    </motion.svg>
  );
}

function IconDigestive({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="text-amber-200" aria-hidden>
      <path
        {...svgDefault}
        stroke="#FDE68A"
        fill="rgba(253,230,138,0.2)"
        d="M28 6h8v8c0 4-2 7-4 9 4 2 6 6 6 12 0 6-3 11-8 14 2 3 2 7 0 10-6 4-14 2-18-4-2-3-2-7 0-10-5-3-8-8-8-14 0-6 2-10 6-12-2-2-4-5-4-9v-8h8"
      />
      <path {...svgDefault} stroke="#FCD34D" d="M32 23v18M26 32c2 3 5 5 6 8M38 32c-2 3-5 5-6 8" />
    </svg>
  );
}

function IconBone({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-stone-100" aria-hidden>
      <path
        {...svgDefault}
        stroke="#F5F5F4"
        fill="rgba(255,255,255,0.35)"
        d="M14 10c-3 0-5 2-5 5s2 5 5 5c1 0 2 0 3-1l8 10 8-10c1 1 2 1 3 1 3 0 5-2 5-5s-2-5-5-5-5 2-5 5c0 1 0 2 1 3L24 30l-6-7c1-1 1-2 1-3 0-3-2-5-5-5z"
      />
    </svg>
  );
}

function IconMuscle({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-orange-200" aria-hidden>
      <path
        {...svgDefault}
        stroke="#FDBA74"
        fill="rgba(253,186,116,0.35)"
        d="M8 32c4-8 12-14 20-16 4-1 8 1 10 5 2 4 1 9-2 12-4 4-10 5-16 3M12 36c3 2 7 3 11 2"
      />
      <ellipse cx="34" cy="14" rx="6" ry="5" {...svgDefault} stroke="#FED7AA" fill="rgba(254,215,170,0.4)" />
    </svg>
  );
}

function IconWaterBottle({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 64" className="text-sky-200" aria-hidden>
      <rect x="14" y="18" width="20" height="38" rx="6" {...svgDefault} stroke="#BAE6FD" fill="rgba(56,189,248,0.2)" />
      <path {...svgDefault} stroke="#7DD3FC" d="M18 18v-6h12v6" />
      <rect x="17" y="10" width="14" height="6" rx="2" {...svgDefault} stroke="#E0F2FE" fill="rgba(224,242,254,0.5)" />
    </svg>
  );
}

function IconMoon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-indigo-200" aria-hidden>
      <path
        {...svgDefault}
        stroke="#C7D2FE"
        fill="rgba(199,210,254,0.45)"
        d="M28 8a16 16 0 1 0 16 24 12 12 0 0 1-16-24z"
      />
    </svg>
  );
}

function IconSleepingFigure({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 80 44" className="text-stone-100" aria-hidden>
      <circle cx="58" cy="14" r="6" {...svgDefault} stroke="#F5F5F4" fill="rgba(255,255,255,0.5)" />
      <path {...svgDefault} stroke="#F5F5F4" d="M52 20L12 32M22 28L12 32l12 4M38 26L28 34" />
      <path {...svgDefault} stroke="#E7E5E4" d="M46 18h8" strokeLinecap="round" />
    </svg>
  );
}

function BatteryBar({
  level,
  colorClass,
  animated = false,
  chargeAnimation = false,
}: {
  level: number;
  colorClass: string;
  /** Low–high pulse (e.g. almost empty) */
  animated?: boolean;
  /** Fills and drains repeatedly (charging) */
  chargeAnimation?: boolean;
}) {
  const pct = Math.min(100, Math.max(0, level));
  const inner = (
    <div className="h-full overflow-hidden rounded-full bg-white/20">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={chargeAnimation || animated ? { width: "0%" } : false}
        animate={
          chargeAnimation
            ? { width: ["18%", "92%", "18%"] }
            : animated
              ? { width: [`${Math.max(4, pct - 4)}%`, `${Math.min(100, pct + 4)}%`, `${Math.max(4, pct - 4)}%`] }
              : { width: `${pct}%` }
        }
        transition={
          chargeAnimation
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const }
            : animated
              ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }
              : { duration: 0.4, ease: "easeOut" as const }
        }
      />
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <svg width={28} height={16} viewBox="0 0 36 20" className="shrink-0 text-current" aria-hidden>
        <rect x="2" y="4" width="28" height="12" rx="3" {...svgDefault} strokeWidth={2} className="text-white/80" />
        <path d="M32 8v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-white/80" />
      </svg>
      <div className="h-4 w-36 overflow-hidden rounded-full border-2 border-white/40 bg-black/20">{inner}</div>
    </div>
  );
}

function ChargingCable({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`text-slate-300 ${className}`}
      viewBox="0 0 120 80"
      width={100}
      height={70}
      aria-hidden
    >
      <path
        d="M10 70 L10 40 Q10 20 35 20 L75 20 Q95 20 95 38 L95 52"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="88" y="48" width="14" height="18" rx="3" fill="rgba(148,163,184,0.5)" stroke="currentColor" strokeWidth={2} />
      <rect x="91" y="44" width="8" height="6" rx="1" fill="rgba(203,213,225,0.9)" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

/* ——— App grid (decorative squares, no emojis) ——— */

const APP_TILE_COLORS = [
  "bg-rose-400",
  "bg-amber-400",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-violet-400",
  "bg-orange-400",
  "bg-cyan-400",
  "bg-fuchsia-400",
  "bg-lime-400",
];

function AppsRunningGrid() {
  return (
    <div className="grid max-w-[220px] grid-cols-3 gap-2">
      {APP_TILE_COLORS.map((bg, i) => (
        <motion.div
          key={i}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/40 shadow-md ${bg}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 22 }}
        >
          <span className="h-5 w-5 rounded-md bg-white/35" />
        </motion.div>
      ))}
    </div>
  );
}

/* ——— Food icons (SVG only) ——— */

function IconApple({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-red-500" aria-hidden>
      <path
        {...svgDefault}
        stroke="#EF4444"
        fill="rgba(239,68,68,0.45)"
        d="M24 10c-2 8-12 10-12 22 0 8 6 14 14 14s14-6 14-14c0-12-10-14-12-22"
      />
      <path {...svgDefault} stroke="#854D0E" strokeWidth={2} d="M24 10v-4c2-2 4-3 6-2" />
    </svg>
  );
}

function IconBread({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-amber-600" aria-hidden>
      <ellipse cx="24" cy="26" rx="18" ry="12" {...svgDefault} stroke="#D97706" fill="rgba(245,158,11,0.45)" />
      <path {...svgDefault} stroke="#B45309" d="M10 26c4-4 10-6 14-6s10 2 14 6" />
    </svg>
  );
}

function IconChicken({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-orange-300" aria-hidden>
      <path
        {...svgDefault}
        stroke="#FDBA74"
        fill="rgba(253,186,116,0.5)"
        d="M14 30c0-8 6-14 14-14h4c4 0 8 4 8 8 0 6-4 10-10 10h-6c-4 0-8-2-10-4z"
      />
      <path {...svgDefault} stroke="#EA580C" d="M20 32c2 4 6 6 10 6" />
    </svg>
  );
}

function IconAvocado({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="text-lime-700" aria-hidden>
      <ellipse cx="24" cy="26" rx="14" ry="18" {...svgDefault} stroke="#65A30D" fill="rgba(132,204,22,0.4)" />
      <circle cx="24" cy="24" r="5" fill="rgba(120,53,15,0.7)" stroke="#3F6212" strokeWidth={2} />
    </svg>
  );
}

/* ——— Mystery boxes (no text on icons — abstract colored lids) ——— */

function MacronutrientRevealBoxes() {
  return (
    <div className="flex items-end justify-center gap-3">
      {[
        { lid: "bg-amber-300", inner: "bg-amber-500/60" },
        { lid: "bg-rose-300", inner: "bg-rose-500/60" },
        { lid: "bg-lime-300", inner: "bg-lime-600/50" },
      ].map((box, i) => (
        <motion.div
          key={i}
          className="relative flex h-[4.5rem] w-14 flex-col overflow-hidden rounded-xl border-[3px] border-white/40 shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <motion.div
            className={`h-8 w-full ${box.lid} border-b-2 border-white/30`}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" as const }}
          />
          <div className={`flex flex-1 items-center justify-center ${box.inner}`}>
            <span className="h-6 w-6 rounded-full bg-white/40" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ——— Scene registry ——— */

const ILLUSTRATIONS: Record<string, () => ReactNode> = {
  "celly-phone-with-apps": () => (
    <GridScene variant="light">
      <motion.div
        className="relative flex max-h-[min(52vh,280px)] w-full max-w-[280px] items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <CanvaImg src={CANVA("celly-phone.png")} alt="Celly the phone character with app icons" className="h-full w-auto" />
      </motion.div>
    </GridScene>
  ),

  "essential-apps-grid": () => (
    <GridScene variant="light">
      <div className="relative h-36 w-full max-w-xs overflow-hidden rounded-2xl border-2 border-white/60 bg-white/30 shadow-inner">
        <CanvaImg
          src={CANVA("essential-apps.png")}
          alt="Essential app icons"
          className="h-[145%] w-full object-cover object-top"
          style={{ objectPosition: "50% 12%" }}
        />
      </div>
    </GridScene>
  ),

  "fun-apps-grid": () => (
    <GridScene variant="light">
      <div className="relative h-36 w-full max-w-xs overflow-hidden rounded-2xl border-2 border-white/60 bg-white/30 shadow-inner">
        <CanvaImg
          src={CANVA("fun-apps.png")}
          alt="Fun app icons"
          className="h-[145%] w-full object-cover object-top"
          style={{ objectPosition: "50% 10%" }}
        />
      </div>
    </GridScene>
  ),

  "apps-running-background": () => (
    <GridScene variant="light">
      <AppsRunningGrid />
    </GridScene>
  ),

  "body-like-phone-transition": () => (
    <GridScene variant="light">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.div
          className="h-28 w-28 shrink-0 sm:h-32 sm:w-32"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <CanvaImg src={CANVA("celly-phone.png")} alt="Celly" className="h-full w-full object-contain" />
        </motion.div>
        <motion.span
          className="font-display text-3xl text-violet-600 sm:text-4xl"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" as const }}
        >
          =
        </motion.span>
        <motion.div
          className="h-28 w-28 shrink-0 sm:h-32 sm:w-32"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const, delay: 0.2 }}
        >
          <CanvaImg src={CANVA("stick-figure-body.png")} alt="Stick figure body" className="h-full w-full object-contain" />
        </motion.div>
      </div>
    </GridScene>
  ),

  "phone-battery-empty": () => (
    <GridScene variant="dark" className="text-white">
      <CanvaImg
        src={CANVA("celly-phone.png")}
        alt="Celly with low energy"
        className="max-h-[200px] opacity-45 grayscale"
      />
      <div className="text-white">
        <BatteryBar level={8} colorClass="bg-red-500" animated />
      </div>
    </GridScene>
  ),

  "phone-charging": () => (
    <GridScene variant="dark" className="text-white">
      <div className="relative flex items-end justify-center gap-0">
        <ChargingCable className="mb-2 -mr-2 opacity-90" />
        <motion.div
          className="max-h-[180px] w-[140px]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <CanvaImg src={CANVA("celly-phone.png")} alt="Celly charging" className="h-full w-full object-contain" />
        </motion.div>
      </div>
      <div className="text-white">
        <BatteryBar level={50} colorClass="bg-amber-400" chargeAnimation />
      </div>
    </GridScene>
  ),

  "electricity-power": () => (
    <GridScene variant="dark" className="text-amber-300">
      <motion.div
        animate={{ scale: [1, 1.06, 1], rotate: [0, -4, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <IconLightning size={140} className="text-yellow-400 drop-shadow-[0_0_24px_rgba(250,204,21,0.85)]" />
      </motion.div>
    </GridScene>
  ),

  "phone-fully-charged": () => (
    <GridScene variant="dark" className="text-white">
      <motion.div
        className="max-h-[220px] max-w-[220px]"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <CanvaImg src={CANVA("celly-phone.png")} alt="Celly fully charged" className="drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]" />
      </motion.div>
      <div className="text-white">
        <BatteryBar level={100} colorClass="bg-emerald-400" />
      </div>
    </GridScene>
  ),

  "body-apps-overview": () => (
    <GridScene variant="dark">
      <CanvaImg src={CANVA("body-systems-apps.png")} alt="Body systems as apps" className="max-h-[min(48vh,300px)]" />
    </GridScene>
  ),

  "brain-control-center": () => (
    <GridScene variant="dark" className="items-center">
      <IconBrain glow size={120} />
    </GridScene>
  ),

  "heart-pumping": () => (
    <GridScene variant="dark">
      <IconHeart size={100} />
    </GridScene>
  ),

  "lungs-breathing": () => (
    <GridScene variant="dark">
      <IconLungs size={108} />
    </GridScene>
  ),

  "digestive-system": () => (
    <GridScene variant="dark">
      <IconDigestive size={110} />
    </GridScene>
  ),

  "bones-and-muscles": () => (
    <GridScene variant="dark">
      <div className="flex items-center justify-center gap-8">
        <IconBone size={64} />
        <IconMuscle size={64} />
      </div>
    </GridScene>
  ),

  "all-systems-running": () => (
    <GridScene variant="dark">
      <motion.div
        className="max-h-[min(48vh,300px)] max-w-full"
        animate={{
          filter: [
            "drop-shadow(0 0 12px rgba(196,181,253,0.5))",
            "drop-shadow(0 0 28px rgba(167,139,250,0.95))",
            "drop-shadow(0 0 12px rgba(196,181,253,0.5))",
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <CanvaImg src={CANVA("body-systems-apps.png")} alt="All body systems active" />
      </motion.div>
    </GridScene>
  ),

  "body-needs-recharge": () => (
    <GridScene variant="dark" className="text-white">
      <CanvaImg src={CANVA("stick-figure-body.png")} alt="Body needs energy" className="max-h-[200px]" />
      <div className="text-white">
        <BatteryBar level={10} colorClass="bg-orange-500" animated />
      </div>
    </GridScene>
  ),

  "food-energy-source": () => (
    <GridScene variant="light">
      <CanvaImg
        src={CANVA("food-equals-energy.png")}
        alt="Food provides energy"
        className="max-h-[min(44vh,260px)]"
      />
    </GridScene>
  ),

  "water-flowing": () => (
    <GridScene variant="dark" className="relative text-sky-200">
      <IconWaterBottle size={88} />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-3 w-3 rounded-full bg-sky-300"
            animate={{ y: [0, 14, 28], opacity: [1, 0.85, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeIn" as const,
            }}
          />
        ))}
      </div>
    </GridScene>
  ),

  "sleep-recovery": () => (
    <GridScene variant="dark">
      <div className="flex flex-col items-center gap-4">
        <IconMoon size={64} />
        <IconSleepingFigure size={100} />
      </div>
    </GridScene>
  ),

  "food-main-fuel": () => (
    <GridScene variant="light">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
          <IconApple />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.08 }}
        >
          <IconBread />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.16 }}
        >
          <IconChicken />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.24 }}
        >
          <IconAvocado />
        </motion.div>
      </div>
    </GridScene>
  ),

  "three-food-groups": () => (
    <GridScene variant="light">
      <div className="relative h-44 w-full max-w-md overflow-hidden rounded-2xl border-2 border-white/60 bg-white/25 shadow-inner">
        <CanvaImg
          src={CANVA("three-categories.png")}
          alt="Three nutrient categories"
          className="h-full w-full object-contain object-center"
        />
      </div>
    </GridScene>
  ),

  "macronutrients-reveal": () => (
    <GridScene variant="light">
      <div className="flex w-full max-w-md flex-col items-center gap-5">
        <CanvaImg src={CANVA("macronutrients.png")} alt="Macronutrients" className="max-h-[200px]" />
        <MacronutrientRevealBoxes />
      </div>
    </GridScene>
  ),
};

function Placeholder({ name }: { name: string }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-violet-300/60 bg-[#FFF5EE] px-4 py-6"
      style={lightGridStyle}
    >
      <span className="h-12 w-12 rounded-xl border-2 border-violet-400/40 bg-violet-200/30" aria-hidden />
      <p className="text-center font-body text-sm text-violet-900/70">{name}</p>
    </div>
  );
}

export default function PanelIllustration({ name }: { name: string }) {
  const render = ILLUSTRATIONS[name];
  if (render) return <>{render()}</>;
  return <Placeholder name={name} />;
}
