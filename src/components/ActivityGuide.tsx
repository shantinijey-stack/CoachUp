import { motion } from "framer-motion";
import type { MovementActivity } from "../data/content";

/**
 * Small looping emoji animation showing parents roughly what the
 * activity looks like (placeholder for real illustrations/video in
 * a later phase).
 */
function Demo({ kind }: { kind: MovementActivity["demo"] }) {
  const strip = "relative h-20 rounded-2xl bg-gradient-to-r from-sky/15 to-meadow/25 overflow-hidden mb-3";

  switch (kind) {
    case "hop":
      return (
        <div className={strip} aria-hidden>
          <div className="absolute bottom-2 left-0 right-0 flex justify-around text-xl">
            <span>🟢</span><span>🟢</span><span>🟢</span><span>🟢</span>
          </div>
          <motion.span
            className="absolute bottom-6 text-3xl"
            animate={{ left: ["5%", "30%", "55%", "80%"], y: [0, -22, 0, -22, 0, -22, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", repeatDelay: 0.6 }}
          >
            🐰
          </motion.span>
        </div>
      );
    case "roll":
      return (
        <div className={strip} aria-hidden>
          <span className="absolute bottom-4 left-3 text-3xl">🧒</span>
          <span className="absolute bottom-4 right-3 text-3xl">🦦</span>
          <motion.span
            className="absolute bottom-3 text-2xl"
            animate={{ left: ["18%", "72%", "18%"], rotate: [0, 360, 720] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            ⚽
          </motion.span>
        </div>
      );
    case "flamingo":
      return (
        <div className={strip} aria-hidden>
          <motion.span
            className="absolute bottom-3 left-1/2 -translate-x-1/2 text-4xl origin-bottom"
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            🦩
          </motion.span>
          <motion.span
            className="absolute top-2 right-6 text-lg"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            ✨
          </motion.span>
        </div>
      );
    case "zigzag":
      return (
        <div className={strip} aria-hidden>
          <div className="absolute bottom-2 left-0 right-0 flex justify-around text-lg">
            <span>🔸</span><span>🔸</span><span>🔸</span><span>🔸</span>
          </div>
          <motion.span
            className="absolute text-3xl"
            animate={{ left: ["4%", "28%", "52%", "76%"], top: ["15%", "45%", "15%", "45%"] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", repeatDelay: 0.5 }}
          >
            🏃
          </motion.span>
        </div>
      );
    case "wallball":
      return (
        <div className={strip} aria-hidden>
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-deepsea/15 rounded-r-2xl" />
          <span className="absolute bottom-3 left-4 text-3xl">🧒</span>
          <motion.span
            className="absolute text-2xl"
            animate={{ left: ["18%", "82%", "18%"], top: ["30%", "38%", "30%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            🎾
          </motion.span>
        </div>
      );
    case "hold":
      return (
        <div className={strip} aria-hidden>
          <motion.span
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-4xl"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            🦸
          </motion.span>
          <motion.span
            className="absolute top-2 left-8 text-lg"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            💫
          </motion.span>
          <motion.span
            className="absolute top-3 right-8 text-lg"
            animate={{ opacity: [1, 0.2, 1], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            ⭐
          </motion.span>
        </div>
      );
  }
}

/** "How to play" card: animated demo, what you need, and 3 visual steps. */
export default function ActivityGuide({ activity }: { activity: MovementActivity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-white/90 rounded-3xl shadow-card p-4 mb-4"
    >
      <Demo kind={activity.demo} />
      <p className="text-xs font-bold uppercase tracking-widest text-lagoon mb-1">
        How to play
      </p>
      <p className="text-xs text-deepsea/60 mb-3">
        <span className="font-bold text-deepsea/80">You'll need:</span> {activity.youllNeed}
      </p>
      <ol className="space-y-2">
        {activity.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="shrink-0 w-8 h-8 rounded-xl bg-cream flex items-center justify-center text-lg">
              {step.emoji}
            </span>
            <span className="text-sm text-deepsea/80 leading-snug pt-1">
              <span className="font-bold text-tangerine mr-1">{i + 1}.</span>
              {step.text}
            </span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}
