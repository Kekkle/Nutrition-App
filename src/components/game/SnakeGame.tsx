import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { SnakeConfig } from "../../types";

interface Props {
  config: SnakeConfig;
  onComplete: (stars: number) => void;
}

type Dir = "up" | "down" | "left" | "right";
type Pos = { x: number; y: number };

function posEq(a: Pos, b: Pos) {
  return a.x === b.x && a.y === b.y;
}

export default function SnakeGame({ config, onComplete }: Props) {
  const { gridWidth, gridHeight, plugStart, socketPos, obstacles } = config;
  const collectibles = config.collectibles ?? [];
  const collectiblesRequired = config.collectiblesRequired ?? 0;

  const obstacleSet = useRef(new Set<string>());
  if (obstacleSet.current.size === 0) {
    for (const o of obstacles) {
      for (let dx = 0; dx < o.w; dx++) {
        for (let dy = 0; dy < o.h; dy++) {
          obstacleSet.current.add(`${o.x + dx},${o.y + dy}`);
        }
      }
    }
  }

  const initialSnake: Pos[] = [plugStart, { x: plugStart.x - 1, y: plugStart.y }];
  const [snake, setSnake] = useState<Pos[]>(initialSnake);
  const snakeRef = useRef<Pos[]>(initialSnake);
  const [dir, setDir] = useState<Dir>("right");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [collected, setCollected] = useState<Set<number>>(new Set());
  const collectedRef = useRef<Set<number>>(new Set());
  const dirRef = useRef<Dir>("right");
  const tickRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const isBlocked = useCallback(
    (p: Pos) => {
      if (p.x < 0 || p.x >= gridWidth || p.y < 0 || p.y >= gridHeight) return true;
      return obstacleSet.current.has(`${p.x},${p.y}`);
    },
    [gridWidth, gridHeight],
  );

  const tick = useCallback(() => {
    const prev = snakeRef.current;
    const head = prev[0]!;
    const d = dirRef.current;
    const next: Pos = {
      x: head.x + (d === "left" ? -1 : d === "right" ? 1 : 0),
      y: head.y + (d === "up" ? -1 : d === "down" ? 1 : 0),
    };

    if (isBlocked(next) || prev.some((s) => posEq(s, next))) {
      setGameOver(true);
      return;
    }

    const colIdx = collectibles.findIndex(
      (c, ci) => !collectedRef.current.has(ci) && posEq(next, c),
    );

    let newSnake: Pos[];
    if (colIdx !== -1) {
      collectedRef.current = new Set([...collectedRef.current, colIdx]);
      setCollected(new Set(collectedRef.current));
      newSnake = [next, ...prev];
    } else {
      const allCollected = collectedRef.current.size >= collectiblesRequired;
      if (posEq(next, socketPos) && allCollected) {
        setWon(true);
        newSnake = [next, ...prev];
      } else {
        newSnake = [next, ...prev.slice(0, -1)];
      }
    }

    snakeRef.current = newSnake;
    setSnake(newSnake);
    setMoves((m) => m + 1);
  }, [isBlocked, socketPos, collectibles, collectiblesRequired]);

  useEffect(() => {
    if (gameOver || won) {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }
    tickRef.current = setInterval(tick, 280);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [tick, gameOver, won]);

  useEffect(() => {
    if (won) {
      const stars = moves < 40 ? 3 : moves < 70 ? 2 : 1;
      const t = setTimeout(() => onComplete(stars), 600);
      return () => clearTimeout(t);
    }
  }, [won, moves, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const nd = map[e.key];
      if (!nd) return;
      e.preventDefault();
      const opposite: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
      if (opposite[nd] === dirRef.current) return;
      dirRef.current = nd;
      setDir(nd);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSwipe = useCallback(() => {
    const el = swipeRef.current;
    if (!el) return;
    let startX = 0, startY = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]!.clientX;
      startY = e.touches[0]!.clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0]!.clientX - startX;
      const dy = e.changedTouches[0]!.clientY - startY;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      const opposite: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
      let nd: Dir;
      if (Math.abs(dx) > Math.abs(dy)) {
        nd = dx > 0 ? "right" : "left";
      } else {
        nd = dy > 0 ? "down" : "up";
      }
      if (opposite[nd] === dirRef.current) return;
      dirRef.current = nd;
      setDir(nd);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  const swipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return handleSwipe();
  }, [handleSwipe]);

  const restart = () => {
    snakeRef.current = initialSnake;
    setSnake(initialSnake);
    dirRef.current = "right";
    setDir("right");
    setGameOver(false);
    setWon(false);
    setMoves(0);
    collectedRef.current = new Set();
    setCollected(new Set());
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-3 px-4 pb-6">
      <h2 className="text-center font-display text-xl leading-tight text-text sm:text-2xl">
        {config.prompt}
      </h2>

      <div
        ref={swipeRef}
        className="relative mx-auto aspect-[15/12] w-full max-w-md overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary-light/10"
        style={{ touchAction: "none" }}
      >
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
          }}
        >
          {obstacles.map((o, oi) =>
            Array.from({ length: o.w * o.h }).map((_, ci) => {
              const ox = o.x + (ci % o.w);
              const oy = o.y + Math.floor(ci / o.w);
              return (
                <div
                  key={`obs-${oi}-${ci}`}
                  className="rounded-sm bg-text/15"
                  style={{
                    gridColumn: ox + 1,
                    gridRow: oy + 1,
                  }}
                />
              );
            }),
          )}

          {collectibles.map((c, ci) =>
            !collected.has(ci) ? (
              <div
                key={`bolt-${ci}`}
                className="flex items-center justify-center"
                style={{ gridColumn: c.x + 1, gridRow: c.y + 1 }}
              >
                <motion.span
                  className="text-lg sm:text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  {c.emoji}
                </motion.span>
              </div>
            ) : null,
          )}

          <div
            className="flex items-center justify-center"
            style={{
              gridColumn: socketPos.x + 1,
              gridRow: socketPos.y + 1,
              opacity: collected.size >= collectiblesRequired ? 1 : 0.3,
            }}
          >
            <span className="text-lg sm:text-2xl">📱</span>
          </div>

          {snake.map((seg, i) => (
            <motion.div
              key={i}
              className={`rounded-sm ${i === 0 ? "bg-warning" : "bg-warning/60"} ${won ? "bg-success" : ""}`}
              style={{
                gridColumn: seg.x + 1,
                gridRow: seg.y + 1,
              }}
              initial={i === 0 ? { scale: 0.8 } : false}
              animate={{ scale: 1 }}
              transition={{ duration: 0.08 }}
            >
              {i === 0 && (
                <span className="flex h-full items-center justify-center text-xs sm:text-base">
                  🔌
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {gameOver && !won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface/80 backdrop-blur-sm">
            <p className="font-display text-xl text-error">Oops!</p>
            <button
              type="button"
              onClick={restart}
              className="rounded-xl bg-primary px-5 py-2 font-display text-sm text-white shadow-md transition hover:bg-primary/80"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* D-pad for mobile */}
      <div className="grid grid-cols-3 gap-1 sm:hidden">
        <div />
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "down") { dirRef.current = "up"; setDir("up"); } }}
        >
          ▲
        </button>
        <div />
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "right") { dirRef.current = "left"; setDir("left"); } }}
        >
          ◀
        </button>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-xs text-text-muted">
          {dir === "up" ? "▲" : dir === "down" ? "▼" : dir === "left" ? "◀" : "▶"}
        </div>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "left") { dirRef.current = "right"; setDir("right"); } }}
        >
          ▶
        </button>
        <div />
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "up") { dirRef.current = "down"; setDir("down"); } }}
        >
          ▼
        </button>
        <div />
      </div>

      {collectiblesRequired > 0 && (
        <p className="text-center font-body text-sm font-semibold text-text">
          ⚡ {collected.size} / {collectiblesRequired}
          {collected.size >= collectiblesRequired
            ? " — Head to the phone!"
            : " — Collect the bolts first!"}
        </p>
      )}

      <p className="text-center font-body text-xs text-text-muted">
        {typeof window !== "undefined" && "ontouchstart" in window
          ? "Swipe to collect electricity to power the phone!"
          : "Use arrow keys to collect electricity to power the phone!"}
      </p>
    </div>
  );
}
