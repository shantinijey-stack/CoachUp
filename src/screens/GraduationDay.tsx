import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button";
import Confetti from "../components/Confetti";
import { useGuide } from "../components/GuideContext";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import SpeechBubble from "../components/SpeechBubble";
import { DOMAIN_INFO, LEVEL_LABELS, MOVEMENT_ACTIVITIES } from "../data/content";
import { compareGraduation, SEASONS } from "../lib/graduation";
import type { AgeBand, ChildProfile, Domain, Level } from "../types";
import QuestQuestion from "./QuestQuestion";

interface GraduationDayProps {
  profile: ChildProfile;
  season: number;
  /** The child's own previous marks: last graduation, or Discovery Day. */
  baseline: Record<Domain, Level>;
  onGraduate: (movement: Record<Domain, Level>) => void;
  onBack: () => void;
}

type Step = "intro" | 0 | 1 | 2 | "verdict";

const TREND_COPY = {
  grew: { emoji: "⬆️", label: "Grew!" },
  held: { emoji: "➡️", label: "Held strong" },
  warming: { emoji: "🌱", label: "Still warming up today" },
} as const;

export default function GraduationDay({
  profile,
  season,
  baseline,
  onGraduate,
  onBack,
}: GraduationDayProps) {
  const guide = useGuide();
  const name = profile.name.trim() || "Explorer";
  const ageBand: AgeBand = profile.age <= 6 ? "4-6" : "7-12";
  const activities = MOVEMENT_ACTIVITIES[ageBand];
  const seasonInfo = SEASONS[season];

  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Partial<Record<Domain, Level>>>({});

  /* ------------------------------ intro ------------------------------ */
  if (step === "intro") {
    return (
      <Screen
        onBack={onBack}
        footer={
          <Button full onClick={() => setStep(0)}>
            Start the Graduation Adventure 🎓
          </Button>
        }
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
          <Remi size="xl" mood="excited" />
          <h2 className="font-display font-extrabold text-3xl text-deepsea">
            Graduation Adventure!
          </h2>
          <div className="space-y-3 w-full max-w-sm text-left">
            <SpeechBubble>
              <strong>{name}</strong>, you've trained hard all through{" "}
              <strong>{seasonInfo.name}</strong> {seasonInfo.emoji}. Today we play the three
              Discovery games one more time!
            </SpeechBubble>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <SpeechBubble>
                This is <strong>not a test</strong>. It's a mirror. We're only comparing you
                to <strong>you</strong>, to see how much you've grown. 💛
              </SpeechBubble>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <SpeechBubble>
                And whatever happens today, we celebrate. Ready, adventurer?
              </SpeechBubble>
            </motion.div>
          </div>
        </div>
      </Screen>
    );
  }

  /* --------------------------- the 3 games --------------------------- */
  if (step !== "verdict") {
    const activity = activities[step];
    const selected = answers[activity.domain];
    return (
      <QuestQuestion
        chapterLabel={`Graduation Adventure · ${step + 1} of 3`}
        emoji={activity.emoji}
        title={activity.title}
        scene={activity.scene}
        question={activity.question}
        options={activity.options.map((o) => ({
          id: String(o.level),
          emoji: o.emoji,
          label: o.label,
          description: o.description,
        }))}
        selectedId={selected !== undefined ? String(selected) : undefined}
        onSelect={(id) =>
          setAnswers((a) => ({ ...a, [activity.domain]: Number(id) as Level }))
        }
        onNext={() => setStep(step === 2 ? "verdict" : ((step + 1) as Step))}
        onBack={() => setStep(step === 0 ? "intro" : ((step - 1) as Step))}
        progress={(step + 1) / 3}
      />
    );
  }

  /* ----------------------------- verdict ----------------------------- */
  const finalAnswers: Record<Domain, Level> = {
    locomotor: answers.locomotor ?? 1,
    objectControl: answers.objectControl ?? 1,
    stability: answers.stability ?? 1,
  };
  const { comparisons, passed } = compareGraduation(baseline, finalAnswers);

  return (
    <Screen
      onBack={() => setStep(2)}
      footer={
        passed ? (
          <Button full onClick={() => onGraduate(finalAnswers)}>
            {season >= 3 ? "Become a CoachUp Champion! 👑" : `Start ${seasonInfo.next}! 🚀`}
          </Button>
        ) : (
          <Button full onClick={onBack}>
            Back to the adventure 💛
          </Button>
        )
      }
    >
      {passed && <Confetti />}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
        <Remi size="lg" mood={passed ? "proud" : "happy"} />
        <h2 className="font-display font-extrabold text-3xl text-deepsea text-balance">
          {passed ? guide.cheer : "What a brave adventure!"}
        </h2>

        {/* Growth comparison. Always vs their own past self */}
        <div className="w-full max-w-sm bg-white/90 rounded-3xl shadow-card p-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-tangerine">
            Then → Now
          </p>
          {comparisons.map((c, i) => {
            const info = DOMAIN_INFO[c.domain];
            const trend = TREND_COPY[c.trend];
            return (
              <motion.div
                key={c.domain}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * i }}
                className="flex items-center gap-3 bg-cream rounded-2xl p-3 text-left"
              >
                <span className="text-2xl">{info.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-deepsea">{info.kidName}</p>
                  <p className="text-xs text-deepsea/60">
                    {LEVEL_LABELS[c.before]} → <strong>{LEVEL_LABELS[c.after]}</strong>
                  </p>
                </div>
                <span className="shrink-0 text-xs font-bold text-deepsea/70">
                  {trend.emoji} {trend.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-deepsea/60 max-w-xs">
          {passed
            ? season >= 3
              ? `${name} has completed every season. The whole mountain, top to bottom. The Champion's Growth Report awaits!`
              : `${seasonInfo.next} is unlocked: same adventures, ${season === 1 ? "Pro" : "Master"} twists, new week quests. Let's grow!`
            : `Today was a warming-up day. And that's part of every athlete's story. Take a Victory Lap: replay favorite quests, and come back to graduate whenever you're ready. The door never closes. 💛`}
        </p>
      </div>
    </Screen>
  );
}
