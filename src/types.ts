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
  | "plan";

export interface AppState {
  screen: Screen;
  /** Sub-question index within movement / comfort / spark screens. */
  subIndex: number;
  profile: ChildProfile;
  answers: Answers;
  /** Completed training-plan quests, keyed like "w3-q1". */
  planProgress: Record<string, boolean>;
}
