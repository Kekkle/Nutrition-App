import type { Module } from "../types";

export const MODULES: Module[] = [
  {
    id: "module-1",
    title: "Your Body is Like a Phone",
    icon: "📱",
    color: "#6C5CE7",
    nodes: [
      {
        id: "m1-n1",
        title: "Sort the apps",
        panels: [
          {
            id: "m1-n1-p1",
            text: "Phones are full of apps. You tap them to call people, take photos, play games, and more.",
            illustration: "phone-with-colorful-app-icons",
          },
          {
            id: "m1-n1-p2",
            text: "Some apps feel essential. Phone, Camera, and Messages help you stay connected and safe.",
            illustration: "phone-screen-essential-apps-row",
          },
          {
            id: "m1-n1-p3",
            text: "Other apps are mostly for fun — like games, photo filters, or short videos.",
            illustration: "phone-screen-fun-apps-row",
          },
          {
            id: "m1-n1-p4",
            text: "Many apps can run at once. Some stay open quietly in the background.",
            illustration: "phone-multitasking-many-app-windows",
          },
          {
            id: "m1-n1-p5",
            text: "Your body is similar. It runs lots of jobs at the same time — not on a screen, but inside you.",
            illustration: "split-phone-and-silhouette-body-transition",
          },
          {
            id: "m1-n1-p6",
            text: "Let's practice! Sort these phone apps into essential ones and fun ones.",
            illustration: "two-buckets-essential-vs-fun-labels",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Drag each app into Essential or Fun.",
          items: [
            { id: "phone", label: "Phone", icon: "📞" },
            { id: "camera", label: "Camera", icon: "📷" },
            { id: "instagram", label: "Instagram", icon: "📸" },
            { id: "games", label: "Games", icon: "🎮" },
            { id: "messages", label: "Messages", icon: "💬" },
            { id: "tiktok", label: "TikTok", icon: "🎵" },
          ],
          targets: [
            { id: "essential", label: "Essential", icon: "⭐" },
            { id: "fun", label: "Fun", icon: "🎉" },
          ],
          correctMapping: {
            phone: "essential",
            camera: "essential",
            messages: "essential",
            instagram: "fun",
            games: "fun",
            tiktok: "fun",
          },
        },
        funFact:
          "Your phone typically runs about 30 apps. Your body runs way more systems than that — all at the same time!",
      },
      {
        id: "m1-n2",
        title: "Charge the phone",
        panels: [
          {
            id: "m1-n2-p1",
            text: "All those apps need energy. Without power, nothing on the phone can wake up.",
            illustration: "phone-battery-icon-almost-empty",
          },
          {
            id: "m1-n2-p2",
            text: "If the battery is totally dead, the screen stays black. Taps do nothing.",
            illustration: "dark-phone-screen-power-off",
          },
          {
            id: "m1-n2-p3",
            text: "So we plug the phone in and let it charge. That refills the battery.",
            illustration: "charging-cable-plugged-into-phone",
          },
          {
            id: "m1-n2-p4",
            text: "Electricity is what flows in. It is the phone's power source.",
            illustration: "lightning-bolts-flowing-into-battery-bar",
          },
          {
            id: "m1-n2-p5",
            text: "When the battery is full enough, every app can work again.",
            illustration: "phone-screen-bright-apps-active",
          },
          {
            id: "m1-n2-p6",
            text: "Quick check: what actually powers a phone?",
            illustration: "thinking-kid-question-mark-phone",
          },
        ],
        game: {
          type: "multiple-choice",
          prompt: "What powers a phone?",
          items: [
            { id: "electricity", label: "Electricity", icon: "⚡" },
            { id: "food", label: "Food", icon: "🍎" },
            { id: "sleep", label: "Sleep", icon: "😴" },
            { id: "water", label: "Water", icon: "💧" },
          ],
          correctId: "electricity",
        },
        funFact:
          "A fully charged phone battery can last about 10-12 hours. Your body needs to recharge with food, water, and sleep every single day!",
      },
      {
        id: "m1-n3",
        title: "Build the body",
        panels: [
          {
            id: "m1-n3-p1",
            text: "Now picture your body like one big phone. Each major part has a big job.",
            illustration: "cartoon-body-outline-next-to-phone-character",
          },
          {
            id: "m1-n3-p2",
            text: "Your brain is like a control center. It helps you think, feel, and decide.",
            illustration: "body-outline-brain-glow-head",
          },
          {
            id: "m1-n3-p3",
            text: "Your heart pumps blood like a steady drumbeat. It never takes a day off.",
            illustration: "body-outline-heart-glow-chest-left",
          },
          {
            id: "m1-n3-p4",
            text: "Your lungs pull in air and swap fresh oxygen for used-up air you breathe out.",
            illustration: "body-outline-lungs-glow-chest",
          },
          {
            id: "m1-n3-p5",
            text: "Muscles help you move. Your digestive system breaks down food so your body can use it.",
            illustration: "body-outline-muscles-arms-and-stomach-belly",
          },
          {
            id: "m1-n3-p6",
            text: "Brain, heart, lungs, muscles, digestion — all running together, right now.",
            illustration: "body-outline-with-organs-all-lit-up",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Drag each part to the right spot on the body.",
          items: [
            { id: "brain", label: "Brain", icon: "🧠" },
            { id: "heart", label: "Heart", icon: "❤️" },
            { id: "lungs", label: "Lungs", icon: "🫁" },
            { id: "muscles", label: "Muscles", icon: "💪" },
            { id: "stomach", label: "Stomach", icon: "🍲" },
          ],
          targets: [
            { id: "head", label: "Head", icon: "👤" },
            { id: "chest-left", label: "Chest (left)", icon: "🫀" },
            { id: "chest-right", label: "Chest (right)", icon: "🫁" },
            { id: "arms", label: "Arms", icon: "🦾" },
            { id: "belly", label: "Belly", icon: "⭕" },
          ],
          correctMapping: {
            brain: "head",
            heart: "chest-left",
            lungs: "chest-right",
            muscles: "arms",
            stomach: "belly",
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
            text: "If your body is like a phone, it still needs fuel. It cannot run on electricity from the wall.",
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
          {
            id: "m1-n4-p5",
            text: "Food, water, and sleep together refill your inner battery — day after day.",
            illustration: "body-battery-icon-filling-from-three-sources",
          },
          {
            id: "m1-n4-p6",
            text: "Drag each picture into the bucket that matches. Does it power your body, or not?",
            illustration: "two-labeled-buckets-powers-vs-does-not",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Sort what powers your body from what does not.",
          items: [
            { id: "apple", label: "Apple", icon: "🍎" },
            { id: "water-bottle", label: "Water bottle", icon: "🧴" },
            { id: "pillow", label: "Pillow", icon: "🛏️" },
            { id: "battery", label: "Battery", icon: "🔋" },
            { id: "lightning-bolt", label: "Lightning bolt", icon: "⚡" },
            { id: "wifi-signal", label: "Wi‑Fi signal", icon: "📶" },
          ],
          targets: [
            { id: "powers-your-body", label: "Powers your body", icon: "✅" },
            { id: "does-not-power", label: "Does not power your body", icon: "⛔" },
          ],
          correctMapping: {
            apple: "powers-your-body",
            "water-bottle": "powers-your-body",
            pillow: "powers-your-body",
            battery: "does-not-power",
            "lightning-bolt": "does-not-power",
            "wifi-signal": "does-not-power",
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
            text: "Food is your body's main fuel. You need it to play, learn, and heal.",
            illustration: "kid-eating-balanced-meal-smiling",
          },
          {
            id: "m1-n5-p2",
            text: "But not every food is built the same way. An apple, bread, and yogurt all do different jobs.",
            illustration: "three-different-foods-side-by-side",
          },
          {
            id: "m1-n5-p3",
            text: "Scientists group foods by the big nutrients inside them. Those groups help us talk about how food supports you.",
            illustration: "magnifying-glass-over-plate-zoom-to-molecules",
          },
          {
            id: "m1-n5-p4",
            text: "There are three main types your body needs in large amounts. Three big buckets — not two, not ten.",
            illustration: "three-mystery-boxes-labeled-question-marks",
          },
          {
            id: "m1-n5-p5",
            text: "Soon you will open those boxes and meet carbs, protein, and fats. For now, just count the groups.",
            illustration: "purple-mascot-waving-next-to-closed-boxes",
          },
          {
            id: "m1-n5-p6",
            text: "So — how many main energy groups does food come in?",
            illustration: "quiz-panel-number-options-preview",
          },
        ],
        game: {
          type: "multiple-choice",
          prompt: "Food comes in how many main energy groups?",
          items: [
            { id: "two", label: "2", icon: "2️⃣" },
            { id: "three", label: "3", icon: "3️⃣" },
            { id: "five", label: "5", icon: "5️⃣" },
            { id: "ten", label: "10", icon: "🔟" },
          ],
          correctId: "three",
        },
        funFact:
          "The three groups are called macronutrients: carbohydrates, proteins, and fats. 'Macro' means big — because your body needs these in large amounts!",
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
