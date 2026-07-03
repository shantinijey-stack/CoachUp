import { motion } from "framer-motion";
import Button from "../components/Button";
import Remi from "../components/Remi";
import Screen from "../components/Screen";

interface LandingProps {
  onStart: () => void;
  hasSavedRun: boolean;
  onResume: () => void;
}

const FEATURES = [
  { emoji: "🗺️", label: "A 10-minute adventure, not a test" },
  { emoji: "🧬", label: "Get your child's CoachUp DNA™ report" },
  { emoji: "💛", label: "Discover their unique movement spark" },
];

export default function Landing({ onStart, hasSavedRun, onResume }: LandingProps) {
  return (
    <Screen>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        {/* Logo placeholder */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-display font-extrabold text-2xl text-deepsea"
        >
          <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-tangerine to-coral flex items-center justify-center text-white text-xl shadow-pop">
            C
          </span>
          CoachUp <span className="text-tangerine">Kids</span>
        </motion.div>

        <Remi size="xl" mood="excited" />

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display font-extrabold text-4xl leading-tight text-balance text-deepsea"
          >
            Discover how your child{" "}
            <span className="bg-gradient-to-r from-tangerine to-coral bg-clip-text text-transparent">
              loves to move
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-deepsea/60 text-lg"
          >
            Join Remi the Otter on Discovery Day — a playful adventure that
            reveals your child's movement superpowers.
          </motion.p>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="space-y-2 text-left w-full max-w-xs"
        >
          {FEATURES.map((f) => (
            <li key={f.label} className="flex items-center gap-3 bg-white/70 rounded-2xl px-4 py-2.5 shadow-card">
              <span className="text-xl">{f.emoji}</span>
              <span className="text-sm font-semibold text-deepsea/80">{f.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="space-y-3 pb-8">
        <Button full onClick={onStart}>
          Start Discovery Day 🚀
        </Button>
        {hasSavedRun && (
          <Button full variant="secondary" onClick={onResume}>
            Continue where we left off
          </Button>
        )}
      </div>
    </Screen>
  );
}
