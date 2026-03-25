# NutriPhone -- Gamified Nutrition Learning App

## Tech Stack

- **Framework**: React 18+ with TypeScript, built with Vite + `vite-plugin-pwa`
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (UI/page transitions), Lottie React (complex explainers)
- **Drag and drop**: `@dnd-kit/core`
- **State**: Zustand for global state, IndexedDB via `idb-keyval` for persistence
- **Routing**: React Router v6
- **Fonts**: Lilita One (headings, sentence case) + Quicksand (body text) from Google Fonts

No backend. No user accounts. All progress stored locally on the device.

---

## User Flow

1. **First launch**: User enters a name and builds a cartoon avatar (non-human) (body shape, skin tone, hair, outfit)
2. **Learning path**: A vertical scrolling trail with nodes (like Duolingo). Each node = one lesson + game pair. Completed nodes light up, current node pulses, future nodes are locked
3. **Lesson**: A short animated sequence (30-60s) built from animated SVG panels with Framer Motion. User taps to advance. Minimal text (1-2 sentences per panel, Quicksand font)
4. **Game**: Immediately after the lesson, a quick interactive activity (10-30s) reinforcing the concept
5. **Score/reward**: 1-3 stars based on accuracy, a fun fact, and the next node unlocks

---

## MVP Content (18 Lesson-Game Nodes)

Content mapped from [Slide ideas.md](Background/Slide%20ideas.md) and [Rough Draft.md](Background/Rough%20Draft.md).

### Module 1: Your Body is Like a Phone (5 nodes)

- **1.1** -- Lesson: Phones are full of apps (essential vs fun). Game: "Sort the Apps" drag-and-drop into Essential/Fun buckets
- **1.2** -- Lesson: Phones need energy (battery). Game: "Charge the Phone" tap correct power source
- **1.3** -- Lesson: Your body = a phone, body systems = apps. Game: "Build the Body" drag organs onto a body outline
- **1.4** -- Lesson: Body energy sources (food, sleep, water). Game: "Fill the Battery" drag items into a battery bar
- **1.5** -- Lesson: Focus on food, three categories exist. Game: "Mystery Boxes" tap to guess how many food categories

### Module 2: Carbohydrates (5 nodes)

- **2.1** -- Lesson: Meet carbs, carb-rich foods. Game: "Spot the Carb" tap foods that are mostly carbs
- **2.2** -- Lesson: Carb digestion. Carbs breakdown into glucose molecule. Glucose is the energy for the cell.
- **2.3** -- Lesson: How carbs become energy. Insulin is the key. When glucose is in the blood, this signals to the pancreas to secrete the hormone insulin. Insulin opens a portal, allowing glucose in. Cells can use glucose to create energy so they can perform their functions. Game: "Unlock the Cell" drag insulin key to open cell, glucose flows in
- **2.4** -- Lesson: Fast carbs vs slow carbs. Game: "Speed Sort" sort foods into fast vs slow energy lanes
- **2.5** -- Lesson: Extra glucose gets stored (glycogen, then fat cells). Game: "Pack the Storage" fill glycogen shelves, overflow goes to vault

### Module 3: Fats (4 nodes)

- **3.1** -- Lesson: Meet fats, fat-rich foods. Game: "Find the Fat" tap foods that are mostly fat
- **3.2** -- Lesson: Why we need fats (cells, hormones, brain, skin). Game: "Build the Cell" drag fat molecules to form a cell membrane
- **3.3** -- Lesson: Fat digestion (bile, enzymes, absorption). Game: "Digestion Journey" put digestion steps in correct order
- **3.4** -- Lesson: Essential fats and where to find them. Game: "Brain Boost" drag essential-fat foods to light up a brain

### Module 4: Protein (4 nodes)

- **4.1** -- Lesson: Meet protein, protein-rich foods. Game: "Protein Hunt" tap foods that are mostly protein
- **4.2** -- Lesson: Protein = building blocks (muscles, organs, immune system). Game: "Build and Repair" use amino acid blocks to repair muscle / build antibodies
- **4.3** -- Lesson: Protein digestion. Protein is broken down into amino acids (first amino acid chains).
- **4.4** -- Lesson: Protein is not stored, body uses it right away. Game: "Use It or Lose It" assign protein to body jobs before time runs out

### Module 5: The Team (3 nodes)

- **5.1** -- Lesson: Macronutrients work as a team. Game: "Team Power" assemble all three macros to power up the body-phone
- **5.2** -- Lesson: Most foods are a mix, named by dominant macro. Examine the molecules (glucose, amino acids, and lipids). Game: Add the molecules (glucose, lipids, amino acids) to the right food. Example, an apple, and drag and drop glucose molecules to hit target bar. A steak, drag and drop amino acids and lipid molecules to correct target lines.
- **5.3** -- Game: "Feed Your Avatar" drag foods to your avatar to hit macro target bars

---

## Avatar System

- Full-body cartoon character creator shown during onboarding. Avatar will be more like a blob or alien-like character, or different types of cells, etc, rather than a human form.
- Options: form shape (3-4), skin tone (spectrum slider), hair/head style + color, eyes, outfit/shirt color
- Visual style: rounded, thick-outlined, comic-book look
- Avatar appears on the learning path, in the "Feed Your Avatar" game, on the profile screen, and in celebration animations
- Stored as a JSON object in IndexedDB

---

## Progression and Rewards

- **Stars**: 1-3 per game based on accuracy
- **XP bar**: Accumulates across nodes, levels up the avatar (unlocks cosmetic items)
- **Module badges**: Completing all nodes in a module earns a themed badge ("Carb Champion", "Fat Explorer", "Protein Builder")
- **Fun facts**: One appears after each game as a reward
- **No penalties**: Wrong answers get encouragement + hints, never shame. Aligned with weight-neutral, food-neutral values from [Rough Draft.md Section 3](Background/Rough%20Draft.md)

---

## Animated Lesson Approach

Instead of producing actual videos, each lesson is a sequence of **animated panels** (like a comic strip that animates in):

- 6-8 panels per lesson, elements fade/slide/scale using Framer Motion
- Key illustrations are SVGs (from [Storyset](https://storyset.com), [unDraw](https://undraw.co), or custom)
- User taps or swipes to advance (auto-play option available)
- Short text blurbs (1-2 sentences) appear beneath animations in Quicksand font
- Complex sequences (glucose entering a cell, digestion) use Lottie files from LottieFiles marketplace or tools like Rive / Jitter

---

## Game Engine Types

Four reusable game components that render different content based on data config:

- **Multiple Choice / Tap**: Tap the correct answer from options (used in Charge the Phone, Mystery Boxes, Spot the Carb, Find the Fat, Protein Hunt)
- **Drag and Drop**: Drag items into target zones (used in Sort the Apps, Fill the Battery, Unlock the Cell, Build the Cell, Brain Boost, Feed Your Avatar)
- **Sort / Categorize**: Drag items into two or more labeled lanes (used in Speed Sort, Team Power)
- **Sequence / Order**: Arrange steps in the correct order (used in Digestion Journey, Build and Repair, Use It or Lose It, Pack the Storage)

---

## Sensitive Content Guidelines

Built into all content and game feedback per [Rough Draft.md Section 3](Background/Rough%20Draft.md) and [Mission.md](Mission.md):

- No "good" vs "bad" food language -- use "more supportive" vs "less supportive"
- No calorie references -- say "energy" or "nourishment"
- No weight-focused messaging -- never mention weight loss, body size, or shape as goals
- No penalties in games -- wrong answers get encouragement and hints
- Food neutrality in all game feedback

---

## Visual Design

- **Colors**: Bright, saturated on light backgrounds. Accent colors per macro: gold/orange (carbs), green (fats), blue/purple (protein)
- **UI**: Rounded corners, thick outlines on buttons/cards, bouncy tap animations
- **Typography**: Lilita One headings (sentence case, except app title), Quicksand body. 16px+ body, 24px+ headings
- **Illustrations**: Thick-outline SVG, consistent proportions, diverse representation

---

## Project Structure

```
nutrition-app/
  public/
    manifest.json
    icons/
    lottie/
    images/
  src/
    main.tsx
    App.tsx
    index.css
    components/
      layout/          -- AppShell, NavBar, ProgressBar
      avatar/          -- AvatarCreator, AvatarDisplay
      lesson/          -- LessonPlayer, AnimatedPanel, TextBlurb
      game/            -- GameShell, DragDrop, MultipleChoice, SortGame, SequenceGame
      map/             -- LearningPath, PathNode
      ui/              -- Button, Card, StarRating, Badge, Modal
    content/
      modules.ts       -- Module/lesson/game definitions (data-driven)
      lessons/         -- Per-lesson animation configs + text
      games/           -- Per-game configs (items, answers, feedback)
    stores/
      progressStore.ts -- Zustand: user progress, stars, XP
      avatarStore.ts   -- Zustand: avatar configuration
    hooks/
    utils/
      storage.ts       -- IndexedDB helpers
    types/
      index.ts         -- TypeScript interfaces
```

---

## Build Phases

### Phase 1: Scaffolding + Module 1

- Project setup (Vite + React + TS + Tailwind + PWA config + fonts)
- App shell with routing and layout
- Avatar creator (basic version)
- Learning path map component (vertical scroll, linear nodes)
- Lesson player (animated panel sequence with Framer Motion)
- Multiple-choice and drag-and-drop game components
- Progress store + IndexedDB persistence
- Module 1 content: "Your Body is Like a Phone" (5 lesson-game nodes)

### Phase 2: Remaining MVP Content

- Modules 2-5 content (Carbs, Fats, Protein, The Team)
- Sort game and sequence game components
- Star rating + XP system
- Module completion badges
- Fun facts after games

### Phase 3: Polish and Expansion

- Lottie animations for complex sequences
- Sound effects and optional background music
- Onboarding tutorial walkthrough
- More avatar customization
- Future modules: Cells, Body Systems, Ultra-Processed Foods, Media Literacy, Energy (under/over nourishment)

---

## Open Questions (Not Blocking MVP)

- **App name**: "NutriPhone" is a working title. Do you have a preferred name?
- **Voiceover**: Text-only for MVP, or do you want narration on lessons?
- **Offline support**: Full offline capability from day one, or online-only for MVP?
