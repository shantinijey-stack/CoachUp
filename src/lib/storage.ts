import type { AppState } from "../types";

const STORAGE_KEY = "coachup-kids-discovery-v1";

export const INITIAL_STATE: AppState = {
  screen: "landing",
  subIndex: 0,
  profile: {
    name: "",
    age: 5,
    activityLevel: "",
    activitiesTried: [],
    parentGoal: "",
    healthNote: "",
  },
  answers: {
    movement: {},
    comfort: {},
  },
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as AppState;
    // Shallow-merge over defaults so older saved shapes never crash the app.
    return {
      ...INITIAL_STATE,
      ...parsed,
      profile: { ...INITIAL_STATE.profile, ...parsed.profile },
      answers: {
        movement: { ...parsed.answers?.movement },
        comfort: { ...parsed.answers?.comfort },
        drive: parsed.answers?.drive,
        confidence: parsed.answers?.confidence,
        social: parsed.answers?.social,
      },
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full / private mode — the prototype keeps working from memory.
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
