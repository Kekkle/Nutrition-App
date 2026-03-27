import type { Module } from "../types";

export const MODULES: Module[] = [
  {
    id: "module-1",
    title: "Meet Celly",
    icon: "📱",
    color: "#6C5CE7",
    nodes: [
      {
        id: "m1-n1",
        title: "Sort the apps",
        panels: [
          {
            id: "m1-n1-p1",
            text: "Celly is a phone full of apps.",
            illustration: "phone-with-colorful-app-icons",
          },
          {
            id: "m1-n1-p2",
            text: "Some apps feel essential. Phone, Camera, and Messages help you stay connected and safe.",
            illustration: "phone-screen-essential-apps-row",
          },
          {
            id: "m1-n1-p3",
            text: "Other apps are mostly for fun — like games, photo filters, or short videos. Many apps can run at once, while some stay open quietly in the background.",
            illustration: "phone-screen-fun-apps-row",
          },
          {
            id: "m1-n1-p4",
            text: "Your body is kinda similar. It runs lots of jobs at the same time — not on a screen, but inside you.",
            illustration: "split-phone-and-silhouette-body-transition",
          },
        ],
        game: {
          type: "drag-drop",
          layout: "side-by-side",
          prompt: "Sort the apps",
          items: [
            { id: "phone", label: "Phone", icon: "📞" },
            { id: "games", label: "Games", icon: "🎮" },
            { id: "camera", label: "Camera", icon: "📷" },
            { id: "music", label: "Music", icon: "🎵" },
            { id: "clock", label: "Clock", icon: "🕐" },
            { id: "messages", label: "Messages", icon: "💬" },
            { id: "maps", label: "Maps", icon: "🗺️" },
            { id: "shopping", label: "Shopping", icon: "🛍️" },
            { id: "calendar", label: "Calendar", icon: "📅" },
            { id: "youtube", label: "YouTube", icon: "▶️" },
          ],
          targets: [
            { id: "essential", label: "Essential", icon: "⭐" },
            { id: "fun", label: "Fun", icon: "🎉" },
          ],
          correctMapping: {
            phone: "essential",
            camera: "essential",
            messages: "essential",
            clock: "essential",
            maps: "essential",
            calendar: "essential",
            music: "fun",
            games: "fun",
            shopping: "fun",
            youtube: "fun",
          },
        },
        funFact:
          "A phone typically runs about 30 apps, but your body runs way more systems than that — all at the same time!",
      },
      {
        id: "m1-n2",
        title: "Charge the phone",
        panels: [
          {
            id: "m1-n2-p1",
            text: "All those apps need energy. Without power, the phone screen stays black.",
            illustration: "celly-gray-uncharged",
          },
          {
            id: "m1-n2-p2",
            text: "Plugging in the phone and letting it charge refills the battery.\nElectricity is the phone's power source.",
            illustration: "celly-with-charger",
          },
          {
            id: "m1-n2-p3",
            text: "When the battery is full enough, every app can work again.",
            illustration: "celly-fully-charged",
          },
        ],
        game: {
          type: "snake",
          prompt: "Charge the phone!",
          gridWidth: 15,
          gridHeight: 12,
          plugStart: { x: 1, y: 10 },
          socketPos: { x: 13, y: 1 },
          obstacles: [
            { x: 4, y: 2, w: 1, h: 6 },
            { x: 8, y: 4, w: 1, h: 7 },
            { x: 11, y: 1, w: 1, h: 5 },
          ],
        },
        funFact:
          "A fully charged phone battery can last about 10-12 hours.",
      },
      {
        id: "m1-n3",
        title: "Build the body",
        panels: [
          {
            id: "m1-n3-p1",
            text: "Your body has many \"apps\" running all the time!",
            illustration: "body-apps-overview",
          },
          {
            id: "m1-n3-p2",
            text: "Your brain is like a control center. It helps you think, feel, and decide.",
            illustration: "brain-icon-large",
          },
          {
            id: "m1-n3-p3",
            text: "Your heart pumps blood like a steady drumbeat. It never takes a day off.",
            illustration: "heart-icon-large",
          },
          {
            id: "m1-n3-p4",
            text: "Your lungs pull in air and swap fresh oxygen for used-up air you breathe out.",
            illustration: "lungs-icon-large",
          },
          {
            id: "m1-n3-p5",
            text: "Your digestive system breaks down and absorbs food.",
            illustration: "digestive-tract-icon",
          },
          {
            id: "m1-n3-p6",
            text: "Muscles help you move your body.",
            illustration: "muscles-icon-large",
          },
          {
            id: "m1-n3-p7",
            text: "Bones grow and provide structure for your body.",
            illustration: "bones-icon-large",
          },
          {
            id: "m1-n3-p8",
            text: "Skin helps regulate your body temperature and protects you.",
            illustration: "skin-icon-large",
          },
          {
            id: "m1-n3-p9",
            text: "Brain, heart, lungs, bones, muscles, digestion, skin and more — all functioning together, right now.",
            illustration: "all-systems-running",
          },
        ],
        game: {
          type: "drag-drop",
          layout: "body-map",
          prompt: "Drag each part to the right spot on the body.",
          items: [
            { id: "brain", label: "Brain", icon: "🧠" },
            { id: "heart", label: "Heart", icon: "❤️" },
            { id: "lungs", label: "Lungs", icon: "🫁" },
            { id: "muscles", label: "Muscles", icon: "💪" },
            { id: "stomach", label: "Stomach", icon: "🍲" },
            { id: "bones", label: "Bones", icon: "🦴" },
            { id: "skin", label: "Skin", icon: "🛡️" },
          ],
          targets: [
            { id: "head", label: "Head", icon: "👤" },
            { id: "chest-left", label: "Chest (left)", icon: "🫀" },
            { id: "chest-right", label: "Chest (right)", icon: "🫁" },
            { id: "arms", label: "Arms", icon: "🦾" },
            { id: "belly", label: "Belly", icon: "⭕" },
            { id: "legs", label: "Legs", icon: "🦵" },
            { id: "outer", label: "Outer body", icon: "✋" },
          ],
          correctMapping: {
            brain: "head",
            heart: "chest-left",
            lungs: "chest-right",
            muscles: "arms",
            stomach: "belly",
            bones: "legs",
            skin: "outer",
          },
        },
        funFact:
          "Your brain uses about 20% of all the energy your body makes — even though it's only about 2% of your body weight!",
      },
      {
        id: "m1-n4",
        title: "Fill the battery",
        panels: [
          {
            id: "m1-n4-p1",
            text: "Your body also needs to recharge with food, water, and sleep every single day!",
            illustration: "body-outline-with-battery-meter-empty",
          },
          {
            id: "m1-n4-p2",
            text: "Food is your main everyday energy source. It helps you think, move, and grow.",
            illustration: "plate-of-supportive-foods-energy-rays",
          },
          {
            id: "m1-n4-p3",
            text: "Water does not give energy like food, but it keeps blood and nutrients moving smoothly.",
            illustration: "water-glass-body-hydration-flow-arrows",
          },
          {
            id: "m1-n4-p4",
            text: "Sleep is recovery time. Your body repairs, sorts memories, and gets ready for tomorrow.",
            illustration: "moon-pillow-kid-sleeping-cozy",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Sort what powers your body from what does not.",
          items: [
            { id: "apple", label: "Apple", icon: "🍎" },
            { id: "cookie", label: "Cookie", icon: "🍪" },
            { id: "water", label: "Water", icon: "💧" },
            { id: "bed", label: "Bed", icon: "🛏️" },
            { id: "tea", label: "Tea", icon: "🍵" },
            { id: "popcorn", label: "Popcorn", icon: "🍿" },
            { id: "watermelon", label: "Watermelon", icon: "🍉" },
            { id: "battery", label: "Battery", icon: "🔋" },
            { id: "lightning-bolt", label: "Lightning bolt", icon: "⚡" },
            { id: "wifi-signal", label: "Wi‑Fi signal", icon: "📶" },
            { id: "plug", label: "Plug", icon: "🔌" },
          ],
          targets: [
            { id: "powers-your-body", label: "Powers your body", icon: "✅" },
            {
              id: "does-not-power",
              label: "Does not power your body",
              icon: "⛔",
            },
          ],
          correctMapping: {
            apple: "powers-your-body",
            cookie: "powers-your-body",
            water: "powers-your-body",
            bed: "powers-your-body",
            tea: "powers-your-body",
            popcorn: "powers-your-body",
            watermelon: "powers-your-body",
            battery: "does-not-power",
            "lightning-bolt": "does-not-power",
            "wifi-signal": "does-not-power",
            plug: "does-not-power",
          },
        },
        funFact:
          "Sleep is when your body does most of its repair work. Your muscles grow, your brain organizes memories, and your immune system recharges — all while you snooze!",
      },
      {
        id: "m1-n5",
        title: "Mystery boxes",
        panels: [
          {
            id: "m1-n5-p1",
            text: "Food is your body's main fuel. You need it to move, learn, and heal.",
            illustration: "food-main-fuel",
          },
          {
            id: "m1-n5-p2",
            text: "There are three main food groups that your body needs in large amounts.",
            illustration: "mystery-boxes-clickable",
          },
          {
            id: "m1-n5-p3",
            text: "The three groups are called macronutrients: carbohydrates, proteins, and fats.",
            illustration: "macros-coming-up-next",
          },
        ],
        game: {
          type: "multiple-choice",
          prompt: "How many main energy groups does food come in?",
          items: [
            { id: "two", label: "2", icon: "2️⃣" },
            { id: "three", label: "3", icon: "3️⃣" },
            { id: "five", label: "5", icon: "5️⃣" },
            { id: "ten", label: "10", icon: "🔟" },
          ],
          correctId: "three",
        },
        funFact:
          "\"Macro\" means big — because your body needs these in large amounts!",
      },
    ],
  },
  {
    id: "module-2",
    title: "The Team",
    icon: "🤝",
    color: "#F59E0B",
    nodes: [],
  },
  {
    id: "module-3",
    title: "Cells",
    icon: "🔬",
    color: "#00CEC9",
    nodes: [],
  },
  {
    id: "module-4",
    title: "Carbohydrates",
    icon: "🍞",
    color: "#F59E0B",
    nodes: [],
  },
  {
    id: "module-5",
    title: "Fats",
    icon: "🥑",
    color: "#10B981",
    nodes: [],
  },
  {
    id: "module-6",
    title: "Protein",
    icon: "🍗",
    color: "#8B5CF6",
    nodes: [],
  },
];
