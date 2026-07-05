import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Confetti from "../components/Confetti";
import Screen from "../components/Screen";
import { DOMAIN_INFO, MODULES, PARENT_GOALS } from "../data/content";
import { COMFORT_COPY } from "../lib/scoring";
import type { ChildProfile, DnaResult } from "../types";

interface DashboardProps {
  profile: ChildProfile;
  result: DnaResult;
  planDoneCount: number;
  onViewReport: () => void;
  onOpenPlan: () => void;
  onOpenBadges: () => void;
  onOpenGrowth: () => void;
  onRestart: () => void;
}

export default function Dashboard({
  profile,
  result,
  planDoneCount,
  onViewReport,
  onOpenPlan,
  onOpenBadges,
  onOpenGrowth,
  onRestart,
}: DashboardProps) {
  const [booked, setBooked] = useState(false);
  const name = profile.name.trim() || "Your explorer";
  const mod = MODULES[result.module];
  const growth = DOMAIN_INFO[result.growthDomain];
  const strength = DOMAIN_INFO[result.strengthDomain];
  const comfort = COMFORT_COPY[result.comfortStyle];
  const goal = PARENT_GOALS.find((g) => g.id === profile.parentGoal);

  return (
    <Screen>
      {booked && <Confetti count={18} />}
      <header className="flex items-center justify-between pt-5 pb-4">
        <div className="flex items-center gap-2 font-display font-extrabold text-lg text-deepsea">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-tangerine to-coral flex items-center justify-center text-white shadow-pop">
            C
          </span>
          CoachUp <span className="text-tangerine">Kids</span>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="text-xs font-bold text-deepsea/40 hover:text-deepsea transition-colors"
        >
          Start over ↺
        </button>
      </header>

      <div className="space-y-4 pb-8">
        {/* Child profile card */}
        <Card className="!p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-deepsea to-lagoon p-5 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                {profile.age <= 6 ? "🧒" : "🧑"}
              </div>
              <div>
                <h2 className="font-display font-extrabold text-2xl">{name}</h2>
                <p className="text-sm opacity-80">
                  Age {profile.age} · {strength.kidName} {strength.emoji}
                </p>
              </div>
            </div>
            {goal && (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-bold">
                Family goal: {goal.emoji} {goal.label}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onViewReport}
            className="w-full p-3 text-sm font-bold text-lagoon hover:bg-lagoon/5 transition-colors"
          >
            View full CoachUp DNA™ report 🧬
          </button>
        </Card>

        {/* Recommended module + weekly journey */}
        <Card delay={0.1} className="!p-0 overflow-hidden">
          <div className={`bg-gradient-to-br ${mod.gradient} p-5 text-white`}>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
              12-week adventure
            </p>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{mod.emoji}</span>
              <div>
                <h3 className="font-display font-extrabold text-xl leading-tight">{mod.name}</h3>
                <p className="text-sm opacity-90">{mod.tagline}</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-3">
            <h4 className="font-display font-bold text-deepsea text-sm">The journey ahead 🛤️</h4>
            {mod.weeks.map((w, i) => (
              <motion.div
                key={w.phase}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 bg-cream rounded-2xl p-3"
              >
                <span className="text-2xl">{w.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-deepsea text-sm">{w.phase}</span>
                    <span className="text-[11px] font-bold text-deepsea/40">{w.weeks}</span>
                  </div>
                  <p className="text-xs text-deepsea/60 leading-snug">{w.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Training plan entry */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            type="button"
            onClick={onOpenPlan}
            className="w-full bg-gradient-to-r from-tangerine to-coral text-white rounded-3xl shadow-card p-5 text-left flex items-center gap-4 hover:brightness-105 transition-all active:scale-[0.98]"
          >
            <span className="text-4xl">🗺️</span>
            <span className="flex-1 min-w-0">
              <span className="block font-display font-extrabold text-lg leading-tight">
                {planDoneCount > 0 ? "Continue the adventure plan" : "Start the 12-week adventure plan"}
              </span>
              <span className="block text-sm opacity-90">
                {planDoneCount > 0
                  ? `${planDoneCount} of 36 quests complete — keep going!`
                  : "3 home quests a week, made just for " + (name === "Your explorer" ? "your explorer" : name)}
              </span>
            </span>
            <span className="text-2xl">→</span>
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onOpenBadges}
              className="bg-white rounded-2xl shadow-card p-3 text-sm font-bold text-berry hover:bg-berry/5 transition-colors"
            >
              🏅 Sticker Book
            </button>
            <button
              type="button"
              onClick={onOpenGrowth}
              className="bg-white rounded-2xl shadow-card p-3 text-sm font-bold text-lagoon hover:bg-lagoon/5 transition-colors"
            >
              📈 Growth Report
            </button>
          </div>
        </motion.div>

        {/* Growth quest */}
        <Card delay={0.2}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">🗺️</span>
            <div>
              <h3 className="font-display font-bold text-deepsea">
                Growth quest: {growth.kidName}
              </h3>
              <p className="text-sm text-deepsea/70 leading-relaxed">
                {growth.name} skills are {name}'s next exciting frontier. Coaches
                will tuck playful {growth.name.toLowerCase()} practice into
                favorite games — small wins, big celebrations.
              </p>
            </div>
          </div>
        </Card>

        {/* Comfort notes */}
        <Card delay={0.25}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{comfort.emoji}</span>
            <div>
              <h3 className="font-display font-bold text-deepsea">
                Comfort style: {comfort.label}
              </h3>
              <p className="text-sm text-deepsea/70 leading-relaxed">{comfort.note}</p>
            </div>
          </div>
        </Card>

        {/* Coach notes */}
        <Card delay={0.3}>
          <h3 className="font-display font-bold text-deepsea mb-2">Coach notes 📋</h3>
          <ul className="space-y-2">
            {result.coachNotes.map((note, i) => (
              <li key={i} className="flex gap-2 text-sm text-deepsea/70 leading-snug">
                <span className="text-lagoon font-bold">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {booked ? (
            <div className="bg-meadow/40 border-2 border-lagoon/40 rounded-3xl p-5 text-center">
              <div className="text-3xl mb-1">🎉</div>
              <p className="font-display font-bold text-deepsea">Trial class requested!</p>
              <p className="text-sm text-deepsea/60">
                (Prototype: in the real app, booking would happen here.)
              </p>
            </div>
          ) : (
            <Button full onClick={() => setBooked(true)}>
              Book a trial class 🎟️
            </Button>
          )}
        </motion.div>
      </div>
    </Screen>
  );
}
