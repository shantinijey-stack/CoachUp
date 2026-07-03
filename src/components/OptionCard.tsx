import { motion } from "framer-motion";

interface OptionCardProps {
  emoji: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  index?: number;
}

/** A tappable answer card used across all quest questions. */
export default function OptionCard({
  emoji,
  label,
  description,
  selected,
  onSelect,
  index = 0,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
      className={`
        w-full text-left flex items-center gap-4 rounded-3xl p-4 border-2 transition-all
        ${
          selected
            ? "bg-gradient-to-r from-sunshine/30 to-lagoon/20 border-lagoon shadow-soft"
            : "bg-white border-transparent shadow-card hover:border-lagoon/30"
        }
      `}
      aria-pressed={selected}
    >
      <span className="text-3xl shrink-0 w-12 h-12 rounded-2xl bg-cream flex items-center justify-center">
        {emoji}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-display font-bold text-deepsea">{label}</span>
        {description && (
          <span className="block text-sm text-deepsea/60 leading-snug">{description}</span>
        )}
      </span>
      <span
        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-colors ${
          selected ? "bg-lagoon border-lagoon text-white" : "border-deepsea/20 text-transparent"
        }`}
      >
        ✓
      </span>
    </motion.button>
  );
}
