import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Confetti from "../components/Confetti";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import TimerBox from "../components/TimerBox";
import { DOMAIN_INFO, MODULES } from "../data/content";
import { generatePlan, type PlanQuest, type PlanWeek } from "../lib/plan";
import type { ChildProfile, DnaResult } from "../types";

interface TrainingPlanProps {
  profile: ChildProfile;
  result: DnaResult;
  progress: Record<string, boolean>;
  onToggleQuest: (key: string) => void;
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/* Quest row + expandable detail                                       */
/* ------------------------------------------------------------------ */

function QuestRow({
  planQuest,
  done,
  expanded,
  onToggle,
  onExpand,
}: {
  planQuest: PlanQuest;
  done: boolean;
  expanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
}) {
  const { quest, levelUp } = planQuest;
  const domain = DOMAIN_INFO[quest.domain];

  return (
    <div className={`rounded-2xl border-2 transition-colors ${expanded ? "border-lagoon/40 bg-cream" : "border-transparent bg-cream/60"}`}>
      <div className="flex items-center gap-3 p-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={done ? `Mark ${quest.title} as not done` : `Mark ${quest.title} as done`}
          className={`shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
            done ? "bg-lagoon border-lagoon text-white scale-105" : "bg-white border-deepsea/20 text-transparent"
          }`}
        >
          ✓
        </button>
        <button type="button" onClick={onExpand} className="flex-1 min-w-0 flex items-center gap-3 text-left">
          <span className="text-2xl">{quest.emoji}</span>
          <span className="flex-1 min-w-0">
            <span className={`block font-display font-bold text-sm ${done ? "text-deepsea/40 line-through" : "text-deepsea"}`}>
              {quest.title}
              {levelUp && <span className="ml-1.5 text-xs text-berry font-extrabold no-underline">LEVEL UP!</span>}
            </span>
            <span className="block text-[11px] font-bold text-deepsea/40">
              {domain.emoji} {domain.kidName}
            </span>
          </span>
          <span className={`text-deepsea/40 text-sm transition-transform ${expanded ? "rotate-180" : ""}`}>▾</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3">
              <p className="text-xs text-deepsea/60">
                <span className="font-bold text-deepsea/80">You'll need:</span> {quest.youllNeed}
              </p>
              <ol className="space-y-2">
                {quest.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-white flex items-center justify-center text-base">
                      {step.emoji}
                    </span>
                    <span className="text-xs text-deepsea/80 leading-snug pt-1.5">
                      <span className="font-bold text-tangerine mr-1">{i + 1}.</span>
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>
              {levelUp && (
                <p className="text-xs bg-berry/10 text-deepsea/80 rounded-xl px-3 py-2">
                  <span className="font-extrabold text-berry">⬆️ Level up:</span> {quest.levelUp}
                </p>
              )}
              {quest.timer && <TimerBox timer={quest.timer} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Week card                                                           */
/* ------------------------------------------------------------------ */

function WeekCard({
  week,
  isCurrent,
  doneCount,
  progress,
  expandedKey,
  onToggleQuest,
  onExpand,
  index,
}: {
  week: PlanWeek;
  isCurrent: boolean;
  doneCount: number;
  progress: Record<string, boolean>;
  expandedKey: string | null;
  onToggleQuest: (key: string) => void;
  onExpand: (key: string | null) => void;
  index: number;
}) {
  const complete = doneCount === week.quests.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(0.05 * index, 0.4), duration: 0.35 }}
      className={`bg-white/90 rounded-3xl shadow-card p-4 ${isCurrent ? "ring-2 ring-tangerine" : ""}`}
    >
      <div className="flex items-center gap-3 mb-1.5">
        <span
          className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center font-display font-extrabold ${
            complete
              ? "bg-gradient-to-br from-sunshine to-tangerine text-white text-xl"
              : "bg-cream text-deepsea"
          }`}
        >
          {complete ? "★" : week.week}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-extrabold text-deepsea leading-tight">
              {week.title} {week.titleEmoji}
            </h3>
          </div>
          <p className="text-[11px] font-bold text-deepsea/40 uppercase tracking-wide">
            Week {week.week} · {week.phaseEmoji} {week.phase} · {doneCount}/{week.quests.length} quests
          </p>
        </div>
        {isCurrent && (
          <span className="shrink-0 text-[10px] font-extrabold bg-tangerine text-white rounded-full px-2.5 py-1 uppercase tracking-wide">
            📍 You are here
          </span>
        )}
      </div>

      <p className="flex items-start gap-2 text-xs text-deepsea/60 mb-3 pl-1">
        <span className="text-base leading-none pt-0.5">🦦</span>
        <span className="italic">{week.remiTip}</span>
      </p>

      <div className="space-y-2">
        {week.quests.map((pq) => (
          <QuestRow
            key={pq.key}
            planQuest={pq}
            done={!!progress[pq.key]}
            expanded={expandedKey === pq.key}
            onToggle={() => onToggleQuest(pq.key)}
            onExpand={() => onExpand(expandedKey === pq.key ? null : pq.key)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen                                                              */
/* ------------------------------------------------------------------ */

export default function TrainingPlan({
  profile,
  result,
  progress,
  onToggleQuest,
  onBack,
}: TrainingPlanProps) {
  const plan = useMemo(() => generatePlan(result), [result]);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  const name = profile.name.trim() || "Your explorer";
  const mod = MODULES[result.module];
  const doneTotal = plan.weeks.reduce(
    (sum, w) => sum + w.quests.filter((q) => progress[q.key]).length,
    0,
  );
  const currentWeek =
    plan.weeks.find((w) => w.quests.some((q) => !progress[q.key]))?.week ?? 12;

  const handleToggle = (key: string, week: PlanWeek) => {
    const wasDone = !!progress[key];
    onToggleQuest(key);
    // Completing the last open quest of a week earns a confetti moment.
    if (!wasDone) {
      const nowDone = week.quests.filter((q) => progress[q.key] || q.key === key).length;
      if (nowDone === week.quests.length) {
        setCelebrating(true);
        setTimeout(() => setCelebrating(false), 3500);
      }
    }
  };

  return (
    <Screen onBack={onBack}>
      {celebrating && <Confetti count={20} />}

      {/* Header */}
      <div className={`bg-gradient-to-br ${mod.gradient} rounded-3xl shadow-card p-5 text-white mb-4`}>
        <div className="flex items-center gap-3">
          <Remi size="sm" bounce={false} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              {mod.emoji} {mod.name}
            </p>
            <h2 className="font-display font-extrabold text-2xl leading-tight">
              {name}'s 12-Week Adventure
            </h2>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>{doneTotal} of {plan.totalQuests} quests complete</span>
            <span>{Math.round((doneTotal / plan.totalQuests) * 100)}%</span>
          </div>
          <div className="h-3 bg-white/25 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sunshine rounded-full"
              initial={false}
              animate={{ width: `${(doneTotal / plan.totalQuests) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
        <p className="mt-3 text-xs opacity-90 leading-relaxed">
          Three home quests a week, made for {name}: {DOMAIN_INFO[result.strengthDomain].kidName}{" "}
          games to shine in, {DOMAIN_INFO[result.growthDomain].kidName} games to grow with — and
          level-up twists waiting in weeks 9–12!
        </p>
      </div>

      {/* Journey */}
      <div className="space-y-4 pb-8">
        {plan.weeks.map((week, i) => (
          <WeekCard
            key={week.week}
            week={week}
            index={i}
            isCurrent={week.week === currentWeek}
            doneCount={week.quests.filter((q) => progress[q.key]).length}
            progress={progress}
            expandedKey={expandedKey}
            onToggleQuest={(key) => handleToggle(key, week)}
            onExpand={setExpandedKey}
          />
        ))}

        <div className="text-center py-4">
          {doneTotal === plan.totalQuests ? (
            <p className="font-display font-extrabold text-xl text-deepsea">
              🎪 The Grand Festival is complete — what an adventure, {name}! 🏆
            </p>
          ) : (
            <p className="text-sm text-deepsea/50">
              🦦 Remi says: any quest, any order — every adventure counts!
            </p>
          )}
        </div>
      </div>
    </Screen>
  );
}
