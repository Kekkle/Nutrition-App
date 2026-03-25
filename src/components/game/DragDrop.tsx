import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragOverEvent,
  type DragStartEvent,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DragDropConfig, GameItem } from "../../types";

export interface DragDropProps {
  config: DragDropConfig;
  onComplete: (stars: number) => void;
}

function PoolCard({
  item,
  isDragging,
}: {
  item: GameItem;
  isDragging: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none ${isDragging ? "opacity-30" : "opacity-100"}`}
    >
      <div className="flex cursor-grab flex-col items-center justify-center gap-2 rounded-2xl border-[4px] border-secondary/70 bg-surface-raised px-4 py-3 font-body shadow-[4px_4px_0_rgba(45,52,54,0.12)] active:cursor-grabbing">
        <span className="text-5xl leading-none" aria-hidden>
          {item.icon}
        </span>
        <span className="text-center text-sm font-bold text-text">
          {item.label}
        </span>
      </div>
    </div>
  );
}

function TargetZone({
  id,
  label,
  icon,
  children,
  isHighlighted,
}: {
  id: string;
  label: string;
  icon: string;
  children: ReactNode;
  isHighlighted: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const active = isOver || isHighlighted;

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[140px] rounded-3xl border-[4px] border-dashed p-4 font-body transition-[box-shadow,border-color,background-color] duration-200 ${
        active
          ? "border-primary bg-primary-light/25 shadow-[0_0_24px_rgba(108,92,231,0.35)]"
          : "border-primary/35 bg-accent/15"
      }`}
    >
      <div className="mb-3 flex items-center justify-center gap-2 text-text">
        <span className="text-3xl" aria-hidden>
          {icon}
        </span>
        <span className="font-display text-lg text-primary">{label}</span>
      </div>
      <div className="flex min-h-[72px] flex-wrap content-start justify-center gap-2">
        {children}
      </div>
    </div>
  );
}

function PlacedChip({ item }: { item: GameItem }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="flex flex-col items-center justify-center gap-1 rounded-xl border-[3px] border-success/60 bg-success/15 px-3 py-2 font-body shadow-sm"
    >
      <span className="text-3xl leading-none" aria-hidden>
        {item.icon}
      </span>
      <span className="max-w-[88px] text-center text-xs font-bold text-text">
        {item.label}
      </span>
    </motion.div>
  );
}

function OverlayCard({ item }: { item: GameItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-[4px] border-primary bg-surface-raised px-4 py-3 font-body shadow-[6px_6px_0_rgba(108,92,231,0.25)]">
      <span className="text-5xl leading-none" aria-hidden>
        {item.icon}
      </span>
      <span className="text-center text-sm font-bold text-text">
        {item.label}
      </span>
    </div>
  );
}

export default function DragDrop({ config, onComplete }: DragDropProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [mistakes, setMistakes] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overTargetId, setOverTargetId] = useState<string | null>(null);
  const [shakePool, setShakePool] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
  );

  const itemById = useMemo(() => {
    const m = new Map<string, GameItem>();
    for (const it of config.items) m.set(it.id, it);
    return m;
  }, [config.items]);

  const poolItems = useMemo(
    () => config.items.filter((it) => placements[it.id] === undefined),
    [config.items, placements],
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverTargetId(event.over ? String(event.over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      setOverTargetId(null);

      if (!over) return;

      const itemId = String(active.id);
      if (placements[itemId] !== undefined) return;

      const targetId = String(over.id);
      const expected = config.correctMapping[itemId];

      if (expected === targetId) {
        setPlacements((p) => ({ ...p, [itemId]: targetId }));
      } else {
        setMistakes((m) => m + 1);
        setShakePool(true);
        window.setTimeout(() => setShakePool(false), 500);
      }
    },
    [config.correctMapping, placements],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setOverTargetId(null);
  }, []);

  const placedCount = Object.keys(placements).length;
  const total = config.items.length;

  useEffect(() => {
    if (placedCount !== total) return;
    const stars = mistakes >= 3 ? 1 : mistakes >= 1 ? 2 : 3;
    const t = window.setTimeout(() => onComplete(stars), 500);
    return () => clearTimeout(t);
  }, [placedCount, total, mistakes, onComplete]);

  const activeItem = activeId ? itemById.get(activeId) : undefined;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-6 px-4 pb-6">
        <h2 className="text-center font-display text-2xl leading-tight text-text sm:text-3xl">
          {config.prompt}
        </h2>

        <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
          {config.targets.map((target) => {
            const placedHere = config.items.filter(
              (it) => placements[it.id] === target.id,
            );
            return (
              <TargetZone
                key={target.id}
                id={target.id}
                label={target.label}
                icon={target.icon}
                isHighlighted={overTargetId === target.id}
              >
                {placedHere.map((it) => (
                  <PlacedChip key={it.id} item={it} />
                ))}
              </TargetZone>
            );
          })}
        </div>

        <div className="mt-auto">
          <p className="mb-3 text-center font-body text-sm font-semibold text-text-muted">
            Drag each one to a zone
          </p>
          <motion.div
            animate={
              shakePool
                ? { x: [0, -5, 5, -4, 4, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-wrap justify-center gap-3"
          >
            {poolItems.map((item) => (
              <PoolCard
                key={item.id}
                item={item}
                isDragging={activeId === item.id}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeItem ? <OverlayCard item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
