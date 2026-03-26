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
            illustration: "celly-phone-with-apps",
          },
          {
            id: "m1-n1-p2",
            text: "Some apps feel essential. Phone, Camera, and Messages help you stay connected and safe.",
            illustration: "essential-apps-grid",
          },
          {
            id: "m1-n1-p3",
            text: "Other apps are mostly for fun — like games, photo filters, or short videos.",
            illustration: "fun-apps-grid",
          },
          {
            id: "m1-n1-p4",
            text: "Many apps can run at once, while some stay open quietly in the background.",
            illustration: "apps-running-background",
          },
          {
            id: "m1-n1-p5",
            text: "Your body is kinda similar. It runs lots of jobs at the same time — not on a screen, but inside you.",
            illustration: "body-like-phone-transition",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Drag each app into Essential or Fun.",
          items: [
            { id: "phone", label: "Phone", icon: "phone" },
            { id: "camera", label: "Camera", icon: "camera" },
            { id: "messages", label: "Messages", icon: "messages" },
            { id: "clock", label: "Clock", icon: "clock" },
            { id: "maps", label: "Maps", icon: "maps" },
            { id: "calendar", label: "Calendar", icon: "calendar" },
            { id: "instagram", label: "Instagram", icon: "instagram" },
            { id: "music", label: "Music", icon: "music" },
            { id: "games", label: "Games", icon: "games" },
            { id: "shopping", label: "Shopping", icon: "shopping" },
            { id: "youtube", label: "YouTube", icon: "youtube" },
          ],
          targets: [
            { id: "essential", label: "Essential", icon: "essential" },
            { id: "fun", label: "Fun", icon: "fun" },
          ],
          correctMapping: {
            phone: "essential",
            camera: "essential",
            messages: "essential",
            clock: "essential",
            maps: "essential",
            calendar: "essential",
            instagram: "fun",
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
            illustration: "phone-battery-empty",
          },
          {
            id: "m1-n2-p2",
            text: "Plugging in the phone and letting it charge refills the battery.",
            illustration: "phone-charging",
          },
          {
            id: "m1-n2-p3",
            text: "Electricity is the phone's power source.",
            illustration: "electricity-power",
          },
          {
            id: "m1-n2-p4",
            text: "When the battery is full enough, every app can work again.",
            illustration: "phone-fully-charged",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Power up your phone!",
          items: [{ id: "plug", label: "Plug", icon: "plug" }],
          targets: [{ id: "socket", label: "Socket", icon: "socket" }],
          correctMapping: { plug: "socket" },
        },
        funFact: "A fully charged phone battery can last about 10-12 hours.",
      },
      {
        id: "m1-n3",
        title: "Build the body",
        panels: [
          {
            id: "m1-n3-p1",
            text: "Your body has many 'apps' running all the time!",
            illustration: "body-apps-overview",
          },
          {
            id: "m1-n3-p2",
            text: "Your brain is like a control center. It helps you think, feel, and decide.",
            illustration: "brain-control-center",
          },
          {
            id: "m1-n3-p3",
            text: "Your heart pumps blood like a steady drumbeat. It never takes a day off.",
            illustration: "heart-pumping",
          },
          {
            id: "m1-n3-p4",
            text: "Your lungs pull in air and swap fresh oxygen for used-up air you breathe out.",
            illustration: "lungs-breathing",
          },
          {
            id: "m1-n3-p5",
            text: "Your digestive system breaks down and absorbs food.",
            illustration: "digestive-system",
          },
          {
            id: "m1-n3-p6",
            text: "Bones give your body a structure, and muscles help you move your body.",
            illustration: "bones-and-muscles",
          },
          {
            id: "m1-n3-p7",
            text: "Brain, heart, lungs, bones, muscles, digestion and more — all functioning together, right now.",
            illustration: "all-systems-running",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Drag each part to the right spot on the body.",
          items: [
            { id: "brain", label: "Brain", icon: "brain" },
            { id: "heart", label: "Heart", icon: "heart" },
            { id: "lungs", label: "Lungs", icon: "lungs" },
            { id: "muscles", label: "Muscles", icon: "muscles" },
            { id: "stomach", label: "Stomach", icon: "stomach" },
            { id: "bones", label: "Bones", icon: "bones" },
          ],
          targets: [
            { id: "head", label: "Head", icon: "head" },
            { id: "chest-left", label: "Chest (left)", icon: "chest-left" },
            { id: "chest-right", label: "Chest (right)", icon: "chest-right" },
            { id: "arms", label: "Arms", icon: "arms" },
            { id: "belly", label: "Belly", icon: "belly" },
            { id: "legs", label: "Legs", icon: "legs" },
          ],
          correctMapping: {
            brain: "head",
            heart: "chest-left",
            lungs: "chest-right",
            muscles: "arms",
            stomach: "belly",
            bones: "legs",
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
            illustration: "body-needs-recharge",
          },
          {
            id: "m1-n4-p2",
            text: "Food is your main everyday energy source. It helps you think, move, and grow.",
            illustration: "food-energy-source",
          },
          {
            id: "m1-n4-p3",
            text: "Water does not give energy like food, but it keeps blood and nutrients moving smoothly.",
            illustration: "water-flowing",
          },
          {
            id: "m1-n4-p4",
            text: "Sleep is recovery time. Your body repairs, sorts memories, and gets ready for tomorrow.",
            illustration: "sleep-recovery",
          },
        ],
        game: {
          type: "drag-drop",
          prompt: "Sort what powers your body from what does not.",
          items: [
            { id: "apple", label: "Apple", icon: "apple" },
            { id: "cookie", label: "Cookie", icon: "cookie" },
            { id: "water-bottle", label: "Water", icon: "water-bottle" },
            { id: "bed", label: "Bed", icon: "bed" },
            { id: "tea", label: "Tea", icon: "tea" },
            { id: "popcorn", label: "Popcorn", icon: "popcorn" },
            { id: "watermelon", label: "Watermelon", icon: "watermelon" },
            { id: "battery", label: "Battery", icon: "battery" },
            { id: "lightning", label: "Lightning bolt", icon: "lightning" },
            { id: "wifi", label: "Wi-Fi signal", icon: "wifi" },
            { id: "plug", label: "Plug", icon: "plug" },
          ],
          targets: [
            { id: "powers-your-body", label: "Powers your body", icon: "powers-your-body" },
            { id: "does-not-power", label: "Does not power your body", icon: "does-not-power" },
          ],
          correctMapping: {
            apple: "powers-your-body",
            cookie: "powers-your-body",
            "water-bottle": "powers-your-body",
            bed: "powers-your-body",
            tea: "powers-your-body",
            popcorn: "powers-your-body",
            watermelon: "powers-your-body",
            battery: "does-not-power",
            lightning: "does-not-power",
            wifi: "does-not-power",
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
            illustration: "three-food-groups",
          },
          {
            id: "m1-n5-p3",
            text: "The three groups are called macronutrients: carbohydrates, proteins, and fats.",
            illustration: "macronutrients-reveal",
          },
        ],
        game: {
          type: "multiple-choice",
          prompt: "How many main energy groups does food come in?",
          items: [
            { id: "two", label: "2", icon: "two" },
            { id: "three", label: "3", icon: "three" },
            { id: "five", label: "5", icon: "five" },
            { id: "ten", label: "10", icon: "ten" },
          ],
          correctId: "three",
        },
        funFact:
          "'Macro' means big — because your body needs these in large amounts!",
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
