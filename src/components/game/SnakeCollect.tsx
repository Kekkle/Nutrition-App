import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { SnakeCollectConfig } from "../../types";

interface Props {
  config: SnakeCollectConfig;
  onComplete: (stars: number) => void;
}

type Dir = "up" | "down" | "left" | "right";
type Pos = { x: number; y: number };

interface SpawnedItem {
  id: number;
  pos: Pos;
  icon: string;
  good: boolean;
}

function posEq(a: Pos, b: Pos) {
  return a.x === b.x && a.y === b.y;
}

export default function SnakeCollect({ config, onComplete }: Props) {
  const { gridWidth, gridHeight, startPos, goodItems, badItems, totalSpawns, obstacles = [] } = config;

  const obstacleSet = useRef(new Set<string>());
  if (obstacleSet.current.size === 0 && obstacles.length > 0) {
    for (const o of obstacles) {
      for (let dx = 0; dx < o.w; dx++) {
        for (let dy = 0; dy < o.h; dy++) {
          obstacleSet.current.add(`${o.x + dx},${o.y + dy}`);
        }
      }
    }
  }

  const initialSnake: Pos[] = [startPos, { x: startPos.x - 1, y: startPos.y }];

  const [snake, setSnake] = useState<Pos[]>(initialSnake);
  const [dir, setDir] = useState<Dir>("right");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [collected, setCollected] = useState(0);
  const [buzzing, setBuzzing] = useState(false);
  const [items, setItems] = useState<SpawnedItem[]>([]);
  const [spawnCount, setSpawnCount] = useState(0);

  const dirRef = useRef<Dir>("right");
  const tickRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const spawnIdRef = useRef(0);
  const swipeRef = useRef<HTMLDivElement>(null);

  const speed = Math.max(120, 320 - collected * 10);

  const spawnItem = useCallback(() => {
    if (spawnCount >= totalSpawns) return;
    const allPositions = snake.concat(items.map((i) => i.pos));
    let pos: Pos;
    let attempts = 0;
    do {
      pos = { x: Math.floor(Math.random() * gridWidth), y: Math.floor(Math.random() * gridHeight) };
      attempts++;
    } while ((allPositions.some((p) => posEq(p, pos)) || obstacleSet.current.has(`${pos.x},${pos.y}`)) && attempts < 50);

    const isGood = Math.random() < 0.6;
    const pool = isGood ? goodItems : badItems;
    const icon = pool[Math.floor(Math.random() * pool.length)]!;
    spawnIdRef.current += 1;

    setItems((prev) => [...prev, { id: spawnIdRef.current, pos, icon, good: isGood }]);
    setSpawnCount((c) => c + 1);
  }, [snake, items, spawnCount, totalSpawns, goodItems, badItems, gridWidth, gridHeight]);

  useEffect(() => {
    if (gameOver || won) return;
    if (items.length < 5 && spawnCount < totalSpawns) {
      spawnItem();
    }
  }, [items.length, spawnCount, totalSpawns, spawnItem, gameOver, won]);

  const tick = useCallback(() => {
    setSnake((prev) => {
      const head = prev[0]!;
      const d = dirRef.current;
      const next: Pos = {
        x: head.x + (d === "left" ? -1 : d === "right" ? 1 : 0),
        y: head.y + (d === "up" ? -1 : d === "down" ? 1 : 0),
      };

      if (next.x < 0 || next.x >= gridWidth || next.y < 0 || next.y >= gridHeight) {
        setGameOver(true);
        return prev;
      }

      if (obstacleSet.current.has(`${next.x},${next.y}`)) {
        setGameOver(true);
        return prev;
      }

      if (prev.slice(1).some((s) => posEq(s, next))) {
        setGameOver(true);
        return prev;
      }

      const hitItem = items.find((it) => posEq(it.pos, next));
      if (hitItem) {
        setItems((prev) => prev.filter((it) => it.id !== hitItem.id));
        if (hitItem.good) {
          setCollected((c) => {
            const newC = c + 1;
            const goodTotal = Math.ceil(totalSpawns * 0.6);
            if (newC >= goodTotal) setWon(true);
            return newC;
          });
          return [next, ...prev];
        } else {
          setBuzzing(true);
          setTimeout(() => setBuzzing(false), 400);
          const shrunk = prev.length > 2 ? prev.slice(0, -2) : prev.slice(0, -1);
          return [next, ...shrunk];
        }
      }

      return [next, ...prev.slice(0, -1)];
    });
  }, [gridWidth, gridHeight, items, collected, totalSpawns]);

  useEffect(() => {
    if (gameOver || won) {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }
    tickRef.current = setInterval(tick, speed);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [tick, gameOver, won, speed]);

  useEffect(() => {
    if (won) {
      const stars = snake.length >= 10 ? 3 : snake.length >= 6 ? 2 : 1;
      const t = setTimeout(() => onComplete(stars), 600);
      return () => clearTimeout(t);
    }
  }, [won, snake.length, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
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

  useEffect(() => {
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

  const restart = () => {
    setSnake(initialSnake);
    dirRef.current = "right";
    setDir("right");
    setGameOver(false);
    setWon(false);
    setCollected(0);
    setBuzzing(false);
    setItems([]);
    setSpawnCount(0);
    spawnIdRef.current = 0;
  };

  const goodTarget = Math.ceil(totalSpawns * 0.6);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-2 px-4 pb-4">
      <h2 className="text-center font-display text-xl leading-tight text-text sm:text-2xl">
        {config.prompt}
      </h2>

      <div className="flex items-center gap-4 font-body text-sm text-text-muted">
        <span>Collected: <strong className="text-success">{collected}</strong>/{goodTarget}</span>
        <span>Length: <strong className="text-primary">{snake.length}</strong></span>
      </div>

      <div
        ref={swipeRef}
        className="relative mx-auto aspect-[18/14] w-full max-w-lg overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary-light/10"
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
                  style={{ gridColumn: ox + 1, gridRow: oy + 1 }}
                />
              );
            }),
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center"
              style={{ gridColumn: item.pos.x + 1, gridRow: item.pos.y + 1 }}
            >
              <span className={`text-sm sm:text-lg ${item.good ? "" : "opacity-70"}`}>{item.icon}</span>
            </div>
          ))}

          {snake.map((seg, i) => (
            <motion.div
              key={i}
              className={`rounded-sm ${i === 0 ? "bg-success" : "bg-success/50"} ${gameOver ? "bg-error" : ""} ${buzzing ? "!bg-error/70" : ""}`}
              style={{ gridColumn: seg.x + 1, gridRow: seg.y + 1 }}
              initial={i === 0 ? { scale: 0.8 } : false}
              animate={buzzing ? { x: [0, -2, 2, -2, 0], scale: 1 } : { scale: 1 }}
              transition={{ duration: buzzing ? 0.3 : 0.06 }}
            >
              {i === 0 && (
                <span className="flex h-full items-center justify-center text-xs sm:text-sm">
                  {dir === "left" ? "◀" : dir === "right" ? "▶" : dir === "up" ? "▲" : "▼"}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {gameOver && !won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface/80 backdrop-blur-sm">
            <p className="font-display text-xl text-error">Oops!</p>
            <p className="font-body text-sm text-text-muted">
              You hit a wall or yourself!
            </p>
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

      <div className="grid grid-cols-3 gap-1 sm:hidden">
        <div />
        <button type="button" className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "down") { dirRef.current = "up"; setDir("up"); } }}>▲</button>
        <div />
        <button type="button" className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "right") { dirRef.current = "left"; setDir("left"); } }}>◀</button>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-xs text-text-muted">
          {dir === "up" ? "▲" : dir === "down" ? "▼" : dir === "left" ? "◀" : "▶"}
        </div>
        <button type="button" className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "left") { dirRef.current = "right"; setDir("right"); } }}>▶</button>
        <div />
        <button type="button" className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-xl active:bg-primary/40"
          onClick={() => { if (dirRef.current !== "up") { dirRef.current = "down"; setDir("down"); } }}>▼</button>
        <div />
      </div>

      <p className="text-center font-body text-xs text-text-muted">
        Collect food, water, and sleep icons. Avoid the bad ones!
      </p>
    </div>
  );
}
