import { motion } from "framer-motion";
import { useGuide } from "./GuideContext";

interface RemiProps {
  size?: "sm" | "md" | "lg" | "xl";
  mood?: "happy" | "excited" | "proud";
  bounce?: boolean;
}

const SIZES = {
  sm: "text-4xl w-14 h-14",
  md: "text-5xl w-20 h-20",
  lg: "text-7xl w-28 h-28",
  xl: "text-8xl w-36 h-36",
};

/**
 * The child's adventure guide avatar (Remi the Otter by default. * the component keeps the mascot's name, but renders whichever guide
 * the child chose). Emoji inside a soft gradient badge, placeholder
 * for real illustration in a later phase.
 */
export default function Remi({ size = "md", mood = "happy", bounce = true }: RemiProps) {
  const guide = useGuide();
  const sparkle = mood === "excited" ? "✨" : mood === "proud" ? "🎉" : null;
  return (
    <motion.div
      animate={bounce ? { y: [0, -8, 0] } : undefined}
      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      className="relative inline-flex"
    >
      <div
        className={`${SIZES[size]} rounded-full bg-gradient-to-br from-sunshine/60 to-lagoon/40 flex items-center justify-center shadow-soft`}
      >
        <span role="img" aria-label={guide.name}>{guide.emoji}</span>
      </div>
      {sparkle && (
        <motion.span
          className="absolute -top-1 -right-2 text-2xl"
          animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          {sparkle}
        </motion.span>
      )}
    </motion.div>
  );
}
