import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CatcherConfig } from "../../types";
import { asset } from "../../utils/asset";

export interface CatcherGameProps {
  config: CatcherConfig;
  onComplete: (stars: number) => void;
}

interface FallingItem {
  id: number;
  emoji: string;
  categoryId: string;
  x: number;
  y: number;
}

const BOX_FILTERS: Record<string, string> = {
  carbs: "grayscale(100%) sepia(100%) hue-rotate(310deg) saturate(400%) brightness(85%)",
  protein: "grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(350%) brightness(80%)",
  fats: "grayscale(100%) sepia(100%) hue-rotate(330deg) saturate(500%) brightness(80%)",
};

const LABEL_COLORS: Record<string, string> = {
  carbs: "text-carb",
  protein: "text-protein",
  fats: "text-fat",
};

const BG_COLORS: Record<string, string> = {
  carbs: "border-carb bg-carb/15",
  protein: "border-protein bg-protein/15",
  fats: "border-fat bg-fat/15",
};

export default function CatcherGame({ config, onComplete }: CatcherGameProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [boxX, setBoxX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);

  const areaRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<number | undefined>(undefined);
  const spawnRef = useRef<number | undefined>(undefined);
  const nextId = useRef(0);
  const droppedRef = useRef(0);
  const boxXRef = useRef(50);
  const dragging = useRef(false);

  const totalDrops = config.totalDrops;
  const allEmojis = config.categories.flatMap((c) =>
    c.items.map((emoji) => ({ emoji, categoryId: c.id }))
  );

  const startGame = useCallback(
    (catId: string) => {
      setSelectedCategory(catId);
      setBoxX(50);
      boxXRef.current = 50;
      setItems([]);
      setScore(0);
      setMistakes(0);
      setDropped(0);
      droppedRef.current = 0;
      setGameOver(false);
      nextId.current = 0;
    },
    []
  );

  useEffect(() => {
    if (!selectedCategory || gameOver) return;

    const spawnInterval = Math.max(600, 1200 - dropped * 8);

    spawnRef.current = window.setInterval(() => {
      if (droppedRef.current >= totalDrops) {
        clearInterval(spawnRef.current);
        return;
      }
      const pick = allEmojis[Math.floor(Math.random() * allEmojis.length)]!;
      const id = nextId.current++;
      const x = 8 + Math.random() * 84;
      setItems((prev) => [...prev, { id, emoji: pick.emoji, categoryId: pick.categoryId, x, y: -8 }]);
      droppedRef.current++;
      setDropped(droppedRef.current);
    }, spawnInterval);

    return () => clearInterval(spawnRef.current);
  }, [selectedCategory, gameOver, dropped, totalDrops, allEmojis]);

  useEffect(() => {
    if (!selectedCategory || gameOver) return;

    const fallSpeed = config.baseFallSpeed ?? 1.2;

    const tick = () => {
      setItems((prev) => {
        const kept: FallingItem[] = [];
        let newScore = 0;
        let newMistakes = 0;
        let caught = false;

        for (const item of prev) {
          const nextY = item.y + fallSpeed;

          if (nextY >= 82 && nextY < 96) {
            const bx = boxXRef.current;
            const boxHalf = 10;
            if (Math.abs(item.x - bx) < boxHalf) {
              caught = true;
              if (item.categoryId === selectedCategory) {
                newScore++;
              } else {
                newMistakes++;
              }
              continue;
            }
          }

          if (nextY > 105) continue;

          kept.push({ ...item, y: nextY });
        }

        if (newScore > 0) {
          setScore((s) => s + newScore);
          setFlash("good");
          setTimeout(() => setFlash(null), 200);
        }
        if (newMistakes > 0) {
          setMistakes((m) => m + newMistakes);
          setFlash("bad");
          setTimeout(() => setFlash(null), 300);
        }
        if (caught) {
          // trigger re-render
        }

        return kept;
      });

      if (droppedRef.current >= totalDrops) {
        setItems((prev) => {
          if (prev.length === 0) {
            setGameOver(true);
          }
          return prev;
        });
      }

      tickRef.current = requestAnimationFrame(tick);
    };

    tickRef.current = requestAnimationFrame(tick);
    return () => {
      if (tickRef.current !== undefined) cancelAnimationFrame(tickRef.current);
    };
  }, [selectedCategory, gameOver, selectedCategory, totalDrops, config.baseFallSpeed]);

  useEffect(() => {
    if (!gameOver || !selectedCategory) return;
    const correctItems = config.categories.find((c) => c.id === selectedCategory)?.items.length ?? 5;
    const ratio = score / Math.max(1, correctItems);
    const stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
    const t = setTimeout(() => onComplete(stars), 800);
    return () => clearTimeout(t);
  }, [gameOver, score, selectedCategory, config.categories, onComplete]);

  useEffect(() => {
    if (!selectedCategory || gameOver) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        boxXRef.current = Math.max(8, boxXRef.current - 4);
        setBoxX(boxXRef.current);
      } else if (e.key === "ArrowRight" || e.key === "d") {
        boxXRef.current = Math.min(92, boxXRef.current + 4);
        setBoxX(boxXRef.current);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedCategory, gameOver]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateBoxFromPointer(e.clientX);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateBoxFromPointer(e.clientX);
  }, []);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const updateBoxFromPointer = (clientX: number) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, pct));
    boxXRef.current = clamped;
    setBoxX(clamped);
  };

  if (!selectedCategory) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
        <h2 className="text-center font-display text-xl text-text sm:text-2xl">
          {config.prompt}
        </h2>
        <p className="text-center font-body text-sm text-text-muted">
          Pick a box to fill!
        </p>
        <div className="flex gap-4">
          {config.categories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => startGame(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-2 rounded-2xl border-[3px] p-4 transition-colors ${
                BG_COLORS[cat.id] ?? "border-primary bg-primary/10"
              }`}
            >
              <img
                src={asset("/images/mystery-box.png")}
                alt={cat.label}
                className="h-24 w-24 object-contain drop-shadow-lg sm:h-28 sm:w-28"
                style={{ filter: BOX_FILTERS[cat.id] ?? "" }}
              />
              <span className={`font-display text-base font-bold ${LABEL_COLORS[cat.id] ?? "text-primary"}`}>
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const activeCat = config.categories.find((c) => c.id === selectedCategory);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className={`font-display text-sm font-bold ${LABEL_COLORS[selectedCategory] ?? "text-primary"}`}>
            {activeCat?.label}
          </span>
        </div>
        <div className="flex gap-4 font-body text-sm font-semibold">
          <span className="text-success">Caught: {score}</span>
          <span className="text-error">Wrong: {mistakes}</span>
          <span className="text-text-muted">{dropped}/{totalDrops}</span>
        </div>
      </div>

      <div
        ref={areaRef}
        className="relative flex-1 touch-none overflow-hidden bg-gradient-to-b from-sky-100/50 to-transparent"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ left: `${item.x}%`, top: `${item.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <span className="text-3xl select-none sm:text-4xl">{item.emoji}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        <div
          className="absolute"
          style={{
            left: `${boxX}%`,
            bottom: "4%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            animate={
              flash === "good"
                ? { scale: [1, 1.15, 1] }
                : flash === "bad"
                  ? { x: [0, -6, 6, -4, 4, 0], rotate: [0, -3, 3, 0] }
                  : {}
            }
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            <img
              src={asset("/images/mystery-box.png")}
              alt={activeCat?.label ?? "Box"}
              className="h-16 w-16 object-contain drop-shadow-xl sm:h-20 sm:w-20"
              style={{ filter: BOX_FILTERS[selectedCategory] ?? "" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
