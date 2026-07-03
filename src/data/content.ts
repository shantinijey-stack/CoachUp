import type {
  AgeBand,
  ComfortKey,
  Domain,
  Level,
  ModuleId,
  SocialStyle,
} from "../types";

/* ------------------------------------------------------------------ */
/* Parent Quick Start options                                          */
/* ------------------------------------------------------------------ */

export const ACTIVITY_LEVELS = [
  { id: "cozy", label: "Cozy explorer", emoji: "🛋️", hint: "Prefers calm play at home" },
  { id: "steady", label: "Steady mover", emoji: "🚶", hint: "Active in bursts, loves the playground" },
  { id: "energizer", label: "Non-stop energizer", emoji: "🚀", hint: "Always running, jumping, climbing" },
];

export const ACTIVITIES_TRIED = [
  { id: "swimming", label: "Swimming", emoji: "🏊" },
  { id: "football", label: "Football", emoji: "⚽" },
  { id: "dance", label: "Dance", emoji: "💃" },
  { id: "gymnastics", label: "Gymnastics", emoji: "🤸" },
  { id: "martial", label: "Martial arts", emoji: "🥋" },
  { id: "cycling", label: "Cycling", emoji: "🚴" },
  { id: "playground", label: "Playground play", emoji: "🛝" },
  { id: "none", label: "Just getting started", emoji: "🌱" },
];

export const PARENT_GOALS = [
  { id: "confidence", label: "Build confidence", emoji: "🌟" },
  { id: "fun", label: "Have fun being active", emoji: "🎉" },
  { id: "skills", label: "Grow movement skills", emoji: "🧗" },
  { id: "friends", label: "Make active friends", emoji: "🤝" },
  { id: "energy", label: "Channel big energy", emoji: "⚡" },
];

/* ------------------------------------------------------------------ */
/* Movement Snapshot activities                                        */
/* ------------------------------------------------------------------ */

export interface MovementActivity {
  domain: Domain;
  title: string;
  emoji: string;
  scene: string; // Remi's storybook framing
  question: string; // what the parent observes
  options: { level: Level; label: string; description: string; emoji: string }[];
}

export const MOVEMENT_ACTIVITIES: Record<AgeBand, MovementActivity[]> = {
  "4-6": [
    {
      domain: "locomotor",
      title: "Bunny Hop Adventure",
      emoji: "🐰",
      scene:
        "Remi found a trail of lily pads across the meadow! Can your little explorer hop from pad to pad like a bunny?",
      question: "When they hop on two feet across the room, what do you see?",
      options: [
        { level: 1, label: "Emerging", emoji: "🌱", description: "Hops are just starting — one foot leads or they pause between hops" },
        { level: 2, label: "Growing", emoji: "🌿", description: "Hops along with both feet, sometimes wobbly but keeps going" },
        { level: 3, label: "Thriving", emoji: "🌳", description: "Springy two-foot hops in a row, could hop all day!" },
      ],
    },
    {
      domain: "objectControl",
      title: "Rolling Ball Rescue",
      emoji: "⚽",
      scene:
        "Oh no — Remi's favorite ball is rolling away! Roll a ball back and forth together and see how the rescue mission goes.",
      question: "When rolling and stopping a ball with you, what do you see?",
      options: [
        { level: 1, label: "Emerging", emoji: "🌱", description: "Learning to line up hands with the ball — catches are surprises!" },
        { level: 2, label: "Growing", emoji: "🌿", description: "Stops and rolls the ball back most of the time" },
        { level: 3, label: "Thriving", emoji: "🌳", description: "Traps, rolls and aims the ball with confidence" },
      ],
    },
    {
      domain: "stability",
      title: "Balancing Flamingo",
      emoji: "🦩",
      scene:
        "Remi met a fancy flamingo who stands on one leg! Can your explorer strike the flamingo pose too?",
      question: "When they balance on one foot, what do you see?",
      options: [
        { level: 1, label: "Emerging", emoji: "🌱", description: "A quick flamingo flash — a second or two with a helping hand" },
        { level: 2, label: "Growing", emoji: "🌿", description: "Holds the pose for a few seconds with wiggly arms" },
        { level: 3, label: "Thriving", emoji: "🌳", description: "Steady statue flamingo — 8+ seconds, maybe even eyes closed!" },
      ],
    },
  ],
  "7-12": [
    {
      domain: "locomotor",
      title: "Zig-Zag Lightning Run",
      emoji: "⚡",
      scene:
        "Remi set up a lightning course! Place 4 objects in a line and have your mover zig-zag through them as fast as they can.",
      question: "When they weave through the course, what do you see?",
      options: [
        { level: 1, label: "Emerging", emoji: "🌱", description: "Takes it step by step — turns are careful and slow down the run" },
        { level: 2, label: "Growing", emoji: "🌿", description: "Good speed with a few wide turns or bumped cones" },
        { level: 3, label: "Thriving", emoji: "🌳", description: "Sharp cuts at speed — a lightning bolt through the course!" },
      ],
    },
    {
      domain: "objectControl",
      title: "Wall Ball 10",
      emoji: "🎾",
      scene:
        "Remi challenges your champ to Wall Ball 10: throw a ball against a wall and catch it 10 times in a row!",
      question: "How does the Wall Ball 10 challenge go?",
      options: [
        { level: 1, label: "Emerging", emoji: "🌱", description: "Catches a few — timing the bounce is the exciting part to learn" },
        { level: 2, label: "Growing", emoji: "🌿", description: "Gets 5–8 catches with focus and resets" },
        { level: 3, label: "Thriving", emoji: "🌳", description: "10 clean catches — maybe even one-handed for style!" },
      ],
    },
    {
      domain: "stability",
      title: "Superhero Hold",
      emoji: "🦸",
      scene:
        "Time for superhero training! Hold a plank (or superhero flying pose on the tummy, arms out) for as long as possible.",
      question: "During the Superhero Hold, what do you see?",
      options: [
        { level: 1, label: "Emerging", emoji: "🌱", description: "Powers up for 5–10 seconds — the core cape is still charging" },
        { level: 2, label: "Growing", emoji: "🌿", description: "Solid 15–25 second hold with some shakes" },
        { level: 3, label: "Thriving", emoji: "🌳", description: "30+ seconds of rock-steady superhero power" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Comfort Map questions                                               */
/* ------------------------------------------------------------------ */

export interface ComfortQuestion {
  key: ComfortKey;
  title: string;
  emoji: string;
  scene: string;
  options: { level: Level; label: string; description: string; emoji: string }[];
}

export const COMFORT_QUESTIONS: ComfortQuestion[] = [
  {
    key: "sound",
    title: "Sound Safari",
    emoji: "🔊",
    scene: "Remi's world has quiet forests and buzzing stadiums. Where does your child feel happiest?",
    options: [
      { level: 1, label: "Calm cove", emoji: "🌙", description: "Loves quieter spaces — big noise takes energy" },
      { level: 2, label: "Goes with the flow", emoji: "🌊", description: "Fine with noise once they settle in" },
      { level: 3, label: "Loves the roar", emoji: "📣", description: "The louder and livelier, the better!" },
    ],
  },
  {
    key: "contact",
    title: "Huddle or Space?",
    emoji: "🤗",
    scene: "Some games have high-fives and friendly bumps. How does your child feel about physical contact in play?",
    options: [
      { level: 1, label: "Own bubble", emoji: "🫧", description: "Prefers personal space while playing" },
      { level: 2, label: "Warm-up hugger", emoji: "🙂", description: "Okay with contact once comfortable" },
      { level: 3, label: "Huddle hero", emoji: "🏉", description: "Loves team huddles, tags and friendly tumbles" },
    ],
  },
  {
    key: "mess",
    title: "Mud & Mess Meter",
    emoji: "🎨",
    scene: "Remi loves splashing in mud puddles. How does your child feel about mess, sand, grass and gooey textures?",
    options: [
      { level: 1, label: "Tidy explorer", emoji: "🧼", description: "Prefers clean hands and dry clothes" },
      { level: 2, label: "A little mess is fine", emoji: "🖐️", description: "Doesn't mind mess when the fun is worth it" },
      { level: 3, label: "Mud magnet", emoji: "💦", description: "The messier the adventure, the bigger the smile" },
    ],
  },
  {
    key: "climate",
    title: "Weather Watch",
    emoji: "🌦️",
    scene: "Adventures happen in sunshine, wind and drizzle. How does your child handle hot, cold or rainy days?",
    options: [
      { level: 1, label: "Cozy weather fan", emoji: "🏠", description: "Happiest indoors or in mild, comfy weather" },
      { level: 2, label: "Season sampler", emoji: "⛅", description: "Adapts to most weather with the right gear" },
      { level: 3, label: "All-weather ranger", emoji: "🌪️", description: "Rain or shine, they want to be out there" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Spark Snapshot questions                                            */
/* ------------------------------------------------------------------ */

export interface SparkQuestion {
  key: "drive" | "confidence" | "social";
  title: string;
  emoji: string;
  scene: string;
  options: {
    value: Level | SocialStyle;
    label: string;
    description: string;
    emoji: string;
  }[];
}

export const SPARK_QUESTIONS: SparkQuestion[] = [
  {
    key: "drive",
    title: "The Spark Meter",
    emoji: "🔥",
    scene: "When today's adventures ended, how did your child feel?",
    options: [
      { value: 1, label: "Phew, all done!", emoji: "😮‍💨", description: "Relieved it's over — recharging time" },
      { value: 2, label: "Happy and done", emoji: "😊", description: "Enjoyed it and felt finished" },
      { value: 3, label: "Again! Again!", emoji: "🤩", description: "Asked to keep going or do it again" },
    ],
  },
  {
    key: "confidence",
    title: "The Brave-o-Meter",
    emoji: "🌟",
    scene: "When your child tries something new and active, what usually happens first?",
    options: [
      { value: 1, label: "Cheer squad start", emoji: "💛", description: "Needs a little encouragement to begin" },
      { value: 2, label: "Watch, then wow", emoji: "👀", description: "Watches others first, then joins in" },
      { value: 3, label: "Dives right in", emoji: "🦅", description: "Jumps straight into the action" },
    ],
  },
  {
    key: "social",
    title: "The Friendship Compass",
    emoji: "🧭",
    scene: "Where does your child's play magic happen most?",
    options: [
      { value: "individual", label: "One-on-one", emoji: "🤝", description: "Solo play or with one trusted person" },
      { value: "smallSquad", label: "Small squad", emoji: "👯", description: "One or two good friends" },
      { value: "group", label: "The big crew", emoji: "🎪", description: "A big lively group — the more the merrier" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Modules                                                             */
/* ------------------------------------------------------------------ */

export interface ModuleInfo {
  id: ModuleId;
  name: string;
  emoji: string;
  tagline: string;
  gradient: string; // tailwind gradient classes
  description: string;
  weeks: { phase: string; weeks: string; focus: string; emoji: string }[];
}

export const MODULES: Record<ModuleId, ModuleInfo> = {
  foundations: {
    id: "foundations",
    name: "Foundations Explorers",
    emoji: "🧭",
    tagline: "Every superpower starts with a great foundation",
    gradient: "from-meadow to-lagoon",
    description:
      "A joyful all-round adventure that grows running, throwing, balancing and confidence together — perfect for building a love of movement from the ground up.",
    weeks: [
      { phase: "Explore", weeks: "Weeks 1–4", focus: "Playful games across all movement worlds", emoji: "🗺️" },
      { phase: "Grow", weeks: "Weeks 5–8", focus: "Favorite skills get their own spotlight", emoji: "🌿" },
      { phase: "Shine", weeks: "Weeks 9–12", focus: "Mini adventures that celebrate every win", emoji: "✨" },
    ],
  },
  lightning: {
    id: "lightning",
    name: "Lightning Movers",
    emoji: "⚡",
    tagline: "For kids whose feet were born to fly",
    gradient: "from-sunshine to-tangerine",
    description:
      "A speed-and-agility adventure built around running, dodging, jumping and racing games — turning natural zoom into skillful, confident movement.",
    weeks: [
      { phase: "Ignite", weeks: "Weeks 1–4", focus: "Fun speed games and animal races", emoji: "🐆" },
      { phase: "Charge", weeks: "Weeks 5–8", focus: "Agility courses and chase challenges", emoji: "🌀" },
      { phase: "Storm", weeks: "Weeks 9–12", focus: "Team relay adventures and the Lightning Cup", emoji: "🏆" },
    ],
  },
  ballMasters: {
    id: "ballMasters",
    name: "Ball Masters",
    emoji: "🏀",
    tagline: "Hands and feet with ball magic",
    gradient: "from-sky to-berry",
    description:
      "A hands-on adventure with throwing, catching, kicking and aiming games — growing sharp eyes and clever hands across every kind of ball play.",
    weeks: [
      { phase: "Discover", weeks: "Weeks 1–4", focus: "Every ball, every game — find the favorites", emoji: "🎯" },
      { phase: "Craft", weeks: "Weeks 5–8", focus: "Target quests and catch-combo challenges", emoji: "🧤" },
      { phase: "Master", weeks: "Weeks 9–12", focus: "Mini-matches and the Ball Masters Festival", emoji: "🎪" },
    ],
  },
  balanceNinjas: {
    id: "balanceNinjas",
    name: "Balance Ninjas",
    emoji: "🥷",
    tagline: "Stillness is a superpower",
    gradient: "from-lagoon to-deepsea",
    description:
      "A body-control adventure with balancing quests, climbing challenges and ninja poses — building the calm, strong core that powers every sport.",
    weeks: [
      { phase: "Train", weeks: "Weeks 1–4", focus: "Ninja poses, beams and freeze games", emoji: "🧘" },
      { phase: "Flow", weeks: "Weeks 5–8", focus: "Obstacle paths and slow-motion challenges", emoji: "🌊" },
      { phase: "Belt-Up", weeks: "Weeks 9–12", focus: "The Ninja Trials adventure course", emoji: "🎗️" },
    ],
  },
  allStars: {
    id: "allStars",
    name: "All-Stars Multi-Sport",
    emoji: "🌟",
    tagline: "Ready for every arena",
    gradient: "from-coral to-berry",
    description:
      "A multi-sport adventure for kids thriving across movement worlds — sampling many sports, learning game smarts and leading with heart.",
    weeks: [
      { phase: "Sample", weeks: "Weeks 1–4", focus: "A new sport world every week", emoji: "🌍" },
      { phase: "Sharpen", weeks: "Weeks 5–8", focus: "Game tactics, teamwork and leadership", emoji: "🧠" },
      { phase: "Showcase", weeks: "Weeks 9–12", focus: "The All-Stars Games festival", emoji: "🎖️" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Friendly labels                                                     */
/* ------------------------------------------------------------------ */

export const DOMAIN_INFO: Record<Domain, { name: string; emoji: string; kidName: string }> = {
  locomotor: { name: "Locomotor", emoji: "🏃", kidName: "Zoom Power" },
  objectControl: { name: "Object Control", emoji: "🎯", kidName: "Ball Magic" },
  stability: { name: "Stability", emoji: "🧘", kidName: "Balance Power" },
};

export const LEVEL_LABELS: Record<Level, string> = {
  1: "Emerging",
  2: "Growing",
  3: "Thriving",
};
