import type { ActivityTimer } from "./content";
import type { Domain } from "../types";

/**
 * Home mini-game library for the 12-week adventure plan.
 * Four quests per movement domain; the plan generator cycles through
 * them so favorites return, just like real practice.
 */
export interface Quest {
  id: string;
  title: string;
  emoji: string;
  domain: Domain;
  youllNeed: string;
  steps: { emoji: string; text: string }[];
  timer?: ActivityTimer;
  /** Pro twist — unlocked at Pro level or in the plan's final phase. */
  levelUp: string;
  /** Master twist — unlocked at Master level. */
  master: string;
}

export const QUESTS: Record<Domain, Quest[]> = {
  locomotor: [
    {
      id: "animal-parade",
      title: "Animal Parade",
      emoji: "🦘",
      domain: "locomotor",
      youllNeed: "A clear path across a room or garden",
      steps: [
        { emoji: "🦁", text: "Call out an animal — hop like a kangaroo, stomp like a bear, tiptoe like a fox" },
        { emoji: "🔁", text: "Cross the room as that animal, then pick a new one" },
        { emoji: "🎶", text: "Keep the parade going until the timer sings!" },
      ],
      timer: { mode: "countdown", seconds: 60, label: "One-minute parade!" },
      levelUp: "Parade backwards, or invent a brand-new animal nobody has ever seen!",
      master: "Three animals in a row with no pauses between — and narrate the adventure story as you go!",
    },
    {
      id: "floor-is-lava",
      title: "Floor is Lava",
      emoji: "🌋",
      domain: "locomotor",
      youllNeed: "5–6 “safe rocks” (cushions, paper sheets or chalk circles)",
      steps: [
        { emoji: "🪨", text: "Scatter the safe rocks a jump apart across the floor" },
        { emoji: "🦶", text: "The floor is lava! Jump rock to rock without touching it" },
        { emoji: "🔥", text: "Made it across? Move the rocks a little further apart" },
      ],
      timer: { mode: "countdown", seconds: 45, label: "Escape the lava!" },
      levelUp: "Two-feet jumps only — and carry a teddy passenger to safety!",
      master: "Lava rising! Rocks a big jump apart, teddy passenger aboard — two full crossings without a splash.",
    },
    {
      id: "shadow-chase",
      title: "Shadow Chase",
      emoji: "🏃",
      domain: "locomotor",
      youllNeed: "Just the two of you and space to move",
      steps: [
        { emoji: "🐾", text: "One of you is the leader — run, skip, dodge and spin" },
        { emoji: "👥", text: "The shadow copies every move, right behind" },
        { emoji: "🔄", text: "Swap roles when the timer ends — shadows become leaders!" },
      ],
      timer: { mode: "countdown", seconds: 60, label: "Chase for one minute!" },
      levelUp: "Leader adds jumps and direction switches with no warning — sharp shadows only!",
      master: "Mirror mode: the shadow copies with OPPOSITE hands and feet, and the leader adds three surprise freezes.",
    },
    {
      id: "rocket-races",
      title: "Rocket Races",
      emoji: "🚀",
      domain: "locomotor",
      youllNeed: "Two markers about 10 big steps apart",
      steps: [
        { emoji: "🧑‍🚀", text: "Stand at the launch pad — count down 3, 2, 1…" },
        { emoji: "💨", text: "Blast off! Run to the far marker and back" },
        { emoji: "⏱️", text: "Time the flight — then try to beat it by one second" },
      ],
      timer: { mode: "stopwatch", label: "Time the rocket flight!" },
      levelUp: "Fly two laps, or launch sideways-shuffling like a space crab!",
      master: "Three laps with a touchdown tap at every marker — steady astronaut breathing the whole flight.",
    },
  ],
  objectControl: [
    {
      id: "sock-ball-basket",
      title: "Sock-Ball Basket",
      emoji: "🧦",
      domain: "objectControl",
      youllNeed: "3 rolled-up sock balls and a laundry basket or box",
      steps: [
        { emoji: "🧺", text: "Put the basket 3 big steps away" },
        { emoji: "🎯", text: "Toss sock balls underarm into the basket" },
        { emoji: "👟", text: "Score 3 in a row? Take one step back!" },
      ],
      timer: { mode: "counter", target: 10, label: "Count the baskets!" },
      levelUp: "Throw with your other hand, or spin once before each toss!",
      master: "Five steps back, other hand only — land five baskets in a row.",
    },
    {
      id: "balloon-keepy-up",
      title: "Balloon Keepy-Up",
      emoji: "🎈",
      domain: "objectControl",
      youllNeed: "One balloon and a little space",
      steps: [
        { emoji: "🎈", text: "Tap the balloon up in the air — don't let it land!" },
        { emoji: "✋", text: "Use hands, then try elbows, head and knees" },
        { emoji: "🔢", text: "Count every tap — what's the record today?" },
      ],
      timer: { mode: "counter", target: 10, label: "Count the taps!" },
      levelUp: "Keep two balloons up at once, or taps with feet only!",
      master: "Twenty taps alternating hands and feet — no double-taps allowed!",
    },
    {
      id: "target-kick",
      title: "Target Kick",
      emoji: "🥅",
      domain: "objectControl",
      youllNeed: "A soft ball and two cushions as goalposts",
      steps: [
        { emoji: "🥅", text: "Set the cushion goal 3–4 steps away" },
        { emoji: "⚽", text: "Kick the ball through the goal — soft and aimed beats hard and wild" },
        { emoji: "🦶", text: "Try the other foot every second kick" },
      ],
      timer: { mode: "counter", target: 5, label: "Count the goals!" },
      levelUp: "Shrink the goal to one cushion-width, or score from a rolling ball!",
      master: "One-cushion goal, rolling ball — score three in a row.",
    },
    {
      id: "cup-catch",
      title: "Cup Catch",
      emoji: "🥤",
      domain: "objectControl",
      youllNeed: "A big plastic cup (or just hands) and a small soft ball",
      steps: [
        { emoji: "🙌", text: "Toss the ball up gently and catch it in the cup" },
        { emoji: "👀", text: "Eyes on the ball all the way into the cup" },
        { emoji: "📏", text: "Getting easy? Toss a little higher each time" },
      ],
      timer: { mode: "counter", target: 10, label: "Count the catches!" },
      levelUp: "Catch after a bounce, after a clap — or after a full spin!",
      master: "Toss, full spin, one bounce, catch — three in a row without a drop.",
    },
  ],
  stability: [
    {
      id: "freeze-statue",
      title: "Freeze Statue",
      emoji: "🗿",
      domain: "stability",
      youllNeed: "Music you can pause (or a grown-up shouting “freeze!”)",
      steps: [
        { emoji: "💃", text: "Dance big and silly while the music plays" },
        { emoji: "🧊", text: "Music stops — freeze in a statue pose, stone-still!" },
        { emoji: "🦵", text: "Each freeze gets trickier: one leg, tiptoes, arms up high" },
      ],
      timer: { mode: "countdown", seconds: 60, label: "Statue party — one minute!" },
      levelUp: "Freeze with eyes closed, or hold each statue for a slow count of ten!",
      master: "Freeze on tiptoes with eyes closed for a slow count of ten.",
    },
    {
      id: "tightrope-walker",
      title: "Tightrope Walker",
      emoji: "🎪",
      domain: "stability",
      youllNeed: "A line of tape, string or a garden hose on the ground",
      steps: [
        { emoji: "🪢", text: "Lay the tightrope in a long line (curves welcome!)" },
        { emoji: "🤸", text: "Walk it heel-to-toe, arms out like a circus star" },
        { emoji: "🔙", text: "Reach the end? Walk back — backwards!" },
      ],
      timer: { mode: "stopwatch", label: "Time the tightrope crossing!" },
      levelUp: "Carry a spoon with a sock ball on it — the circus's hardest act!",
      master: "Walk it backwards heel-to-toe carrying the spoon-and-sock-ball — the circus finale!",
    },
    {
      id: "animal-yoga",
      title: "Animal Yoga",
      emoji: "🧘",
      domain: "stability",
      youllNeed: "A mat, carpet or towel",
      steps: [
        { emoji: "🐻", text: "Bear pose: hands and feet down, hips high, hold strong" },
        { emoji: "🦩", text: "Flamingo: one leg up, wings wide, steady breathing" },
        { emoji: "🐕", text: "Puppy stretch to finish — which pose felt strongest?" },
      ],
      timer: { mode: "stopwatch", label: "Time the longest hold!" },
      levelUp: "Flow bear → flamingo → puppy without a wobble between poses!",
      master: "Flow bear → flamingo → puppy twice through with slow breaths — steady as a mountain.",
    },
    {
      id: "pillow-mountain",
      title: "Pillow Mountain",
      emoji: "🏔️",
      domain: "stability",
      youllNeed: "A path of pillows, cushions and folded blankets",
      steps: [
        { emoji: "⛰️", text: "Build a wobbly mountain path across the floor" },
        { emoji: "🥾", text: "Cross it slowly — squishy ground tests super-balance" },
        { emoji: "🏁", text: "Plant an imaginary flag at the summit!" },
      ],
      timer: { mode: "countdown", seconds: 60, label: "Summit in one minute!" },
      levelUp: "Cross carrying a cup of (pretend) mountain tea without spilling!",
      master: "Cross with the (pretend) mountain tea, then return backwards — not a drop spilled.",
    },
  ],
};

/** Fun names for the 12 weeks of the journey — shared across modules. */
export const WEEK_THEMES: { title: string; emoji: string }[] = [
  { title: "The First Spark", emoji: "✨" },
  { title: "The Bouncy Trail", emoji: "🦘" },
  { title: "The Brave Explorer", emoji: "🧭" },
  { title: "The Sparkle Badge", emoji: "🏅" },
  { title: "The Power-Up Path", emoji: "⚡" },
  { title: "The Clever Paws", emoji: "🐾" },
  { title: "The Big Challenge", emoji: "🎯" },
  { title: "The Shining Star", emoji: "🌟" },
  { title: "The Hero Road", emoji: "🛡️" },
  { title: "The Rainbow Leap", emoji: "🌈" },
  { title: "The Master Quest", emoji: "👑" },
  { title: "The Grand Festival", emoji: "🎪" },
];
