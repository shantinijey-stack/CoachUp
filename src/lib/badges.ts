import { WEEK_THEMES } from "../data/quests";
import type { CourageAnswer, Level } from "../types";

/**
 * Stickers & badges — the reward system.
 *
 * Design rule: every reward celebrates effort and showing up (quests
 * played, courage practiced, honest check-ins). Nothing here rewards
 * performance, speed or scores — CoachUp never ranks children.
 * No streaks, no guilt mechanics: progress never expires.
 */

export interface BadgeStatus {
  id: string;
  name: string;
  emoji: string;
  earned: boolean;
  /** Shown when earned. */
  description: string;
  /** Shown while still to come — phrased as an invitation, never a lack. */
  hint: string;
}

export interface StickerStatus {
  week: number;
  emoji: string;
  title: string;
  earned: boolean;
}

export interface BadgeInputs {
  hasResult: boolean;
  planProgress: Record<string, boolean>;
  courage: Record<number, CourageAnswer>;
  checkIns: Record<number, Level>;
}

const weekComplete = (progress: Record<string, boolean>, week: number) =>
  [0, 1, 2].every((q) => progress[`w${week}-q${q}`]);

const courageStageDone = (courage: Record<number, CourageAnswer>, from: number, to: number) => {
  for (let w = from; w <= to; w++) if (!courage[w]?.missionDone) return false;
  return true;
};

export function computeStickers(progress: Record<string, boolean>): StickerStatus[] {
  return WEEK_THEMES.map((theme, i) => ({
    week: i + 1,
    emoji: theme.emoji,
    title: theme.title,
    earned: weekComplete(progress, i + 1),
  }));
}

export function computeBadges(inputs: BadgeInputs): BadgeStatus[] {
  const { hasResult, planProgress, courage, checkIns } = inputs;
  const movementDone = Object.values(planProgress).filter(Boolean).length;
  const courageDone = Object.values(courage).filter((c) => c?.missionDone).length;
  const checkInCount = Object.keys(checkIns).length;

  return [
    {
      id: "spark-finder",
      name: "Spark Finder",
      emoji: "🧬",
      earned: hasResult,
      description: "Completed Discovery Day and found your movement spark!",
      hint: "Finish Discovery Day to find your movement spark.",
    },
    {
      id: "first-quest",
      name: "First Steps",
      emoji: "🥇",
      earned: movementDone >= 1,
      description: "Played your very first home quest — every adventure starts with one step!",
      hint: "Play any home quest to take your first step.",
    },
    {
      id: "week-one",
      name: "Week One Wonder",
      emoji: "⭐",
      earned: weekComplete(planProgress, 1),
      description: "Finished all of Week 1 — The First Spark is lit!",
      hint: "Finish all three Week 1 quests.",
    },
    {
      id: "check-in-star",
      name: "Check-In Star",
      emoji: "🗣️",
      earned: checkInCount >= 1,
      description: "Told your guide how the week felt — honest explorers grow fastest!",
      hint: "After a week's quests, tell your guide how it felt.",
    },
    {
      id: "quest-collector",
      name: "Quest Collector",
      emoji: "🎒",
      earned: movementDone >= 10,
      description: "Ten quests in the adventure bag!",
      hint: "Play 10 home quests to fill the adventure bag.",
    },
    {
      id: "halfway-hero",
      name: "Halfway Hero",
      emoji: "🏔️",
      earned: movementDone >= 18,
      description: "Halfway up the mountain — 18 quests played!",
      hint: "Reach 18 quests to plant the halfway flag.",
    },
    {
      id: "grand-festival",
      name: "Grand Festival",
      emoji: "🎪",
      earned: movementDone >= 36,
      description: "All 36 quests complete — the whole 12-week adventure!",
      hint: "Complete every quest in the 12-week adventure.",
    },
    {
      id: "courage-cub",
      name: "Courage Cub",
      emoji: "💜",
      earned: courageDone >= 1,
      description: "Completed your first courage mission — courage grows every time you use it!",
      hint: "Complete any Courage Quest mission.",
    },
    {
      id: "heart-explorer",
      name: "Heart Explorer",
      emoji: "💛",
      earned: courageStageDone(courage, 1, 4),
      description: "Finished the Knowing Me stage — feelings named, strengths found!",
      hint: "Complete the Week 1–4 courage missions.",
    },
    {
      id: "standing-strong",
      name: "Standing Strong",
      emoji: "🛡️",
      earned: courageStageDone(courage, 5, 8),
      description: "Safety Team built, Strong Stop practiced — standing tall!",
      hint: "Complete the Week 5–8 courage missions.",
    },
    {
      id: "heart-lifter",
      name: "Heart Lifter",
      emoji: "🌟",
      earned: courageStageDone(courage, 9, 12),
      description: "Upstander moves and magic words — a leader who lifts others!",
      hint: "Complete the Week 9–12 courage missions.",
    },
    {
      id: "courage-champion",
      name: "Courage Champion",
      emoji: "👑",
      earned: courageDone >= 12,
      description: "Every courage mission complete — your Courage Story is legendary!",
      hint: "Complete all 12 courage missions.",
    },
  ];
}
