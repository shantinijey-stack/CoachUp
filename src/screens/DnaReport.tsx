import { motion } from "framer-motion";
import Button from "../components/Button";
import Card from "../components/Card";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import { DOMAIN_INFO, LEVEL_LABELS, MODULES, SPARK_QUESTIONS } from "../data/content";
import { COMFORT_COPY } from "../lib/scoring";
import type { ChildProfile, DnaResult, Domain, Level } from "../types";

interface DnaReportProps {
  profile: ChildProfile;
  result: DnaResult;
  onNext: () => void;
  onBack: () => void;
}

const DOMAINS: Domain[] = ["locomotor", "objectControl", "stability"];

function DomainMeter({ domain, level, highlight }: { domain: Domain; level: Level; highlight?: "strength" | "growth" }) {
  const info = DOMAIN_INFO[domain];
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl w-9 text-center">{info.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-bold text-sm text-deepsea">
            {info.kidName}
            <span className="text-deepsea/40 font-semibold"> · {info.name}</span>
          </span>
          <span className="text-xs font-bold text-lagoon">{LEVEL_LABELS[level]}</span>
        </div>
        <div className="h-2.5 bg-deepsea/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              highlight === "strength"
                ? "bg-gradient-to-r from-sunshine to-tangerine"
                : "bg-lagoon"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${(level / 3) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
      {highlight === "strength" && <span className="text-lg" title="Movement strength">⭐</span>}
      {highlight === "growth" && <span className="text-lg" title="Growth quest">🗺️</span>}
    </div>
  );
}

function StatTile({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="bg-cream rounded-2xl p-3 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-deepsea/40">{label}</div>
      <div className="font-display font-bold text-sm text-deepsea leading-tight">{value}</div>
    </div>
  );
}

export default function DnaReport({ profile, result, onNext, onBack }: DnaReportProps) {
  const name = profile.name.trim() || "Your explorer";
  const mod = MODULES[result.module];
  const strength = DOMAIN_INFO[result.strengthDomain];
  const growth = DOMAIN_INFO[result.growthDomain];
  const comfort = COMFORT_COPY[result.comfortStyle];

  const driveLabel = SPARK_QUESTIONS[0].options.find((o) => o.value === result.drive)?.label ?? "";
  const confidenceLabel =
    SPARK_QUESTIONS[1].options.find((o) => o.value === result.confidence)?.label ?? "";
  const socialLabel =
    SPARK_QUESTIONS[2].options.find((o) => o.value === result.social)?.label ?? "";

  return (
    <Screen
      brand
      onBack={onBack}
      footer={
        <Button full onClick={onNext}>
          Open the family dashboard →
        </Button>
      }
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-card text-xs font-bold uppercase tracking-widest text-berry mb-3">
          🧬 CoachUp DNA™ Report
        </div>
        <h2 className="font-display font-extrabold text-3xl text-deepsea">
          {name}'s Movement Spark
        </h2>
        <p className="text-sm text-deepsea/50">Age {profile.age} · Discovery Day edition</p>
      </motion.div>

      <div className="space-y-4">
        {/* Movement profile */}
        <Card>
          <h3 className="font-display font-bold text-deepsea mb-3">Movement Worlds 🌍</h3>
          <div className="space-y-4">
            {DOMAINS.map((d) => (
              <DomainMeter
                key={d}
                domain={d}
                level={result.domainScores[d]}
                highlight={
                  d === result.strengthDomain
                    ? "strength"
                    : d === result.growthDomain
                      ? "growth"
                      : undefined
                }
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="bg-sunshine/20 rounded-2xl p-3">
              <div className="font-bold text-deepsea">⭐ Movement strength</div>
              <div className="text-deepsea/70">{strength.kidName} ({strength.name})</div>
            </div>
            <div className="bg-lagoon/15 rounded-2xl p-3">
              <div className="font-bold text-deepsea">🗺️ Growth quest</div>
              <div className="text-deepsea/70">{growth.kidName} ({growth.name})</div>
            </div>
          </div>
        </Card>

        {/* Comfort + spark */}
        <Card delay={0.1}>
          <h3 className="font-display font-bold text-deepsea mb-3">Comfort & Spark ✨</h3>
          <div className="grid grid-cols-2 gap-2">
            <StatTile emoji={comfort.emoji} label="Comfort style" value={comfort.label} />
            <StatTile emoji="🔥" label="Drive" value={driveLabel} />
            <StatTile emoji="🌟" label="Confidence" value={confidenceLabel} />
            <StatTile emoji="🧭" label="Social format" value={socialLabel} />
          </div>
        </Card>

        {/* Recommended module */}
        <Card delay={0.2} className="!p-0 overflow-hidden">
          <div className={`bg-gradient-to-br ${mod.gradient} p-5 text-white`}>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
              Recommended adventure
            </p>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{mod.emoji}</span>
              <div>
                <h3 className="font-display font-extrabold text-2xl leading-tight">{mod.name}</h3>
                <p className="text-sm opacity-90">{mod.tagline}</p>
              </div>
            </div>
          </div>
          <p className="p-5 text-sm text-deepsea/70 leading-relaxed">{mod.description}</p>
        </Card>

        {/* Parent explanation */}
        <Card delay={0.3}>
          <div className="flex items-start gap-3">
            <Remi size="sm" bounce={false} />
            <div>
              <h3 className="font-display font-bold text-deepsea mb-1">What this means 💛</h3>
              <p className="text-sm text-deepsea/70 leading-relaxed">{result.parentExplanation}</p>
            </div>
          </div>
        </Card>

        {/* Coach notes */}
        <Card delay={0.4}>
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
      </div>
    </Screen>
  );
}
