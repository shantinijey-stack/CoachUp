import { motion } from "framer-motion";
import { useEffect } from "react";
import { useGuide } from "../components/GuideContext";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import { computeBadges, computeStickers, type BadgeInputs } from "../lib/badges";
import type { ChildProfile } from "../types";

interface BadgeBookProps {
  profile: ChildProfile;
  inputs: BadgeInputs;
  onSeen: (ids: string[]) => void;
  onBack: () => void;
}

/** The Sticker Book: the child's sticker trail and effort badges. */
export default function BadgeBook({ profile, inputs, onSeen, onBack }: BadgeBookProps) {
  const guide = useGuide();
  const name = profile.name.trim() || "Your explorer";
  const badges = computeBadges(inputs);
  const stickers = computeStickers(inputs.planProgress);
  const earnedBadges = badges.filter((b) => b.earned);
  const earnedStickers = stickers.filter((s) => s.earned);

  // Visiting the book marks every earned badge as celebrated.
  useEffect(() => {
    onSeen(earnedBadges.map((b) => b.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnedBadges.length]);

  return (
    <Screen brand onBack={onBack}>
      <div className="bg-gradient-to-br from-berry to-sky rounded-3xl shadow-card p-5 text-white mb-4">
        <div className="flex items-center gap-3">
          <Remi size="sm" bounce={false} />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">🏅 Sticker Book</p>
            <h2 className="font-display font-extrabold text-2xl leading-tight">
              {name}'s Treasures
            </h2>
            <p className="text-xs opacity-90 mt-0.5">
              {earnedBadges.length} of {badges.length} badges · {earnedStickers.length} of{" "}
              {stickers.length} stickers
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs opacity-90 leading-relaxed">
          {guide.emoji} {guide.firstName} says: every treasure here was earned by{" "}
          <strong>trying</strong>. That's the only way to earn them, and nobody can ever take
          them away!
        </p>
      </div>

      <div className="space-y-4 pb-8">
        {/* Sticker trail */}
        <div className="bg-white/90 rounded-3xl shadow-card p-4">
          <h3 className="font-display font-bold text-deepsea mb-1">Sticker Trail 🛤️</h3>
          <p className="text-xs text-deepsea/50 mb-3">One sticker for every adventure week completed</p>
          <div className="grid grid-cols-4 gap-2.5">
            {stickers.map((s, i) => (
              <motion.div
                key={s.week}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.03 * i }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-0.5 border-2 ${
                  s.earned
                    ? "bg-gradient-to-br from-sunshine/40 to-tangerine/30 border-sunshine"
                    : "bg-cream border-transparent"
                }`}
                title={s.title}
              >
                <span className={`text-2xl ${s.earned ? "" : "grayscale opacity-30"}`}>
                  {s.earned ? s.emoji : "❔"}
                </span>
                <span className={`text-[10px] font-bold ${s.earned ? "text-deepsea" : "text-deepsea/30"}`}>
                  W{s.week}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white/90 rounded-3xl shadow-card p-4">
          <h3 className="font-display font-bold text-deepsea mb-1">Badges 🏅</h3>
          <p className="text-xs text-deepsea/50 mb-3">Earned by playing, trying and telling the truth about how it felt</p>
          <div className="space-y-2">
            {badges.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className={`flex items-center gap-3 rounded-2xl p-3 ${
                  b.earned ? "bg-gradient-to-r from-sunshine/25 to-meadow/25" : "bg-cream/70"
                }`}
              >
                <span
                  className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-2xl ${
                    b.earned ? "bg-white shadow-card" : "bg-white/50 grayscale opacity-40"
                  }`}
                >
                  {b.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-display font-bold text-sm ${b.earned ? "text-deepsea" : "text-deepsea/40"}`}>
                    {b.name}
                    {b.earned && <span className="ml-1.5">✓</span>}
                  </p>
                  <p className={`text-xs leading-snug ${b.earned ? "text-deepsea/70" : "text-deepsea/40"}`}>
                    {b.earned ? b.description : b.hint}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-deepsea/40 px-6">
          Rewards here celebrate effort, never scores. Because showing up and trying
          IS the achievement. 💛
        </p>
      </div>
    </Screen>
  );
}
