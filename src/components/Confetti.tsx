import { motion } from "framer-motion";
import { useMemo } from "react";

const EMOJIS = ["🎉", "⭐", "✨", "🎈", "🌟", "💫", "🎊", "🏅"];

/** Lightweight emoji confetti burst rendered with Framer Motion. */
export default function Confetti({ count = 24 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        x: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.5 + Math.random() * 2,
        size: 16 + Math.random() * 20,
        drift: (Math.random() - 0.5) * 40,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, fontSize: p.size }}
          initial={{ y: -60, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: p.drift,
            opacity: [0, 1, 1, 0.6],
            rotate: 360,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
