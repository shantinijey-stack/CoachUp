import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GuideContext } from "./components/GuideContext";
import { MOVEMENT_ACTIVITIES } from "./data/content";
import { getGuide } from "./data/guides";
import { scoreDiscoveryDay } from "./lib/scoring";
import { clearState, INITIAL_STATE, loadState, saveState } from "./lib/storage";
import BadgeBook from "./screens/BadgeBook";
import Celebration from "./screens/Celebration";
import GraduationDay from "./screens/GraduationDay";
import GrowthReport from "./screens/GrowthReport";
import ComfortMap from "./screens/ComfortMap";
import Dashboard from "./screens/Dashboard";
import DnaReport from "./screens/DnaReport";
import Landing from "./screens/Landing";
import MeetRemi from "./screens/MeetRemi";
import MovementSnapshot from "./screens/MovementSnapshot";
import QuickStart from "./screens/QuickStart";
import SparkSnapshot from "./screens/SparkSnapshot";
import TrainingPlan from "./screens/TrainingPlan";
import type { AgeBand, AppState, Domain, Level, SocialStyle } from "./types";

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
  // Where the Sticker Book returns to (not worth persisting).
  const [badgeReturnTo, setBadgeReturnTo] = useState<"plan" | "dashboard">("plan");

  useEffect(() => {
    saveState(state);
  }, [state]);

  const ageBand: AgeBand = state.profile.age <= 6 ? "4-6" : "7-12";
  const progress = beatFor(state) / TOTAL_BEATS;

  const result = useMemo(
    () =>
      ["report", "dashboard", "plan", "badges", "growth", "graduation"].includes(state.screen)
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

  const toggleQuest = (key: string) =>
    setState((s) => ({
      ...s,
      planProgress: { ...s.planProgress, [key]: !s.planProgress[key] },
    }));

  // Swapping a quest also clears its done mark — the new quest hasn't been played yet.
  const swapQuest = (key: string, questId: string) =>
    setState((s) => ({
      ...s,
      swaps: { ...s.swaps, [key]: questId },
      planProgress: { ...s.planProgress, [key]: false },
    }));

  const checkIn = (week: number, feeling: Level) =>
    setState((s) => ({ ...s, checkIns: { ...s.checkIns, [week]: feeling } }));

  const courageChoice = (week: number, choice: number) =>
    setState((s) => ({
      ...s,
      courage: { ...s.courage, [week]: { ...s.courage[week], choice } },
    }));

  const courageMission = (week: number) =>
    setState((s) => ({
      ...s,
      courage: {
        ...s.courage,
        [week]: { ...s.courage[week], missionDone: !s.courage[week]?.missionDone },
      },
    }));

  const badgesSeen = (ids: string[]) =>
    setState((s) => {
      const unseen = ids.filter((id) => !s.seenBadges.includes(id));
      return unseen.length ? { ...s, seenBadges: [...s.seenBadges, ...unseen] } : s;
    });

  const openBadges = (from: "plan" | "dashboard") => {
    setBadgeReturnTo(from);
    go("badges");
  };

  /**
   * Passing a Graduation Adventure: archive this season's stats (so
   * badges and lifetime totals never regress), advance the season with
   * a fresh plan, and store the new movement marks as the next baseline.
   * Quest levels, badges, guide and profile all carry over.
   */
  const completeGraduation = (movement: Record<Domain, Level>) =>
    setState((s) => {
      const record = {
        season: s.season,
        quests: Object.values(s.planProgress).filter(Boolean).length,
        weeks: Array.from({ length: 12 }, (_, i) => i + 1).filter((w) =>
          [0, 1, 2].every((q) => s.planProgress[`w${w}-q${q}`]),
        ).length,
        courage: Object.values(s.courage).filter((c) => c?.missionDone).length,
        checkIns: Object.keys(s.checkIns).length,
      };
      if (s.season >= 3) {
        return {
          ...s,
          champion: true,
          lastGradMovement: movement,
          seasonHistory: [...s.seasonHistory, record],
          screen: "growth" as const,
        };
      }
      return {
        ...s,
        season: s.season + 1,
        seasonHistory: [...s.seasonHistory, record],
        lastGradMovement: movement,
        planProgress: {},
        checkIns: {},
        swaps: {},
        courage: {},
        screen: "plan" as const,
        subIndex: 0,
      };
    });

  const levelUpQuest = (questId: string) =>
    setState((s) => ({
      ...s,
      questLevels: {
        ...s.questLevels,
        [questId]: Math.min(3, (s.questLevels[questId] ?? 1) + 1) as 1 | 2 | 3,
      },
    }));

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
    <GuideContext.Provider value={getGuide(state.profile.guideId)}>
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
            guideId={state.profile.guideId}
            onSelectGuide={(guideId) =>
              setState((s) => ({ ...s, profile: { ...s.profile, guideId } }))
            }
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
            planDoneCount={Object.values(state.planProgress).filter(Boolean).length}
            onViewReport={() => go("report")}
            onOpenPlan={() => go("plan")}
            onOpenBadges={() => openBadges("dashboard")}
            onOpenGrowth={() => go("growth")}
            onRestart={restart}
          />
        )}

        {state.screen === "plan" && result && (
          <TrainingPlan
            key="plan"
            profile={state.profile}
            result={result}
            progress={state.planProgress}
            checkIns={state.checkIns}
            swaps={state.swaps}
            courage={state.courage}
            seenBadges={state.seenBadges}
            questLevels={state.questLevels}
            season={state.season}
            champion={state.champion}
            historyQuests={state.seasonHistory.reduce((n, r) => n + r.quests, 0)}
            onStartGraduation={() => go("graduation")}
            onLevelUp={levelUpQuest}
            onToggleQuest={toggleQuest}
            onSwapQuest={swapQuest}
            onCheckIn={checkIn}
            onCourageChoice={courageChoice}
            onCourageMission={courageMission}
            onBadgesSeen={badgesSeen}
            onOpenBadges={() => openBadges("plan")}
            onBack={() => go("dashboard")}
          />
        )}

        {state.screen === "badges" && result && (
          <BadgeBook
            key="badges"
            profile={state.profile}
            inputs={{
              hasResult: true,
              planProgress: state.planProgress,
              courage: state.courage,
              checkIns: state.checkIns,
              historyQuests: state.seasonHistory.reduce((n, r) => n + r.quests, 0),
              historyCourage: state.seasonHistory.reduce((n, r) => n + r.courage, 0),
              historyCheckIns: state.seasonHistory.reduce((n, r) => n + r.checkIns, 0),
            }}
            onSeen={badgesSeen}
            onBack={() => go(badgeReturnTo)}
          />
        )}

        {state.screen === "growth" && result && (
          <GrowthReport
            key="growth"
            profile={state.profile}
            result={result}
            planProgress={state.planProgress}
            courage={state.courage}
            questLevels={state.questLevels}
            checkIns={state.checkIns}
            champion={state.champion}
            seasonHistory={state.seasonHistory}
            onBack={() => go("dashboard")}
          />
        )}

        {state.screen === "graduation" && result && (
          <GraduationDay
            key="graduation"
            profile={state.profile}
            season={state.season}
            baseline={state.lastGradMovement ?? result.domainScores}
            onGraduate={completeGraduation}
            onBack={() => go("plan")}
          />
        )}
      </AnimatePresence>
    </div>
    </GuideContext.Provider>
  );
}
