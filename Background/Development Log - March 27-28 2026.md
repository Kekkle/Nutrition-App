# Development Log: March 27–28, 2026

## What was done

### Module 1 completion — all 6 sections built out
- **Sort the Apps** — refined with custom image assets (Celly character, body outline), polished drag-and-drop game layout with beveled app-style buttons, Celly phone as the drop target with tilted "Essential" and "Fun" zones.
- **Charge the Phone** — added charger character illustrations, gray/charged Celly states, and built a snake game where the plug navigates to a phone. Later updated with collectible lightning bolts (collect 3 before reaching the phone), slower speed, and 2-block starting length.
- **The Body's Apps** — body systems as "apps" with body-outline and stomach PNG assets, drag-and-drop body-map game with zone-based placement (brain → head, heart/lungs/stomach → chest, bones/muscles/skin → limbs).
- **Charge the Body** (renamed from "Fill the Battery") — three-battery illustration (food/sleep/hydration), built a snake-collect game where the snake grows from good items, shrinks from bad items, and speeds up over time.
- **Big Stuff!** (renamed from "Mystery Boxes") — interactive mystery box reveal with three colored boxes (carbs/protein/fats) that flip on tap. Macronutrients sentence appears after all boxes are revealed. Drag-and-drop food sorting game with 25 scattered food items into mystery boxes.
- **Catch the Food** — new catcher game prototype where foods fall from the top and the player moves a box left/right to catch items matching a selected food group.

### Learning path redesign
- Replaced the Duolingo-style circular nodes with a winding SVG road.
- Added location marker pins (colored circles with directional pointers) at each checkpoint.
- Pin tips point at the road center line, with circles extending outward.
- Titles positioned directly below each checkpoint.
- Celly character graphic expanding out of the module header bar, replacing the phone emoji.

### Game mechanics added
- **Snake game** — grid-based navigation with obstacle avoidance, wall/self collision, D-pad for mobile, swipe support, and collectible items gating the target.
- **Snake-collect game** — item spawning, dynamic speed, grow/shrink mechanics, obstacle barriers.
- **Catcher game** — category selection screen, falling items with increasing spawn rate, pointer-based box movement, catch/miss feedback animations.

### UI/UX changes
- Back button moved to bottom footer on all game screens (matching lesson slide layout).
- Exit arrow kept in top-left corner for returning to the learning path.
- Lesson panel text repositioned closer to the graphic/illustration section.
- Text labels removed from under all icons and images.
- Slide redundancy eliminated — merged overlapping panels throughout.

### Documentation and planning
- Competitive analysis researched and written (7 competitors analyzed, market gaps identified).
- AGENTS.md updated with new rules: no redundant slides, no text under icons, game screen layout conventions.
- App Plan.md updated with two new game engine types (snake, catcher).

---

## What I learned

- **Component-driven game development** — each game type (drag-drop, snake, catcher) is a reusable React component configured by data objects, not hardcoded. Changing game content means editing a config file, not rewriting components.
- **SVG path generation** — the learning path road is built by computing bezier curves between node positions and rendering them as SVG paths with layered strokes for the road surface and center line.
- **Drag-and-drop with @dnd-kit** — built multiple layout variants (side-by-side, body-map, mystery-boxes) using the same DndContext and sensor setup, just swapping how drop zones and draggable items are rendered.
- **CSS filter techniques** — used grayscale → sepia → hue-rotate pipelines to recolor a single mystery-box PNG into three distinct colored versions without needing separate image files.
- **Game loop patterns in React** — used requestAnimationFrame (catcher) and setInterval (snake) with refs to manage mutable game state that doesn't trigger unnecessary re-renders.
- **Image asset extraction** — used ImageMagick CLI for cropping, background removal, and transparency on character images extracted from design files.
- **Iterative UI refinement** — learned how much difference small adjustments make: gap spacing, rotation angles, element positioning, icon sizing. Most visual polish came from repeated micro-adjustments, not big rewrites.
