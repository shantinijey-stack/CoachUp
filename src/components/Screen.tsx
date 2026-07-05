import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BrandMark } from "./BrandLogo";
import ProgressBar from "./ProgressBar";

interface ScreenProps {
  children: ReactNode;
  /** 0–1 progress through the whole adventure; hidden when undefined. */
  progress?: number;
  onBack?: () => void;
  footer?: ReactNode;
  /** Show the small brand mark at the right of the header row. */
  brand?: boolean;
}

/**
 * Shared mobile-first screen shell: centered column, optional progress
 * bar + back button header, sticky footer for Next CTAs.
 */
export default function Screen({ children, progress, onBack, footer, brand }: ScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-dvh flex flex-col max-w-md mx-auto w-full px-5"
    >
      {(progress !== undefined || onBack || brand) && (
        <header className="flex items-center gap-3 pt-5 pb-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 shrink-0 rounded-full bg-white shadow-card flex items-center justify-center text-deepsea font-bold hover:bg-cream transition-colors"
            >
              ←
            </button>
          )}
          {progress !== undefined ? <ProgressBar progress={progress} /> : <div className="flex-1" />}
          {brand && <BrandMark size={30} />}
        </header>
      )}
      <main className="flex-1 flex flex-col py-4">{children}</main>
      {footer && <footer className="sticky bottom-0 pb-6 pt-3 bg-gradient-to-t from-cream via-cream/90 to-transparent">{footer}</footer>}
    </motion.div>
  );
}
