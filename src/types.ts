/** Movement domains assessed during Discovery Day. */
export type Domain = "locomotor" | "objectControl" | "stability";

/** Every scored answer maps to 1 (Emerging), 2 (Growing) or 3 (Thriving). */
export type Level = 1 | 2 | 3;

export type ComfortKey = "sound" | "contact" | "mess" | "climate";

export type SocialStyle = "individual" | "smallSquad" | "group";

export type ComfortStyle = "calm" | "flex" | "adventure";

export type ModuleId =
  | "foundations"
  | "lightning"
  | "ballMasters"
  | "balanceNinjas"
  | "allStars";

export type AgeBand = "4-6" | "7-12";

export interface ChildProfile {
  name: string;
  age: number; // 4–12
  activityLevel: string;
  activitiesTried: string[];
  parentGoal: string;
  healthNote: string;
  /** The child's chosen adventure guide (see data/guides.ts). */
  guideId: string;
}

export interface Answers {
  movement: Partial<Record<Domain, Level>>;
  comfort: Partial<Record<ComfortKey, Level>>;
  drive?: Level;
  confidence?: Level;
  social?: SocialStyle;
}

/** The output of the scoring engine — everything the DNA report needs. */
export interface DnaResult {
  strengthDomain: Domain;
  growthDomain: Domain;
  domainScores: Record<Domain, Level>;
  comfortStyle: ComfortStyle;
  drive: Level;
  confidence: Level;
  social: SocialStyle;
  module: ModuleId;
  intensityRamp: string;
  welcomeStyle: string;
  groupFormat: string;
  parentExplanation: string;
  coachNotes: string[];
}

/** Which screen of the adventure we're on. */
export type Screen =
  | "landing"
  | "quickstart"
  | "meetRemi"
  | "movement"
  | "comfort"
  | "spark"
  | "celebration"
  | "report"
  | "dashboard"
  | "plan"
  | "badges";

export interface AppState {
  screen: Screen;
  /** Sub-question index within movement / comfort / spark screens. */
  subIndex: number;
  profile: ChildProfile;
  answers: Answers;
  /** Completed training-plan quests, keyed like "w3-q1". */
  planProgress: Record<string, boolean>;
  /** Weekly check-in answers: week number → how it felt (1 gentle / 2 good / 3 fire). */
  checkIns: Record<number, Level>;
  /** Quest swaps chosen by parents: plan slot key → replacement quest id. */
  swaps: Record<string, string>;
  /** Courage Quest progress: week number → chosen answer + mission state. */
  courage: Record<number, CourageAnswer>;
  /** Badge ids whose earn-celebration has been shown. */
  seenBadges: string[];
}

export interface CourageAnswer {
  /** Index of the chosen scenario answer. */
  choice?: number;
  missionDone?: boolean;
}
