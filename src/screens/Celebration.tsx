import { motion } from "framer-motion";
import Button from "../components/Button";
import Confetti from "../components/Confetti";
import { useGuide } from "../components/GuideContext";
import Remi from "../components/Remi";
import Screen from "../components/Screen";

interface CelebrationProps {
  childName: string;
  onNext: () => void;
}

export default function Celebration({ childName, onNext }: CelebrationProps) {
  const name = childName.trim() || "Explorer";
  const guide = useGuide();
  return (
    <Screen>
      <Confetti />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <Remi size="xl" mood="proud" />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="space-y-3"
        >
          <h2 className="font-display font-extrabold text-4xl text-deepsea">
            You did it, {name}! 🏅
          </h2>
          <p className="text-lg text-deepsea/70 max-w-xs mx-auto">
            Discovery Day complete! {guide.firstName} is putting the final
            sparkles on your very own <strong>CoachUp DNA™</strong> report…
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 text-3xl"
          aria-hidden
        >
          {["🧬", "✨", "📜", "✨", "🦦"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="pb-8">
        <Button full onClick={onNext}>
          Reveal the DNA report 🧬
        </Button>
      </div>
    </Screen>
  );
}
