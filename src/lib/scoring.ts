import { DOMAIN_INFO, MODULES } from "../data/content";
import type {
  Answers,
  ChildProfile,
  ComfortStyle,
  DnaResult,
  Domain,
  Level,
  ModuleId,
  SocialStyle,
} from "../types";

const DOMAINS: Domain[] = ["locomotor", "objectControl", "stability"];

/* ------------------------------------------------------------------ */
/* Delivery calibration copy (growth language only)                    */
/* ------------------------------------------------------------------ */

const INTENSITY_RAMP: Record<Level, string> = {
  1: "Gentle build: short bursts of fun with plenty of recharge breaks, gradually growing session energy",
  2: "Steady climb: a balanced mix of active games and rest, building stamina week by week",
  3: "Turbo track: high-energy sessions with bonus challenges to feed that 'again, again!' spark",
};

const WELCOME_STYLE: Record<Level, string> = {
  1: "Warm welcome. A coach buddy greets them at the door and starts with a favorite game to spark momentum",
  2: "Watch-then-wow. A front-row viewing spot first, then a personal invitation to jump in when ready",
  3: "Straight into action. First in line for the opening game, with fresh challenges to keep the fire lit",
};

const GROUP_FORMAT: Record<SocialStyle, string> = {
  individual: "One-to-one or duo coaching. Deep focus time with a trusted coach",
  smallSquad: "Small squad pods. 2–3 buddies per activity for close-knit teamwork",
  group: "Full crew energy. Big-group games with lots of buzz and celebration",
};

const COMFORT_COPY: Record<ComfortStyle, { label: string; emoji: string; note: string }> = {
  calm: {
    label: "Calm Explorer",
    emoji: "🌙",
    note: "Thrives in calm, predictable spaces. We'll choose quieter session times, give a heads-up before louder games, and keep personal space respected.",
  },
  flex: {
    label: "Flexible Adventurer",
    emoji: "🌊",
    note: "Adapts happily to most settings. We'll mix cozy and lively moments so every session feels fresh and comfortable.",
  },
  adventure: {
    label: "Adventure Seeker",
    emoji: "🌋",
    note: "Feeds off buzz, mess and big energy! We'll bring lively games, outdoor adventures and full-volume celebrations.",
  },
};

/* ------------------------------------------------------------------ */
/* Core scoring                                                        */
/* ------------------------------------------------------------------ */

export function computeComfortStyle(comfort: Partial<Record<string, Level>>): ComfortStyle {
  const values = Object.values(comfort).filter((v): v is Level => v !== undefined);
  const calmCount = values.filter((v) => v === 1).length;
  const adventureCount = values.filter((v) => v === 3).length;
  if (calmCount >= 3) return "calm";
  if (adventureCount >= 3) return "adventure";
  return "flex";
}

/**
 * Strength = highest-scoring domain, growth quest = lowest-scoring domain.
 * Ties resolve in DOMAINS order; when all are tied, the growth quest picks
 * a different domain than the strength so the report always has both.
 */
function pickStrengthAndGrowth(scores: Record<Domain, Level>): {
  strength: Domain;
  growth: Domain;
} {
  let strength = DOMAINS[0];
  let growth = DOMAINS[0];
  for (const d of DOMAINS) {
    if (scores[d] > scores[strength]) strength = d;
    if (scores[d] < scores[growth]) growth = d;
  }
  if (strength === growth) {
    growth = DOMAINS.find((d) => d !== strength) ?? growth;
  }
  return { strength, growth };
}

export function assignModule(
  age: number,
  scores: Record<Domain, Level>,
  strength: Domain,
): ModuleId {
  const thrivingCount = DOMAINS.filter((d) => scores[d] === 3).length;

  // All-Stars: older kids thriving in 2+ domains.
  if (age >= 7 && thrivingCount >= 2) return "allStars";

  const allEqual = DOMAINS.every((d) => scores[d] === scores[DOMAINS[0]]);
  const allEmerging = DOMAINS.every((d) => scores[d] === 1);
  const youngAllRounder = age <= 6 && thrivingCount === 0;

  // Foundations: balanced profiles, early-journey profiles, or younger
  // children who benefit most from all-round play.
  if (allEqual || allEmerging || youngAllRounder) return "foundations";

  switch (strength) {
    case "locomotor":
      return "lightning";
    case "objectControl":
      return "ballMasters";
    case "stability":
      return "balanceNinjas";
  }
}

/* ------------------------------------------------------------------ */
/* Report copy generation                                              */
/* ------------------------------------------------------------------ */

function buildParentExplanation(
  name: string,
  strength: Domain,
  growth: Domain,
  comfortStyle: ComfortStyle,
  moduleId: ModuleId,
): string {
  const s = DOMAIN_INFO[strength];
  const g = DOMAIN_INFO[growth];
  const mod = MODULES[moduleId];
  const comfortPhrase = {
    calm: `${name} shines brightest in calm, welcoming spaces, so sessions are shaped to feel safe and predictable`,
    flex: `${name} adapts beautifully to different settings, so sessions can mix cozy moments with lively ones`,
    adventure: `${name} lights up around big energy and new sensations, so sessions bring plenty of buzz and adventure`,
  }[comfortStyle];

  return (
    `${name}'s movement spark shines brightest in ${s.name} (${s.kidName} ${s.emoji}). That's the superpower we'll celebrate and build on. ` +
    `The next exciting quest is ${g.name} (${g.kidName} ${g.emoji}), where playful practice will unlock brand-new skills. ` +
    `${comfortPhrase}. ` +
    `That's why we recommend ${mod.name} ${mod.emoji}: ${mod.tagline.toLowerCase()}.`
  );
}

function buildCoachNotes(
  name: string,
  profile: ChildProfile,
  result: Omit<DnaResult, "coachNotes" | "parentExplanation">,
): string[] {
  const notes: string[] = [];
  const s = DOMAIN_INFO[result.strengthDomain];
  const g = DOMAIN_INFO[result.growthDomain];

  notes.push(`Lead with ${s.name.toLowerCase()} games early in the session. It's ${name}'s confidence zone.`);
  notes.push(`Weave ${g.name.toLowerCase()} practice into favorite games in small, winnable doses. Celebrate every attempt.`);
  notes.push(COMFORT_COPY[result.comfortStyle].note);
  const ramp = INTENSITY_RAMP[result.drive].split(": ")[1] ?? INTENSITY_RAMP[result.drive];
  notes.push(ramp.charAt(0).toUpperCase() + ramp.slice(1));
  notes.push(WELCOME_STYLE[result.confidence]);
  notes.push(GROUP_FORMAT[result.social]);
  if (profile.healthNote.trim()) {
    notes.push(`Family note to keep in mind: "${profile.healthNote.trim()}"`);
  }
  return notes;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function scoreDiscoveryDay(profile: ChildProfile, answers: Answers): DnaResult {
  const domainScores: Record<Domain, Level> = {
    locomotor: answers.movement.locomotor ?? 1,
    objectControl: answers.movement.objectControl ?? 1,
    stability: answers.movement.stability ?? 1,
  };

  const { strength, growth } = pickStrengthAndGrowth(domainScores);
  const comfortStyle = computeComfortStyle(answers.comfort);
  const drive = answers.drive ?? 2;
  const confidence = answers.confidence ?? 2;
  const social = answers.social ?? "smallSquad";
  const module = assignModule(profile.age, domainScores, strength);

  const base = {
    strengthDomain: strength,
    growthDomain: growth,
    domainScores,
    comfortStyle,
    drive,
    confidence,
    social,
    module,
    intensityRamp: INTENSITY_RAMP[drive],
    welcomeStyle: WELCOME_STYLE[confidence],
    groupFormat: GROUP_FORMAT[social],
  };

  return {
    ...base,
    parentExplanation: buildParentExplanation(
      profile.name || "Your explorer",
      strength,
      growth,
      comfortStyle,
      module,
    ),
    coachNotes: buildCoachNotes(profile.name || "your explorer", profile, base),
  };
}

export { COMFORT_COPY, INTENSITY_RAMP, WELCOME_STYLE, GROUP_FORMAT };
