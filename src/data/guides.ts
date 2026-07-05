import type { Level } from "../types";

/**
 * The adventure guides children can choose from. Remi the Otter is the
 * default and the brand mascot; the others give kids ownership of the
 * journey. Each guide has a distinct coaching personality that colors
 * their intro, weekly check-in reactions and graduation cheer.
 * Story copy is written with "Remi" and personalized at render time by
 * swapping in the chosen guide's first name.
 */
export interface GuideInfo {
  id: string;
  name: string;
  firstName: string;
  emoji: string;
  vibe: string;
  /** Short personality line shown on the picker card. */
  style: string;
  /** A catchphrase used in the meet screen intro. */
  motto: string;
  /** Check-in reactions in the guide's own voice (1 gentle / 2 happy / 3 fire). */
  reactions: Record<Level, string>;
  /** Graduation celebration line. */
  cheer: string;
}

export const GUIDES: GuideInfo[] = [
  {
    id: "remi",
    name: "Remi the Otter",
    firstName: "Remi",
    emoji: "🦦",
    vibe: "playful river explorer",
    style: "Playful & silly",
    motto: "Let's turn EVERYTHING into a game!",
    reactions: {
      1: "Thanks for telling me 💛 Next week we'll make the games smaller and even sillier. Tiny quests, giant giggles!",
      2: "Yippee! That's the perfect splash. Same fun-sized pace coming up! 😊",
      3: "WOOHOO! 🎉 Extra-bouncy challenges coming right up. Let's gooo!",
    },
    cheer: "OTTERLY AMAZING! You've grown SO much. River-dance party time! 🎉",
  },
  {
    id: "luna",
    name: "Luna the Owl",
    firstName: "Luna",
    emoji: "🦉",
    vibe: "wise and twinkly",
    style: "Chill & wise",
    motto: "Slow breaths, clever moves. We've got this.",
    reactions: {
      1: "Wise of you to notice 🌙 Next week will be softer and slower. Small wings still fly far.",
      2: "Lovely. We'll glide on at this gentle, happy pace. ✨",
      3: "My, my! Those wings are ready for cleverer, twistier challenges next week! 🌟",
    },
    cheer: "Wise wings, brilliant flight. Look how far you've soared! ✨",
  },
  {
    id: "dash",
    name: "Dash the Dolphin",
    firstName: "Dash",
    emoji: "🐬",
    vibe: "splashy and speedy",
    style: "Fast & sporty",
    motto: "Ready, set, GO GO GO!",
    reactions: {
      1: "Smart call, champ 💙 We'll shorten the sprints next week. Rest is where speed is made!",
      2: "Nice pace, teammate! Keep cruising. Waves ahead! 🌊",
      3: "BOOM! 💥 TURBO MODE unlocked for next week. Hold onto your fins!",
    },
    cheer: "LIGHTNING SPEED, CHAMPION! That was a personal-best kind of day! ⚡",
  },
  {
    id: "koko",
    name: "Koko the Koala",
    firstName: "Koko",
    emoji: "🐨",
    vibe: "cozy and calm",
    style: "Cozy & steady",
    motto: "One cozy step at a time.",
    reactions: {
      1: "Thank you for sharing 🤎 Next week: smaller, cozier quests with extra snack breaks built in.",
      2: "Steady and lovely. We'll amble on at this comfy pace. ☕",
      3: "Goodness me! Bigger adventures coming next week. Cozily, of course! 🌟",
    },
    cheer: "Warm hugs and enormous pride. You steady, splendid star! 🤎",
  },
];

export function getGuide(id: string | undefined): GuideInfo {
  return GUIDES.find((g) => g.id === id) ?? GUIDES[0];
}
