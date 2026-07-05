import { motion } from "framer-motion";
import Card from "../components/Card";
import { useGuide } from "../components/GuideContext";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import { buildGrowthReport } from "../lib/growth";
import type { AppState, ChildProfile, DnaResult } from "../types";

interface GrowthReportProps {
  profile: ChildProfile;
  result: DnaResult;
  planProgress: AppState["planProgress"];
  courage: AppState["courage"];
  questLevels: AppState["questLevels"];
  checkIns: AppState["checkIns"];
  champion: boolean;
  seasonHistory: AppState["seasonHistory"];
  onBack: () => void;
}

/** Growth Report: what the child shines at after training, and where to explore next. */
export default function GrowthReport({
  profile,
  result,
  planProgress,
  courage,
  questLevels,
  checkIns,
  champion,
  seasonHistory,
  onBack,
}: GrowthReportProps) {
  const guide = useGuide();
  const name = profile.name.trim() || "Your explorer";
  const history = seasonHistory.reduce(
    (acc, s) => ({
      quests: acc.quests + s.quests,
      weeks: acc.weeks + s.weeks,
      courage: acc.courage + s.courage,
      checkIns: acc.checkIns + s.checkIns,
    }),
    { quests: 0, weeks: 0, courage: 0, checkIns: 0 },
  );
  const report = buildGrowthReport(result, planProgress, courage, questLevels, checkIns, {
    champion,
    history,
  });

  return (
    <Screen onBack={onBack}>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-meadow to-lagoon rounded-3xl shadow-card p-5 text-white mb-4"
      >
        <div className="flex items-center gap-3">
          <Remi size="sm" bounce={false} />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">📈 Growth Report</p>
            <h2 className="font-display font-extrabold text-2xl leading-tight">
              {name}'s Journey So Far
            </h2>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
          <span className="text-xl">{report.trainerLevel.emoji}</span>
          <span className="font-display font-bold">{report.trainerLevel.name}</span>
        </div>
        <p className="text-xs opacity-90 mt-2">{report.trainerLevel.blurb}</p>
      </motion.div>

      <div className="space-y-4 pb-8">
        {/* Effort first — that's the real achievement */}
        <Card>
          <h3 className="font-display font-bold text-deepsea mb-2">The work behind it 💪</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { n: report.effort.quests, label: "Quests", emoji: "🎒" },
              { n: report.effort.weeks, label: "Weeks", emoji: "⭐" },
              { n: report.effort.courage, label: "Courage", emoji: "💜" },
              { n: report.effort.checkIns, label: "Check-ins", emoji: "🗣️" },
            ].map((s) => (
              <div key={s.label} className="bg-cream rounded-2xl p-2.5">
                <div className="text-lg">{s.emoji}</div>
                <div className="font-display font-extrabold text-lg text-deepsea tabular-nums">{s.n}</div>
                <div className="text-[10px] font-bold text-deepsea/40 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Shining strengths */}
        <Card delay={0.1}>
          <h3 className="font-display font-bold text-deepsea mb-2">Shining strengths ✨</h3>
          <div className="space-y-2.5">
            {report.strengths.map((s) => (
              <div key={s.title} className="bg-gradient-to-r from-sunshine/25 to-meadow/20 rounded-2xl p-3.5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-display font-bold text-deepsea text-sm">
                    {s.emoji} {s.title}
                  </p>
                  <span className="shrink-0 text-[10px] font-extrabold bg-white rounded-full px-2 py-0.5 text-deepsea/70">
                    {s.levelLabel}
                  </span>
                </div>
                <p className="text-xs text-deepsea/70 leading-snug">{s.detail}</p>
              </div>
            ))}
          </div>
          {report.courageStrengths.length > 0 && (
            <div className="mt-3 bg-berry/10 rounded-2xl p-3.5">
              <p className="font-display font-bold text-deepsea text-sm mb-1">Courage strengths 💜</p>
              <ul className="space-y-1">
                {report.courageStrengths.map((c) => (
                  <li key={c} className="text-xs text-deepsea/75">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* Next quest */}
        <Card delay={0.2}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{report.growth.emoji}</span>
            <div>
              <h3 className="font-display font-bold text-deepsea">{report.growth.title}</h3>
              <p className="text-sm text-deepsea/70 leading-relaxed">{report.growth.detail}</p>
            </div>
          </div>
        </Card>

        {/* Where to explore */}
        <Card delay={0.3}>
          <h3 className="font-display font-bold text-deepsea mb-1">Ways to explore these strengths 🗺️</h3>
          <p className="text-xs text-deepsea/50 mb-3">
            Not a prescription — just movement families where {name}'s sparks tend to shine.
            The best activity is always the one they love.
          </p>
          <div className="space-y-2">
            {report.exploreOptions.map((o) => (
              <div key={o.title} className="flex items-start gap-3 bg-cream rounded-2xl p-3">
                <span className="text-2xl">{o.emoji}</span>
                <div>
                  <p className="font-display font-bold text-sm text-deepsea">{o.title}</p>
                  <p className="text-xs text-deepsea/60 leading-snug">{o.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Champion-only: real-world sport doors */}
        {report.sportDoors && (
          <Card delay={0.4} className="!border-2 !border-sunshine">
            <h3 className="font-display font-bold text-deepsea mb-1">
              🚪 Champion's doors: real-world sports to try
            </h3>
            <p className="text-xs text-deepsea/50 mb-3">
              Three seasons of evidence say these doors are worth knocking on. They're
              invitations, not predictions — try a few, keep whichever one {name} begs to go
              back to.
            </p>
            <div className="space-y-2">
              {report.sportDoors.map((d) => (
                <div key={d.title} className="flex items-start gap-3 bg-sunshine/15 rounded-2xl p-3">
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <p className="font-display font-bold text-sm text-deepsea">{d.title}</p>
                    <p className="text-xs text-deepsea/60 leading-snug">{d.examples}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-deepsea/60 mt-3 text-center font-bold">
              🎟️ A trial class is the perfect first knock.
            </p>
          </Card>
        )}

        <p className="text-center text-xs text-deepsea/40 px-6">
          {guide.emoji} {guide.firstName} says: this report celebrates {name} exactly as they
          are today — and tomorrow's practice writes the next page. 💛
        </p>
      </div>
    </Screen>
  );
}
