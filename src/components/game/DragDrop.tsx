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

const beveledBox =
  "rounded-2xl bg-gradient-to-br from-white/40 to-black/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.15)]";

function AppStyleCard({ item, isDragging }: { item: GameItem; isDragging: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none ${isDragging ? "opacity-30" : "opacity-100"}`}
    >
      <div className={`flex cursor-grab items-center justify-center p-2 ${beveledBox} active:cursor-grabbing`}>
        {item.icon.endsWith(".png") ? (
          <img src={`/images/${item.icon}`} alt={item.label} className="h-9 w-9 object-contain" />
        ) : (
          <span className="text-4xl leading-none select-none" aria-hidden>{item.icon}</span>
        )}
      </div>
    </div>
  );
}

function ItemIcon({ icon, label, size = "text-3xl", imgClass = "h-8 w-8" }: { icon: string; label: string; size?: string; imgClass?: string }) {
  if (icon.endsWith(".png")) {
    return <img src={`/images/${icon}`} alt={label} className={`${imgClass} object-contain`} />;
  }
  return <span className={`${size} leading-none select-none`} aria-hidden>{icon}</span>;
}

function OverlayCard({ item }: { item: GameItem }) {
  return (
    <div className={`flex items-center justify-center p-2.5 ${beveledBox} border-2 border-primary shadow-[6px_6px_0_rgba(108,92,231,0.25)]`}>
      <ItemIcon icon={item.icon} label={item.label} />
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
      className={`flex items-center justify-center p-1.5 ${beveledBox} border-2 border-success/60`}
    >
      <ItemIcon icon={item.icon} label={item.label} size="text-xl" imgClass="h-5 w-5" />
    </motion.div>
  );
}

function DropZone({
  id,
  label,
  icon,
  children,
  isHighlighted,
  className = "",
}: {
  id: string;
  label: string;
  icon: string;
  children: ReactNode;
  isHighlighted: boolean;
  className?: string;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const active = isOver || isHighlighted;

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[100px] rounded-3xl border-[3px] border-dashed p-3 font-body transition-[box-shadow,border-color,background-color] duration-200 ${
        active
          ? "border-primary bg-primary-light/25 shadow-[0_0_24px_rgba(108,92,231,0.35)]"
          : "border-primary/30 bg-surface-raised/60"
      } ${className}`}
    >
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>{icon}</span>
        <span className="font-display text-sm text-primary">{label}</span>
      </div>
      <div className="flex min-h-[48px] flex-wrap content-start justify-center gap-1.5">
        {children}
      </div>
    </div>
  );
}


const BODY_ZONE_POSITIONS: Record<string, { top: string; left: string }> = {
  head:       { top: "10%",  left: "52%" },
  chest:      { top: "38%",  left: "52%" },
  "left-arm": { top: "35%",  left: "8%" },
  "right-arm":{ top: "35%",  left: "95%" },
  "left-leg": { top: "78%",  left: "35%" },
  "right-leg":{ top: "78%",  left: "68%" },
};

function BodyDropZone({
  id,
  isHighlighted,
  children,
}: {
  id: string;
  label: string;
  icon: string;
  isHighlighted: boolean;
  children: ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const active = isOver || isHighlighted;
  const hasContent = children && (children as React.ReactElement[])?.length > 0;
  const pos = BODY_ZONE_POSITIONS[id] ?? { top: "50%", left: "50%" };

  return (
    <div
      ref={setNodeRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: pos.top, left: pos.left }}
    >
      <div
        className={`flex min-h-[48px] min-w-[48px] flex-col items-center justify-center rounded-2xl border-[3px] border-dashed p-1.5 transition-all duration-200 ${
          active
            ? "border-primary bg-primary-light/40 shadow-[0_0_16px_rgba(108,92,231,0.4)] scale-110"
            : hasContent
              ? "border-success/40 bg-success/10"
              : "border-transparent bg-transparent"
        }`}
      >
        {hasContent ? (
          children
        ) : null}
      </div>
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
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
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

  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  }, []);

  const handleDragOver = useCallback((e: DragOverEvent) => {
    setOverTargetId(e.over ? String(e.over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      setActiveId(null);
      setOverTargetId(null);
      if (!over) return;
      const itemId = String(active.id);
      if (placements[itemId] !== undefined) return;
      const targetId = String(over.id);
      const expected = config.correctMapping[itemId];
      const limbTargets = ["left-arm", "right-arm", "left-leg", "right-leg"];
      const isCorrect =
        expected === targetId ||
        expected === "*" ||
        (expected === "*limbs" && limbTargets.includes(targetId));
      if (isCorrect) {
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
  const layout = config.layout;

  const poolSection = (() => {
    const remainder = layout === "side-by-side" ? poolItems.length % 3 : 0;
    const gridItems = remainder ? poolItems.slice(0, -remainder) : poolItems;
    const extraItems = remainder ? poolItems.slice(-remainder) : [];

    if (layout === "side-by-side") {
      return (
        <motion.div
          animate={shakePool ? { x: [0, -5, 5, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="mx-auto flex w-fit flex-col items-center gap-1.5"
        >
          {gridItems.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5">
              {gridItems.map((item) => (
                <AppStyleCard key={item.id} item={item} isDragging={activeId === item.id} />
              ))}
            </div>
          )}
          {extraItems.length > 0 && (
            <div className="flex justify-center gap-1.5">
              {extraItems.map((item) => (
                <AppStyleCard key={item.id} item={item} isDragging={activeId === item.id} />
              ))}
            </div>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        animate={shakePool ? { x: [0, -5, 5, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="flex flex-wrap justify-center gap-2"
      >
        {poolItems.map((item) => (
          <AppStyleCard key={item.id} item={item} isDragging={activeId === item.id} />
        ))}
      </motion.div>
    );
  })();

  const renderTargets = (className?: string) =>
    config.targets.map((target) => {
      const placedHere = config.items.filter((it) => placements[it.id] === target.id);
      return (
        <DropZone
          key={target.id}
          id={target.id}
          label={target.label}
          icon={target.icon}
          isHighlighted={overTargetId === target.id}
          className={className}
        >
          {placedHere.map((it) => (
            <PlacedChip key={it.id} item={it} />
          ))}
        </DropZone>
      );
    });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-6">
        <h2 className="text-center font-display text-xl leading-tight text-text sm:text-2xl">
          {config.prompt}
        </h2>

        {layout === "side-by-side" && (
          <div className="flex flex-1 flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-center sm:gap-3">
            <div className="relative flex w-72 shrink-0 flex-col items-center sm:w-80">
              <img
                src="/images/celly-character.png"
                alt="Celly"
                className="w-full drop-shadow-lg"
              />
              <div className="absolute inset-x-0 top-[13%] bottom-[16%] flex rotate-[4deg] flex-col items-stretch justify-center gap-1.5 px-16 pl-[3.25rem] sm:px-20 sm:pl-[4rem]">
                {config.targets.map((target) => {
                  const placedHere = config.items.filter((it) => placements[it.id] === target.id);
                  return (
                    <DropZone
                      key={target.id}
                      id={target.id}
                      label={target.label}
                      icon={target.icon}
                      isHighlighted={overTargetId === target.id}
                      className="min-h-0 flex-1 !p-1.5 !rounded-xl bg-surface-raised/85 backdrop-blur-sm"
                    >
                      {placedHere.map((it) => (
                        <PlacedChip key={it.id} item={it} />
                      ))}
                    </DropZone>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-center font-body text-xs font-semibold text-text-muted">
                Drag each one into Celly
              </p>
              {poolSection}
            </div>
          </div>
        )}

        {layout === "body-map" && (
          <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-start">
            <div className="relative mx-auto aspect-[1/1.4] w-60 shrink-0 sm:w-72">
              <img src="/images/body-outline.png" alt="Body outline" className="h-full w-full object-contain opacity-50" />
              {config.targets.map((target) => {
                const placedHere = config.items.filter((it) => placements[it.id] === target.id);
                return (
                  <BodyDropZone
                    key={target.id}
                    id={target.id}
                    label={target.label}
                    icon={target.icon}
                    isHighlighted={overTargetId === target.id}
                  >
                    {placedHere.length > 0
                      ? placedHere.map((it) => <PlacedChip key={it.id} item={it} />)
                      : <></>}
                  </BodyDropZone>
                );
              })}
            </div>
            <div className="mt-2 lg:mt-0 lg:flex-1">
              <p className="mb-2 text-center font-body text-xs font-semibold text-text-muted">
                Drag each part
              </p>
              {poolSection}
            </div>
          </div>
        )}

        {!layout && (
          <>
            <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
              {renderTargets()}
            </div>
            <div className="mt-auto">
              <p className="mb-3 text-center font-body text-sm font-semibold text-text-muted">
                Drag each one to a zone
              </p>
              {poolSection}
            </div>
          </>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeItem ? <OverlayCard item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
