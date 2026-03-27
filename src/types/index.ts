export type GameType = "multiple-choice" | "drag-drop" | "sort" | "sequence" | "snake";

export type NodeStatus = "locked" | "current" | "completed";

export interface LessonPanel {
  id: string;
  text: string;
  illustration: string;
}

export interface GameItem {
  id: string;
  label: string;
  icon: string;
}

export interface MultipleChoiceConfig {
  type: "multiple-choice";
  prompt: string;
  items: GameItem[];
  correctId: string;
}

export interface DragDropConfig {
  type: "drag-drop";
  prompt: string;
  items: GameItem[];
  targets: { id: string; label: string; icon: string }[];
  /** Maps each item id to its correct target id */
  correctMapping: Record<string, string>;
  /** Visual layout variant for the drag-drop game */
  layout?: "side-by-side" | "body-map" | "mystery-boxes";
}

export interface SortConfig {
  type: "sort";
  prompt: string;
  items: GameItem[];
  lanes: { id: string; label: string }[];
  correctMapping: Record<string, string>;
}

export interface SequenceConfig {
  type: "sequence";
  prompt: string;
  items: GameItem[];
  correctOrder: string[];
}

export interface SnakeConfig {
  type: "snake";
  prompt: string;
  gridWidth: number;
  gridHeight: number;
  plugStart: { x: number; y: number };
  socketPos: { x: number; y: number };
  obstacles: { x: number; y: number; w: number; h: number }[];
}

export interface SnakeCollectConfig {
  type: "snake-collect";
  prompt: string;
  gridWidth: number;
  gridHeight: number;
  startPos: { x: number; y: number };
  goodItems: string[];
  badItems: string[];
  totalSpawns: number;
  obstacles?: { x: number; y: number; w: number; h: number }[];
}

export interface CatcherCategory {
  id: string;
  label: string;
  icon: string;
  items: string[];
}

export interface CatcherConfig {
  type: "catcher";
  prompt: string;
  categories: CatcherCategory[];
  /** How many foods to drop in total per round */
  totalDrops: number;
  /** Starting fall speed in ms per frame tick */
  baseFallSpeed?: number;
}

export type GameConfig =
  | MultipleChoiceConfig
  | DragDropConfig
  | SortConfig
  | SequenceConfig
  | SnakeConfig
  | SnakeCollectConfig
  | CatcherConfig;

export interface LessonNode {
  id: string;
  title: string;
  panels: LessonPanel[];
  game: GameConfig;
  funFact: string;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  nodes: LessonNode[];
}

export interface AvatarConfig {
  name: string;
  shape: number;
  color: string;
  eyeStyle: number;
  accessory: number;
}

export interface NodeProgress {
  stars: number;
  completed: boolean;
}

export interface UserProgress {
  currentModuleId: string;
  currentNodeIndex: number;
  xp: number;
  nodes: Record<string, NodeProgress>;
  completedModules: string[];
}
