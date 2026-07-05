import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Confetti from "../components/Confetti";
import CourageQuestCard from "../components/CourageQuestCard";
import { useGuide } from "../components/GuideContext";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import TimerBox from "../components/TimerBox";
import { DOMAIN_INFO, MODULES } from "../data/content";
import { COURAGE_QUESTS, COURAGE_STAGES } from "../data/courage";
import { QUESTS, type Quest } from "../data/quests";
import type { GuideInfo } from "../data/guides";
import { computeBadges } from "../lib/badges";
import { seasonReadiness, SEASONS } from "../lib/graduation";
import { LEVEL_INFO, trainerLevelFor } from "../lib/growth";
import { generatePlan, type PlanWeek } from "../lib/plan";
import type { ChildProfile, CourageAnswer, DnaResult, Level, QuestLevel } from "../types";

interface TrainingPlanProps {
  profile: ChildProfile;
  result: DnaResult;
  progress: Record<string, boolean>;
  checkIns: Record<number, Level>;
  swaps: Record<string, string>;
  courage: Record<number, CourageAnswer>;
  seenBadges: string[];
  questLevels: Record<string, QuestLevel>;
  season: number;
  champion: boolean;
  historyQuests: number;
  onStartGraduation: () => void;
  onLevelUp: (questId: string) => void;
  onToggleQuest: (key: string) => void;
  onSwapQuest: (key: string, questId: string) => void;
  onCheckIn: (week: number, feeling: Level) => void;
  onCourageChoice: (week: number, choice: number) => void;
  onCourageMission: (week: number) => void;
  onBadgesSeen: (ids: string[]) => void;
  onOpenBadges: () => void;
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/* Check-in copy: how last week felt shapes this week's encouragement  */
/* ------------------------------------------------------------------ */

const CHECK_IN_OPTIONS: { value: Level; emoji: string; label: string }[] = [
  { value: 1, emoji: "😮‍💨", label: "It felt big" },
  { value: 2, emoji: "😊", label: "Good fun" },
  { value: 3, emoji: "🤩", label: "Loved it!" },
];

const ADAPTIVE_TIPS: Record<Level, string> = {
  1: "Last week felt like a big climb, so this week let's shrink each quest to five fun minutes. Small steps, big wins!",
  2: "Last week was good fun. This cozy pace is exactly right, so let's keep it rolling!",
  3: "Last week was a smash hit. Try the level-up twists early this week, superstar!",
};

/* ------------------------------------------------------------------ */
/* Quest swapping: next quest in the same domain not used this week    */
/* ------------------------------------------------------------------ */

function nextSwapOption(current: Quest, weekQuestIds: string[]): Quest {
  const list = QUESTS[current.domain];
  const start = list.findIndex((q) => q.id === current.id);
  for (let step = 1; step <= list.length; step++) {
    const candidate = list[(start + step) % list.length];
    if (!weekQuestIds.includes(candidate.id)) return candidate;
  }
  return current; // only one option in domain. Nothing to swap to
}

/* ------------------------------------------------------------------ */
/* Quest row + expandable detail                                       */
/* ------------------------------------------------------------------ */

function QuestRow({
  quest,
  tierFloor,
  level,
  done,
  expanded,
  onToggle,
  onExpand,
  onSwap,
  onLevelUp,
}: {
  quest: Quest;
  tierFloor: QuestLevel;
  level: QuestLevel;
  done: boolean;
  expanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
  onSwap: () => void;
  onLevelUp: () => void;
}) {
  const domain = DOMAIN_INFO[quest.domain];
  const showPro = level >= 2 || tierFloor >= 2;
  const showMaster = level === 3 || tierFloor >= 3;
  const nextLevel = LEVEL_INFO[Math.min(3, level + 1) as QuestLevel];

  return (
    <div className={`rounded-2xl border-2 transition-colors ${expanded ? "border-lagoon/40 bg-cream" : "border-transparent bg-cream/60"}`}>
      <div className="flex items-center gap-2.5 p-3">
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
        <button type="button" onClick={onExpand} className="flex-1 min-w-0 flex items-center gap-2.5 text-left">
          <span className="text-2xl">{quest.emoji}</span>
          <span className="flex-1 min-w-0">
            <span className={`block font-display font-bold text-sm ${done ? "text-deepsea/40 line-through" : "text-deepsea"}`}>
              {quest.title}
              {tierFloor >= 2 && (
                <span className="ml-1.5 text-xs text-berry font-extrabold no-underline">
                  {tierFloor >= 3 ? "MASTER!" : "PRO!"}
                </span>
              )}
            </span>
            <span className="block text-[11px] font-bold text-deepsea/40">
              {domain.emoji} {domain.kidName} · {LEVEL_INFO[level].emoji} {LEVEL_INFO[level].name}
            </span>
          </span>
          <span className={`text-deepsea/40 text-sm transition-transform ${expanded ? "rotate-180" : ""}`}>▾</span>
        </button>
        <button
          type="button"
          onClick={onSwap}
          aria-label={`Swap ${quest.title} for a different quest`}
          title="No equipment? Swap this quest"
          className="shrink-0 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-sm text-deepsea/60 hover:text-deepsea transition-colors"
        >
          🔄
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
                <span className="text-deepsea/40"> · Missing something? Tap 🔄 to swap this quest.</span>
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
              {showPro && (
                <p className="text-xs bg-berry/10 text-deepsea/80 rounded-xl px-3 py-2">
                  <span className="font-extrabold text-berry">🔥 Pro twist:</span> {quest.levelUp}
                </p>
              )}
              {showMaster && (
                <p className="text-xs bg-sunshine/25 text-deepsea/80 rounded-xl px-3 py-2">
                  <span className="font-extrabold text-tangerine">👑 Master twist:</span> {quest.master}
                </p>
              )}
              {quest.timer && <TimerBox timer={quest.timer} />}
              {done && level < 3 && (
                <div className="bg-cream rounded-xl px-3 py-2.5">
                  <button
                    type="button"
                    onClick={onLevelUp}
                    className="w-full bg-gradient-to-r from-berry to-sky text-white rounded-xl py-2 font-display font-bold text-xs shadow-pop hover:brightness-105 transition-all"
                  >
                    Smashed it! Unlock {nextLevel.emoji} {nextLevel.name} ⬆️
                  </button>
                  <p className="text-[10px] text-deepsea/45 text-center mt-1.5">
                    Still practicing? That's perfect too. Level up whenever it feels easy.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Weekly check-in box                                                 */
/* ------------------------------------------------------------------ */

function CheckInBox({
  week,
  guide,
  answer,
  onCheckIn,
}: {
  week: number;
  guide: GuideInfo;
  answer?: Level;
  onCheckIn: (week: number, feeling: Level) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 bg-lagoon/10 border-2 border-lagoon/20 rounded-2xl p-3"
    >
      {answer ? (
        <p className="text-xs text-deepsea/80 leading-snug">
          <span className="font-bold">{guide.emoji} {guide.firstName}:</span>{" "}
          {guide.reactions[answer]}
        </p>
      ) : (
        <>
          <p className="text-xs font-bold text-deepsea mb-2">
            {guide.emoji} {guide.firstName} asks: how did this week feel?
          </p>
          <div className="flex gap-2">
            {CHECK_IN_OPTIONS.map((opt) => (
              <motion.button
                key={opt.value}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => onCheckIn(week, opt.value)}
                className="flex-1 bg-white rounded-xl py-2 px-1 shadow-card text-center hover:ring-2 hover:ring-lagoon/40 transition-all"
              >
                <span className="block text-xl">{opt.emoji}</span>
                <span className="block text-[10px] font-bold text-deepsea/70">{opt.label}</span>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Week card                                                           */
/* ------------------------------------------------------------------ */

function WeekCard({
  week,
  quests,
  tip,
  tipAdapted,
  isCurrent,
  doneCount,
  progress,
  checkIn,
  courageAnswer,
  expandedKey,
  guide,
  questLevels,
  onLevelUp,
  onToggleQuest,
  onSwapQuest,
  onCheckIn,
  onCourageChoice,
  onCourageMission,
  onExpand,
  index,
}: {
  week: PlanWeek;
  quests: { key: string; quest: Quest; tierFloor: QuestLevel }[];
  tip: string;
  tipAdapted: boolean;
  isCurrent: boolean;
  doneCount: number;
  progress: Record<string, boolean>;
  checkIn?: Level;
  courageAnswer: CourageAnswer;
  expandedKey: string | null;
  guide: GuideInfo;
  questLevels: Record<string, QuestLevel>;
  onLevelUp: (questId: string) => void;
  onToggleQuest: (key: string) => void;
  onSwapQuest: (key: string, questId: string) => void;
  onCheckIn: (week: number, feeling: Level) => void;
  onCourageChoice: (week: number, choice: number) => void;
  onCourageMission: (week: number) => void;
  onExpand: (key: string | null) => void;
  index: number;
}) {
  const courageQuest = COURAGE_QUESTS[week.week - 1];
  const courageKey = `courage-w${week.week}`;
  const complete = doneCount === quests.length;
  const weekQuestIds = quests.map((q) => q.quest.id);

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
          <h3 className="font-display font-extrabold text-deepsea leading-tight">
            {week.title} {week.titleEmoji}
          </h3>
          <p className="text-[11px] font-bold text-deepsea/40 uppercase tracking-wide">
            Week {week.week} · {week.phaseEmoji} {week.phase} · {doneCount}/{quests.length} quests
          </p>
        </div>
        {isCurrent && (
          <span className="shrink-0 text-[10px] font-extrabold bg-tangerine text-white rounded-full px-2.5 py-1 uppercase tracking-wide">
            📍 You are here
          </span>
        )}
      </div>

      <p className="flex items-start gap-2 text-xs text-deepsea/60 mb-3 pl-1">
        <span className="text-base leading-none pt-0.5">{guide.emoji}</span>
        <span className="italic">
          {tipAdapted && <span className="not-italic font-bold text-lagoon">Adjusted for you: </span>}
          {tip}
        </span>
      </p>

      <div className="space-y-2">
        {quests.map((pq) => (
          <QuestRow
            key={pq.key}
            quest={pq.quest}
            tierFloor={pq.tierFloor}
            level={questLevels[pq.quest.id] ?? 1}
            done={!!progress[pq.key]}
            expanded={expandedKey === pq.key}
            onToggle={() => onToggleQuest(pq.key)}
            onExpand={() => onExpand(expandedKey === pq.key ? null : pq.key)}
            onSwap={() => {
              const next = nextSwapOption(pq.quest, weekQuestIds);
              if (next.id !== pq.quest.id) onSwapQuest(pq.key, next.id);
            }}
            onLevelUp={() => onLevelUp(pq.quest.id)}
          />
        ))}
        <CourageQuestCard
          quest={courageQuest}
          answer={courageAnswer}
          expanded={expandedKey === courageKey}
          onExpand={() => onExpand(expandedKey === courageKey ? null : courageKey)}
          onChoose={(choice) => onCourageChoice(week.week, choice)}
          onToggleMission={() => onCourageMission(week.week)}
        />
      </div>

      {complete && (
        <CheckInBox week={week.week} guide={guide} answer={checkIn} onCheckIn={onCheckIn} />
      )}
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
  checkIns,
  swaps,
  courage,
  seenBadges,
  questLevels,
  season,
  champion,
  historyQuests,
  onStartGraduation,
  onLevelUp,
  onToggleQuest,
  onSwapQuest,
  onCheckIn,
  onCourageChoice,
  onCourageMission,
  onBadgesSeen,
  onOpenBadges,
  onBack,
}: TrainingPlanProps) {
  const plan = useMemo(() => generatePlan(result, season), [result, season]);
  const seasonInfo = SEASONS[Math.min(3, Math.max(1, season))];
  const readiness = seasonReadiness(season, progress, questLevels);
  const guide = useGuide();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  const name = profile.name.trim() || "Your explorer";
  const mod = MODULES[result.module];

  // Apply parent swaps on top of the generated plan.
  const resolvedWeeks = useMemo(
    () =>
      plan.weeks.map((week) => ({
        week,
        quests: week.quests.map((slot) => {
          const swappedId = swaps[slot.key];
          const swapped = swappedId
            ? QUESTS[slot.quest.domain].find((q) => q.id === swappedId)
            : undefined;
          return { key: slot.key, quest: swapped ?? slot.quest, tierFloor: slot.tierFloor };
        }),
      })),
    [plan, swaps],
  );

  const doneTotal = resolvedWeeks.reduce(
    (sum, w) => sum + w.quests.filter((q) => progress[q.key]).length,
    0,
  );
  const courageDone = COURAGE_QUESTS.filter((q) => courage[q.week]?.missionDone).length;

  // New-badge celebration: show the first earned-but-not-yet-celebrated badge.
  const badges = computeBadges({
    hasResult: true,
    planProgress: progress,
    courage,
    checkIns,
    historyQuests,
  });
  const newBadge = badges.find((b) => b.earned && !seenBadges.includes(b.id));
  useEffect(() => {
    if (!newBadge) return;
    const t = setTimeout(() => onBadgesSeen([newBadge.id]), 3800);
    return () => clearTimeout(t);
  }, [newBadge, onBadgesSeen]);
  const currentWeek =
    resolvedWeeks.find((w) => w.quests.some((q) => !progress[q.key]))?.week.week ?? 12;

  const handleToggle = (key: string, quests: { key: string }[]) => {
    const wasDone = !!progress[key];
    onToggleQuest(key);
    if (!wasDone) {
      const nowDone = quests.filter((q) => progress[q.key] || q.key === key).length;
      if (nowDone === quests.length) {
        setCelebrating(true);
        setTimeout(() => setCelebrating(false), 3500);
      }
    }
  };

  return (
    <Screen brand onBack={onBack}>
      {celebrating && <Confetti count={20} />}

      {/* New-badge toast */}
      <AnimatePresence>
        {newBadge && (
          <motion.button
            type="button"
            onClick={onOpenBadges}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-deepsea text-white rounded-2xl shadow-soft pl-3 pr-4 py-2.5 max-w-[90vw]"
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            >
              {newBadge.emoji}
            </motion.span>
            <span className="text-left">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-sunshine">
                New badge earned!
              </span>
              <span className="block font-display font-bold text-sm">{newBadge.name}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`bg-gradient-to-br ${mod.gradient} rounded-3xl shadow-card p-5 text-white mb-4`}>
        <div className="flex items-center gap-3">
          <Remi size="sm" bounce={false} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              {mod.emoji} {mod.name}
            </p>
            <h2 className="font-display font-extrabold text-2xl leading-tight">
              {name}'s {seasonInfo.name}
            </h2>
            <p className="text-xs font-bold mt-0.5 opacity-90">
              {seasonInfo.emoji} {seasonInfo.blurb} · {trainerLevelFor(questLevels).emoji}{" "}
              {trainerLevelFor(questLevels).name}
            </p>
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
          games to shine in, {DOMAIN_INFO[result.growthDomain].kidName} games to grow with. And
          level-up twists waiting in weeks 9–12!
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs font-bold">
            💜 Courage Curve: {courageDone} of 12 courage quests
          </span>
          <button
            type="button"
            onClick={onOpenBadges}
            className="shrink-0 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 text-xs font-bold transition-colors"
          >
            🏅 Sticker Book ({badges.filter((b) => b.earned).length})
          </button>
        </div>
      </div>

      {/* The Courage Curve. The leadership learning path */}
      <div className="bg-white/90 rounded-3xl shadow-card p-4 mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-berry mb-2">
          💜 The Courage Curve
        </p>
        <p className="text-xs text-deepsea/60 mb-3 leading-snug">
          Alongside the movement quests, one Courage Quest a week grows {name}'s
          confidence step by step. From knowing themselves, to standing strong
          around unkindness, to lifting others as a leader.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {COURAGE_STAGES.map((stage) => (
            <div key={stage.name} className="bg-cream rounded-2xl p-2.5 text-center">
              <div className="text-xl">{stage.emoji}</div>
              <div className="font-display font-bold text-[11px] text-deepsea leading-tight">{stage.name}</div>
              <div className="text-[10px] font-bold text-deepsea/40">{stage.weeks}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Graduation gate */}
      <div className="bg-white/90 rounded-3xl shadow-card p-4 mb-4">
        {champion ? (
          <div className="text-center">
            <p className="text-3xl mb-1">👑🎇</p>
            <p className="font-display font-extrabold text-deepsea">CoachUp Champion!</p>
            <p className="text-xs text-deepsea/60">
              Every season conquered. Keep playing favorites, beating personal bests and
              exploring real-world sports.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-tangerine">
                🎓 Graduation Adventure
              </p>
              <span className="text-[10px] font-extrabold bg-cream rounded-full px-2.5 py-1 text-deepsea/60 uppercase">
                → {seasonInfo.next}
              </span>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-deepsea/70">
                <span className={readiness.questsDone >= readiness.questsNeeded ? "" : "opacity-60"}>
                  {readiness.questsDone >= readiness.questsNeeded ? "✅" : "⬜"}
                </span>
                Play {readiness.questsNeeded} quests this season ({readiness.questsDone}/{readiness.questsNeeded})
              </div>
              <div className="flex items-center gap-2 text-xs text-deepsea/70">
                <span className={readiness.leveled >= readiness.leveledNeeded ? "" : "opacity-60"}>
                  {readiness.leveled >= readiness.leveledNeeded ? "✅" : "⬜"}
                </span>
                Smash {readiness.leveledNeeded} quests to {readiness.levelName} ({readiness.leveled}/{readiness.leveledNeeded})
              </div>
              <div className="flex items-center gap-2 text-xs text-deepsea/70">
                <span className="opacity-60">🎓</span>
                Then replay the 3 Discovery games. Compared only to {name}'s own past marks
              </div>
            </div>
            {readiness.eligible ? (
              <button
                type="button"
                onClick={onStartGraduation}
                className="w-full bg-gradient-to-r from-tangerine to-coral text-white rounded-2xl py-2.5 font-display font-bold text-sm shadow-pop hover:brightness-105 transition-all"
              >
                Begin the Graduation Adventure! 🎓
              </button>
            ) : (
              <p className="text-[11px] text-deepsea/45 text-center">
                Keep questing. The Graduation Adventure unlocks when both boxes are ticked. No
                rush, no pressure. 💛
              </p>
            )}
          </>
        )}
      </div>

      {/* Journey */}
      <div className="space-y-4 pb-8">
        {resolvedWeeks.map(({ week, quests }, i) => {
          const prevFeeling = checkIns[week.week - 1];
          return (
            <WeekCard
              key={week.week}
              week={week}
              quests={quests}
              tip={prevFeeling ? ADAPTIVE_TIPS[prevFeeling] : week.remiTip}
              tipAdapted={!!prevFeeling}
              index={i}
              isCurrent={week.week === currentWeek}
              doneCount={quests.filter((q) => progress[q.key]).length}
              progress={progress}
              checkIn={checkIns[week.week]}
              courageAnswer={courage[week.week] ?? {}}
              expandedKey={expandedKey}
              guide={guide}
              questLevels={questLevels}
              onLevelUp={onLevelUp}
              onToggleQuest={(key) => handleToggle(key, quests)}
              onSwapQuest={onSwapQuest}
              onCheckIn={onCheckIn}
              onCourageChoice={onCourageChoice}
              onCourageMission={onCourageMission}
              onExpand={setExpandedKey}
            />
          );
        })}

        <div className="text-center py-4">
          {doneTotal === plan.totalQuests ? (
            <p className="font-display font-extrabold text-xl text-deepsea">
              🎪 The Grand Festival is complete. What an adventure, {name}! 🏆
            </p>
          ) : (
            <p className="text-sm text-deepsea/50">
              {guide.emoji} {guide.firstName} says: any quest, any order. Every adventure counts!
            </p>
          )}
        </div>
      </div>
    </Screen>
  );
}
