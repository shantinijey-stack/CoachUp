import type { Domain, Level, QuestLevel } from "../types";

/**
 * Seasons & the Graduation Adventure gate.
 *
 * A child journeys Rookie Season → Pro Season → Master Season; each is a
 * fresh 12-week plan at a higher base difficulty. Promotion happens at a
 * "Graduation Adventure": the child replays the three Discovery Day
 * activities and the result is compared to their OWN previous marks —
 * never to other children. Not being ready is never a fail: it becomes a
 * "Victory Lap" (keep playing favorites and try again anytime).
 */

export const SEASONS: Record<
  number,
  { name: string; emoji: string; next: string; blurb: string }
> = {
  1: {
    name: "Rookie Season",
    emoji: "🌱",
    next: "Pro Season",
    blurb: "Learning the games and lighting the spark",
  },
  2: {
    name: "Pro Season",
    emoji: "🔥",
    next: "Master Season",
    blurb: "Every quest at Pro twist — skills getting sharp",
  },
  3: {
    name: "Master Season",
    emoji: "👑",
    next: "CoachUp Champion",
    blurb: "Master twists everywhere — the legend chapter",
  },
};

export interface Readiness {
  eligible: boolean;
  questsDone: number;
  questsNeeded: number;
  leveled: number;
  leveledNeeded: number;
  levelName: string; // which level counts for this gate ("Pro" / "Master")
}

/**
 * Gate to *attempt* graduation: most of the season played (25 of 36
 * quests ≈ 70%) and enough quests confirmed at the next tier
 * (4 at Pro+ to leave Rookie; 6 at Master to leave Pro or Master).
 */
export function seasonReadiness(
  season: number,
  planProgress: Record<string, boolean>,
  questLevels: Record<string, QuestLevel>,
): Readiness {
  const questsDone = Object.values(planProgress).filter(Boolean).length;
  const questsNeeded = 25;
  const minLevel = season >= 2 ? 3 : 2;
  const leveled = Object.values(questLevels).filter((l) => l >= minLevel).length;
  const leveledNeeded = season >= 2 ? 6 : 4;
  return {
    eligible: questsDone >= questsNeeded && leveled >= leveledNeeded,
    questsDone,
    questsNeeded,
    leveled,
    leveledNeeded,
    levelName: minLevel === 3 ? "Master" : "Pro",
  };
}

export type GradComparison = {
  domain: Domain;
  before: Level;
  after: Level;
  trend: "grew" | "held" | "warming";
};

/**
 * Compare graduation answers with the child's own baseline (their last
 * graduation, or Discovery Day the first time). Pass = overall held or
 * grew. A dip is "still warming up today" — retry anytime, no fail.
 */
export function compareGraduation(
  baseline: Record<Domain, Level>,
  answers: Record<Domain, Level>,
): { comparisons: GradComparison[]; passed: boolean } {
  const domains: Domain[] = ["locomotor", "objectControl", "stability"];
  const comparisons = domains.map((d) => ({
    domain: d,
    before: baseline[d],
    after: answers[d],
    trend:
      answers[d] > baseline[d]
        ? ("grew" as const)
        : answers[d] === baseline[d]
          ? ("held" as const)
          : ("warming" as const),
  }));
  const sumBefore = domains.reduce((s, d) => s + baseline[d], 0);
  const sumAfter = domains.reduce((s, d) => s + answers[d], 0);
  return { comparisons, passed: sumAfter >= sumBefore };
}
