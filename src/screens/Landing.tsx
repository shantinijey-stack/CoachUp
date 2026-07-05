import { motion } from "framer-motion";
import Button from "../components/Button";
import { AnimatedBrandMark } from "../components/BrandLogo";
import Screen from "../components/Screen";

interface LandingProps {
  onStart: () => void;
  hasSavedRun: boolean;
  onResume: () => void;
}

/**
 * Parent-facing landing page. The guides (Remi & friends) belong to the
 * child's journey and first appear after Quick Start. The front door
 * speaks to parents: warm, sporty, trustworthy, no cartoon mascot.
 */

const READINESS = ["Physical", "Emotional", "Social", "Mental"];

const VALUE_POINTS = [
  {
    title: "Discover their movement spark",
    body: "See how your child naturally loves to move. Running and agility, coordination with balls, balance and body control. Through play, not testing.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l2 5.5L19.5 9 14 11l-2 5.5L10 11 4.5 9 10 7.5 12 2z" fill="#FF9351" />
        <circle cx="18.5" cy="18" r="3.5" fill="#2EC4B6" />
      </svg>
    ),
  },
  {
    title: "Build emotional readiness",
    body: "Understand their comfort style, confidence needs and social sweet spot. So new activities feel safe and exciting instead of overwhelming.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 20s-7-4.3-7-9.5C5 7.5 7 6 9.2 6c1.2 0 2.2.5 2.8 1.4C12.6 6.5 13.6 6 14.8 6 17 6 19 7.5 19 10.5 19 15.7 12 20 12 20z"
          fill="#FF6B6B"
        />
        <path d="M8.5 11h2l1-2 1.5 4 1-2h1.5" stroke="#FFF9F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Give coaches better starting notes",
    body: "Practical guidance on pace, welcome style and group format. So their very first session is shaped around who they are.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="4" width="14" height="17" rx="3" fill="#4CC9F0" />
        <rect x="8.5" y="2.5" width="7" height="4" rx="1.5" fill="#1B4965" />
        <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" stroke="#FFF9F0" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Landing({ onStart, hasSavedRun, onResume }: LandingProps) {
  const scrollToHow = () =>
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });

  return (
    <Screen>
      {/* Hero */}
      <div className="min-h-[88dvh] flex flex-col items-center justify-center text-center gap-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <AnimatedBrandMark size={84} />
          <span className="font-display font-extrabold text-2xl text-deepsea leading-none">
            CoachUp <span className="text-tangerine">Kids</span>
          </span>
        </motion.div>

        <div className="space-y-4 max-w-sm">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display font-extrabold text-4xl leading-tight text-balance text-deepsea"
          >
            Bring your child's{" "}
            <span className="bg-gradient-to-r from-tangerine to-coral bg-clip-text text-transparent">
              sportiness to light
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-deepsea/70 text-lg leading-relaxed"
          >
            Through fun games and activities, discover your child's physical,
            emotional and social strengths before choosing a sport.
          </motion.p>
        </div>

        {/* Readiness in every dimension */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-1.5"
        >
          <span className="text-xs font-bold text-deepsea/40 self-center mr-1">Ready in every way:</span>
          {READINESS.map((r) => (
            <span
              key={r}
              className="text-xs font-bold text-deepsea/70 bg-white rounded-full px-3 py-1 shadow-card"
            >
              {r}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm space-y-3 pt-2"
        >
          <Button full onClick={onStart}>
            Start Discovery Day
          </Button>
          <Button full variant="secondary" onClick={scrollToHow}>
            See how it works
          </Button>
          {hasSavedRun && (
            <button
              type="button"
              onClick={onResume}
              className="w-full text-sm font-bold text-deepsea/50 hover:text-deepsea transition-colors py-1"
            >
              Continue where we left off →
            </button>
          )}
        </motion.div>
      </div>

      {/* How it works / value points */}
      <div id="how-it-works" className="max-w-sm mx-auto w-full space-y-4 pb-4 scroll-mt-6">
        <div className="text-center space-y-2 pt-2">
          <h2 className="font-display font-extrabold text-2xl text-deepsea">
            How Discovery Day helps
          </h2>
          <p className="text-sm text-deepsea/60 leading-relaxed">
            In a few gentle activities, CoachUp Kids reveals your child's movement
            strengths, comfort style, confidence needs, and coaching approach. So
            their first steps into sport feel positive, prepared, and fun.
          </p>
        </div>

        {VALUE_POINTS.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + 0.08 * i, duration: 0.4 }}
            className="flex items-start gap-4 bg-white rounded-3xl shadow-card p-5"
          >
            <span className="shrink-0 w-11 h-11 rounded-2xl bg-cream flex items-center justify-center">
              {v.icon}
            </span>
            <span>
              <span className="block font-display font-bold text-deepsea mb-0.5">{v.title}</span>
              <span className="block text-sm text-deepsea/65 leading-relaxed">{v.body}</span>
            </span>
          </motion.div>
        ))}

        {/* Reassurance */}
        <div className="text-center space-y-4 pt-2 pb-10">
          <p className="text-sm font-bold text-deepsea/70 bg-lagoon/10 border border-lagoon/20 rounded-2xl px-4 py-3">
            No rankings. No pressure. Just a clearer way to help your child enjoy sport.
          </p>
          <Button full onClick={onStart}>
            Start Discovery Day
          </Button>
          <p className="text-xs text-deepsea/40">
            About 10 minutes, together with your child. Not a talent test. A head start.
          </p>
        </div>
      </div>
    </Screen>
  );
}
