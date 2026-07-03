import { motion } from "framer-motion";
import Button from "../components/Button";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import SpeechBubble from "../components/SpeechBubble";

interface MeetRemiProps {
  childName: string;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

export default function MeetRemi({ childName, onNext, onBack, progress }: MeetRemiProps) {
  const name = childName.trim() || "friend";
  return (
    <Screen
      progress={progress}
      onBack={onBack}
      footer={
        <Button full onClick={onNext}>
          Let's go, Remi! 🎒
        </Button>
      }
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <Remi size="xl" mood="excited" />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold text-3xl text-deepsea"
        >
          Hi! I'm Remi! 👋
        </motion.h2>

        <div className="space-y-3 w-full max-w-sm text-left">
          <SpeechBubble>
            <strong>{name}</strong>, today is <strong>Discovery Day</strong> — my
            favorite day of the whole year! 🎈
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
