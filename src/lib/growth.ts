import { DOMAIN_INFO } from "../data/content";
import { QUESTS } from "../data/quests";
import type { CourageAnswer, DnaResult, Domain, Level, QuestLevel } from "../types";

/**
 * The Growth Report: a plain-language summary of what the child is
 * shining at after training, plus movement families to explore.
 *
 * Deliberately NOT a sport recommendation or ranking: it names
 * strengths ("aiming & catching magic") and activity families, and
 * always frames the lowest area as the next quest, never a lack.
 */

export const LEVEL_INFO: Record<QuestLevel, { name: string; emoji: string }> = {
  1: { name: "Rookie", emoji: "🌱" },
  2: { name: "Pro", emoji: "🔥" },
  3: { name: "Master", emoji: "👑" },
};

export interface TrainerLevel {
  name: string;
  emoji: string;
  blurb: string;
}

export interface GrowthStrength {
  emoji: string;
  title: string;
  detail: string;
  levelLabel: string;
}

export interface ExploreOption {
  emoji: string;
  title: string;
  examples: string;
}

export interface GrowthReportData {
  trainerLevel: TrainerLevel;
  strengths: GrowthStrength[];
  courageStrengths: string[];
  growth: { emoji: string; title: string; detail: string };
  exploreOptions: ExploreOption[];
  /** Champion-only: real-world sport doors matched to top strengths. */
  sportDoors?: ExploreOption[];
  effort: { quests: number; courage: number; weeks: number; checkIns: number };
}

const DOMAINS: Domain[] = ["locomotor", "objectControl", "stability"];

const FAMILY: Record<Domain, ExploreOption> = {
  locomotor: {
    emoji: "⚡",
    title: "The Speed & Agility family",
    examples: "chase and tag games, relays, athletics-style play, obstacle runs",
  },
  objectControl: {
    emoji: "🎯",
    title: "The Aim & Catch family",
    examples: "throwing and catching games, target play, racket-style and goal-style games",
  },
  stability: {
    emoji: "🧗",
    title: "The Balance & Body-Control family",
    examples: "climbing, gymnastics-style movement, martial-arts-style play, yoga adventures",
  },
};

/**
 * Champion-only sport doors. Named sports appear ONLY after the full
 * three-season journey, as invitations grounded in demonstrated
 * strengths. Plural options, never a single prediction.
 */
const SPORT_DOORS: Record<Domain, ExploreOption> = {
  locomotor: {
    emoji: "⚡",
    title: "Doors where Zoom Power shines",
    examples: "athletics, football, tag rugby, tennis, dodgeball",
  },
  objectControl: {
    emoji: "🎯",
    title: "Doors where Ball Magic shines",
    examples: "volleyball, basketball, cricket, handball, badminton",
  },
  stability: {
    emoji: "🧗",
    title: "Doors where Balance Power shines",
    examples: "gymnastics, climbing, martial arts, skateboarding, surfing",
  },
};

const STRENGTH_DETAIL: Record<Domain, string> = {
  locomotor: "Fast feet, quick direction changes and big running energy",
  objectControl: "Sharp eyes and clever hands: throwing, catching, kicking and aiming",
  stability: "Steady balance, strong core and calm body control",
};

/** Average trained level (1–3) across a domain's quest library. */
function domainLevel(domain: Domain, questLevels: Record<string, QuestLevel>): number {
  const list = QUESTS[domain];
  return list.reduce((sum, q) => sum + (questLevels[q.id] ?? 1), 0) / list.length;
}

export function trainerLevelFor(questLevels: Record<string, QuestLevel>): TrainerLevel {
  const values = Object.values(questLevels);
  const masters = values.filter((l) => l === 3).length;
  const proPlus = values.filter((l) => l >= 2).length;
  if (masters >= 6)
    return { name: "Master Trainer", emoji: "👑", blurb: "Top-level twists conquered. Mastery in motion!" };
  if (proPlus >= 4)
    return { name: "Pro Trainer", emoji: "🔥", blurb: "Quests are leveling up. Skills turning into superpowers!" };
  return { name: "Rookie Trainer", emoji: "🌱", blurb: "Every master started here. The adventure is underway!" };
}

export function buildGrowthReport(
  result: DnaResult,
  planProgress: Record<string, boolean>,
  courage: Record<number, CourageAnswer>,
  questLevels: Record<string, QuestLevel>,
  checkIns: Record<number, Level>,
  opts: { champion?: boolean; history?: { quests: number; weeks: number; courage: number; checkIns: number } } = {},
): GrowthReportData {
  // Combine the Discovery Day score with trained quest levels so the
  // report reflects both the starting spark and the practice since.
  const combined = DOMAINS.map((d) => ({
    domain: d,
    score: result.domainScores[d] + domainLevel(d, questLevels),
  })).sort((a, b) => b.score - a.score);

  const [top1, top2] = combined;
  const lowest = combined[combined.length - 1].domain;

  const strengthFor = (domain: Domain): GrowthStrength => {
    const info = DOMAIN_INFO[domain];
    const trained = domainLevel(domain, questLevels);
    return {
      emoji: info.emoji,
      title: `${info.kidName} (${STRENGTH_DETAIL[domain].split(": ")[0].split(",")[0].toLowerCase()})`,
      detail:
        STRENGTH_DETAIL[domain] +
        (trained >= 2
          ? ". And weeks of practice have turned this spark into real skill."
          : ". A natural spark that practice keeps growing."),
      levelLabel:
        trained >= 2.5 ? "👑 Master level" : trained >= 1.5 ? "🔥 Pro level" : "🌱 Growing",
    };
  };

  const courageStrengths: string[] = [];
  const stageDone = (from: number, to: number) => {
    for (let w = from; w <= to; w++) if (!courage[w]?.missionDone) return false;
    return true;
  };
  if (stageDone(1, 4)) courageStrengths.push("💛 Knows their feelings and their strengths");
  if (stageDone(5, 8)) courageStrengths.push("🛡️ Uses a strong, kind voice and knows their Safety Team");
  if (stageDone(9, 12)) courageStrengths.push("🌟 Includes others and leads with heart");

  const exploreOptions: ExploreOption[] = [FAMILY[top1.domain], FAMILY[top2.domain]];
  exploreOptions.push(
    result.social === "group"
      ? { emoji: "🎪", title: "Big-crew versions", examples: "team formats of the families above. Group energy is this explorer's fuel" }
      : result.social === "smallSquad"
        ? { emoji: "👯", title: "Buddy versions", examples: "small-pod formats of the families above, with one or two good friends" }
        : { emoji: "🤝", title: "One-to-one versions", examples: "focused coach-and-me formats of the families above" },
  );

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1).filter((w) =>
    [0, 1, 2].every((q) => planProgress[`w${w}-q${q}`]),
  ).length;

  const history = opts.history ?? { quests: 0, weeks: 0, courage: 0, checkIns: 0 };

  return {
    trainerLevel: opts.champion
      ? { name: "CoachUp Champion", emoji: "🏆", blurb: "Every season conquered. A true movement adventurer!" }
      : trainerLevelFor(questLevels),
    strengths: [strengthFor(top1.domain), strengthFor(top2.domain)],
    courageStrengths,
    sportDoors: opts.champion ? [SPORT_DOORS[top1.domain], SPORT_DOORS[top2.domain]] : undefined,
    growth: {
      emoji: DOMAIN_INFO[lowest].emoji,
      title: `${DOMAIN_INFO[lowest].kidName}: the next quest`,
      detail: `${DOMAIN_INFO[lowest].name} games are the freshest frontier. More playful practice here unlocks brand-new powers. That's the exciting part!`,
    },
    exploreOptions,
    effort: {
      quests: Object.values(planProgress).filter(Boolean).length + history.quests,
      courage: Object.values(courage).filter((c) => c?.missionDone).length + history.courage,
      weeks: weeks + history.weeks,
      checkIns: Object.keys(checkIns).length + history.checkIns,
    },
  };
}
