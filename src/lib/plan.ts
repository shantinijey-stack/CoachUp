import { MODULES } from "../data/content";
import { QUESTS, WEEK_THEMES_BY_SEASON, type Quest } from "../data/quests";
import type { ComfortStyle, DnaResult, Domain, Level, QuestLevel, SocialStyle } from "../types";

export interface PlanQuest {
  /** Stable key used for progress persistence, e.g. "w3-q1". */
  key: string;
  quest: Quest;
  /**
   * Minimum twist tier this slot plays at (1 base / 2 pro / 3 master).
   * Rookie Season ramps to Pro in weeks 9–12; Pro Season plays Pro
   * throughout and ramps to Master; Master Season is Master everywhere.
   */
  tierFloor: QuestLevel;
}

export interface PlanWeek {
  week: number; // 1–12
  phase: string; // module phase name, e.g. "Ignite"
  phaseEmoji: string;
  title: string;
  titleEmoji: string;
  remiTip: string;
  quests: PlanQuest[];
}

export interface TrainingPlan {
  weeks: PlanWeek[];
  totalQuests: number;
}

/* ------------------------------------------------------------------ */
/* Personalization copy (growth language only)                         */
/* ------------------------------------------------------------------ */

const COMFORT_TIPS: Record<ComfortStyle, string> = {
  calm: "Keep quests in a familiar, calm spot — same place, same little warm-up. Predictable feels powerful.",
  flex: "Mix up where you play — living room, garden, park. Fresh places keep quests exciting.",
  adventure: "Take quests outside, add music, make it loud and silly — big energy is the fuel!",
};

const DRIVE_TIPS: Record<Level, string> = {
  1: "Short and sweet wins the week — stop each quest while it's still fun, and the spark grows.",
  2: "One quest a day is the perfect pace — steady adventurers go far.",
  3: "Feed the fire — let them replay a quest or invent an even harder version!",
};

const SOCIAL_TIPS: Record<SocialStyle, string> = {
  individual: "These quests shine one-on-one — your full attention is the real magic.",
  smallSquad: "Invite one buddy or sibling along this week — quests are twice the fun in a small squad.",
  group: "Turn a quest into a family tournament — everyone plays, everyone cheers!",
};

/* ------------------------------------------------------------------ */
/* Plan generation                                                     */
/* ------------------------------------------------------------------ */

/**
 * Weekly domain mix by phase:
 *  - Weeks 1–4 lead with the strength domain (confidence zone) and
 *    gently introduce the growth quest.
 *  - Weeks 5–8 balance strength, growth and the third domain.
 *  - Weeks 9–12 put the growth quest first and unlock level-up twists.
 */
function domainPattern(week: number, strength: Domain, growth: Domain, third: Domain): Domain[] {
  if (week <= 4) return [strength, strength, growth];
  if (week <= 8) return [strength, growth, third];
  return [growth, strength, third];
}

function tierFloorFor(season: number, week: number): QuestLevel {
  if (season >= 3) return 3;
  if (season === 2) return week >= 9 ? 3 : 2;
  return week >= 9 ? 2 : 1;
}

/**
 * Builds the deterministic 12-week plan from a DNA result and season.
 * The same inputs always produce the same plan (no randomness), so the
 * journey stays stable across sessions.
 */
export function generatePlan(result: DnaResult, season: number = 1): TrainingPlan {
  const { strengthDomain: strength, growthDomain: growth } = result;
  const third = (["locomotor", "objectControl", "stability"] as Domain[]).find(
    (d) => d !== strength && d !== growth,
  )!;

  const mod = MODULES[result.module];
  const tips = [COMFORT_TIPS[result.comfortStyle], DRIVE_TIPS[result.drive], SOCIAL_TIPS[result.social]];

  // Per-domain counters cycle through each domain's quest list so
  // favorites come back around, like real practice.
  const counters: Record<Domain, number> = { locomotor: 0, objectControl: 0, stability: 0 };
  const nextQuest = (domain: Domain): Quest => {
    const list = QUESTS[domain];
    const quest = list[counters[domain] % list.length];
    counters[domain] += 1;
    return quest;
  };

  const themes = WEEK_THEMES_BY_SEASON[Math.min(3, Math.max(1, season))];
  const weeks: PlanWeek[] = Array.from({ length: 12 }, (_, i) => {
    const week = i + 1;
    const phase = mod.weeks[Math.min(2, Math.floor(i / 4))];
    const theme = themes[i];

    return {
      week,
      phase: phase.phase,
      phaseEmoji: phase.emoji,
      title: theme.title,
      titleEmoji: theme.emoji,
      remiTip: tips[i % tips.length],
      quests: domainPattern(week, strength, growth, third).map((domain, q) => ({
        key: `w${week}-q${q}`,
        quest: nextQuest(domain),
        tierFloor: tierFloorFor(season, week),
      })),
    };
  });

  return { weeks, totalQuests: 36 };
}
