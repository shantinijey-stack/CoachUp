import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Remi's storybook speech bubble. */
export default function SpeechBubble({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative bg-white rounded-3xl rounded-bl-md shadow-card px-5 py-4 text-deepsea/90 leading-relaxed"
    >
      {children}
    </motion.div>
  );
}
