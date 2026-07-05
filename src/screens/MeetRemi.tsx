import { motion } from "framer-motion";
import Button from "../components/Button";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import SpeechBubble from "../components/SpeechBubble";
import { getGuide, GUIDES } from "../data/guides";

interface MeetRemiProps {
  childName: string;
  guideId: string;
  onSelectGuide: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

export default function MeetRemi({
  childName,
  guideId,
  onSelectGuide,
  onNext,
  onBack,
  progress,
}: MeetRemiProps) {
  const name = childName.trim() || "friend";
  const guide = getGuide(guideId);

  return (
    <Screen
      progress={progress}
      onBack={onBack}
      footer={
        <Button full onClick={onNext}>
          Let's go, {guide.firstName}! 🎒
        </Button>
      }
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center py-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-deepsea mb-1">
            Choose your adventure guide!
          </h2>
          <p className="text-sm text-deepsea/50">Who will explore with you today?</p>
        </div>

        {/* Guide picker */}
        <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
          {GUIDES.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              onClick={() => onSelectGuide(g.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.92 }}
              aria-pressed={guideId === g.id}
              className={`rounded-2xl p-2.5 border-2 transition-all ${
                guideId === g.id
                  ? "bg-gradient-to-b from-sunshine/30 to-lagoon/20 border-lagoon shadow-soft"
                  : "bg-white border-transparent shadow-card hover:border-lagoon/30"
              }`}
            >
              <span className="block text-3xl mb-1">{g.emoji}</span>
              <span className="block font-display font-bold text-xs text-deepsea leading-tight">
                {g.firstName}
              </span>
            </motion.button>
          ))}
        </div>

        <Remi size="lg" mood="excited" />

        <div className="space-y-3 w-full max-w-sm text-left" key={guideId}>
          <SpeechBubble>
            Hi <strong>{name}</strong>! I'm <strong>{guide.firstName}</strong> —{" "}
            {guide.vibe}! Today is <strong>Discovery Day</strong>, my favorite
            day of the whole year! 🎈
          </SpeechBubble>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <SpeechBubble>
              This is <strong>not a test</strong>. There are no wrong answers, no
              scores to beat, and nothing to worry about. 💛
            </SpeechBubble>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <SpeechBubble>
              We're going on an adventure to discover your{" "}
              <strong>movement spark</strong> ✨ — the special way{" "}
              <em>you</em> love to move, play and shine!
            </SpeechBubble>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm text-deepsea/50 max-w-xs"
        >
          Grown-ups: play each mini-adventure together, then tap what you
          noticed. Every answer is a great answer.
        </motion.p>
      </div>
    </Screen>
  );
}
