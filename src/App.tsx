import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { MOVEMENT_ACTIVITIES } from "./data/content";
import { scoreDiscoveryDay } from "./lib/scoring";
import { clearState, INITIAL_STATE, loadState, saveState } from "./lib/storage";
import Celebration from "./screens/Celebration";
import ComfortMap from "./screens/ComfortMap";
import Dashboard from "./screens/Dashboard";
import DnaReport from "./screens/DnaReport";
import Landing from "./screens/Landing";
import MeetRemi from "./screens/MeetRemi";
import MovementSnapshot from "./screens/MovementSnapshot";
import QuickStart from "./screens/QuickStart";
import SparkSnapshot from "./screens/SparkSnapshot";
import type { AgeBand, AppState, Level, SocialStyle } from "./types";

/**
 * Progress model: the adventure has 12 "beats" —
 * quickstart (1) + meetRemi (1) + movement (3) + comfort (4) + spark (3).
 */
const TOTAL_BEATS = 12;

function beatFor(state: AppState): number {
  switch (state.screen) {
    case "quickstart":
      return 1;
    case "meetRemi":
      return 2;
    case "movement":
      return 3 + state.subIndex;
    case "comfort":
      return 6 + state.subIndex;
    case "spark":
      return 10 + state.subIndex;
    default:
      return 0;
  }
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const ageBand: AgeBand = state.profile.age <= 6 ? "4-6" : "7-12";
  const progress = beatFor(state) / TOTAL_BEATS;

  const result = useMemo(
    () =>
      state.screen === "report" || state.screen === "dashboard"
        ? scoreDiscoveryDay(state.profile, state.answers)
        : null,
    [state.screen, state.profile, state.answers],
  );

  const go = (screen: AppState["screen"], subIndex = 0) =>
    setState((s) => ({ ...s, screen, subIndex }));

  const restart = () => {
    clearState();
    setState(INITIAL_STATE);
  };

  /* -------------------------- answer handlers -------------------------- */

  const answerMovement = (index: number, level: Level) => {
    const domain = MOVEMENT_ACTIVITIES[ageBand][index].domain;
    setState((s) => ({
      ...s,
      answers: { ...s.answers, movement: { ...s.answers.movement, [domain]: level } },
    }));
  };

  const answerComfort = (index: number, level: Level) => {
    const keys = ["sound", "contact", "mess", "climate"] as const;
    setState((s) => ({
      ...s,
      answers: { ...s.answers, comfort: { ...s.answers.comfort, [keys[index]]: level } },
    }));
  };

  const answerSpark = (key: "drive" | "confidence" | "social", value: Level | SocialStyle) =>
    setState((s) => ({ ...s, answers: { ...s.answers, [key]: value } }));

  /* ----------------------------- navigation ---------------------------- */

  const nextFromMovement = () =>
    state.subIndex < 2 ? go("movement", state.subIndex + 1) : go("comfort", 0);
  const backFromMovement = () =>
    state.subIndex > 0 ? go("movement", state.subIndex - 1) : go("meetRemi");

  const nextFromComfort = () =>
    state.subIndex < 3 ? go("comfort", state.subIndex + 1) : go("spark", 0);
  const backFromComfort = () =>
    state.subIndex > 0 ? go("comfort", state.subIndex - 1) : go("movement", 2);

  const nextFromSpark = () =>
    state.subIndex < 2 ? go("spark", state.subIndex + 1) : go("celebration");
  const backFromSpark = () =>
    state.subIndex > 0 ? go("spark", state.subIndex - 1) : go("comfort", 3);

  /* ------------------------------- render ------------------------------ */

  return (
    <div className="min-h-dvh">
      <AnimatePresence mode="wait">
        {state.screen === "landing" && (
          <Landing
            key="landing"
            onStart={() => {
              clearState();
              setState({ ...INITIAL_STATE, screen: "quickstart" });
            }}
            hasSavedRun={state.profile.name.trim().length > 0}
            onResume={() => go("quickstart")}
          />
        )}

        {state.screen === "quickstart" && (
          <QuickStart
            key="quickstart"
            profile={state.profile}
            onChange={(profile) => setState((s) => ({ ...s, profile }))}
            onNext={() => go("meetRemi")}
            onBack={() => go("landing")}
            progress={progress}
          />
        )}

        {state.screen === "meetRemi" && (
          <MeetRemi
            key="meetRemi"
            childName={state.profile.name}
            onNext={() => go("movement", 0)}
            onBack={() => go("quickstart")}
            progress={progress}
          />
        )}

        {state.screen === "movement" && (
          <MovementSnapshot
            key={`movement-${state.subIndex}`}
            ageBand={ageBand}
            index={state.subIndex}
            answers={state.answers}
            onAnswer={answerMovement}
            onNext={nextFromMovement}
            onBack={backFromMovement}
            progress={progress}
          />
        )}

        {state.screen === "comfort" && (
          <ComfortMap
            key={`comfort-${state.subIndex}`}
            index={state.subIndex}
            answers={state.answers}
            onAnswer={answerComfort}
            onNext={nextFromComfort}
            onBack={backFromComfort}
            progress={progress}
          />
        )}

        {state.screen === "spark" && (
          <SparkSnapshot
            key={`spark-${state.subIndex}`}
            index={state.subIndex}
            answers={state.answers}
            onAnswer={answerSpark}
            onNext={nextFromSpark}
            onBack={backFromSpark}
            progress={progress}
          />
        )}

        {state.screen === "celebration" && (
          <Celebration
            key="celebration"
            childName={state.profile.name}
            onNext={() => go("report")}
          />
        )}

        {state.screen === "report" && result && (
          <DnaReport
            key="report"
            profile={state.profile}
            result={result}
            onNext={() => go("dashboard")}
            onBack={() => go("celebration")}
          />
        )}

        {state.screen === "dashboard" && result && (
          <Dashboard
            key="dashboard"
            profile={state.profile}
            result={result}
            onViewReport={() => go("report")}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
