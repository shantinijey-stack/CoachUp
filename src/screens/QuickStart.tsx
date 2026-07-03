import Button from "../components/Button";
import Card from "../components/Card";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import {
  ACTIVITIES_TRIED,
  ACTIVITY_LEVELS,
  PARENT_GOALS,
} from "../data/content";
import type { ChildProfile } from "../types";

interface QuickStartProps {
  profile: ChildProfile;
  onChange: (profile: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const AGES = [4, 5, 6, 7, 8, 9, 10, 11, 12];

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
        selected
          ? "bg-lagoon text-white border-lagoon shadow-pop"
          : "bg-white text-deepsea/70 border-deepsea/10 hover:border-lagoon/40"
      }`}
    >
      {children}
    </button>
  );
}

export default function QuickStart({
  profile,
  onChange,
  onNext,
  onBack,
  progress,
}: QuickStartProps) {
  const set = <K extends keyof ChildProfile>(key: K, value: ChildProfile[K]) =>
    onChange({ ...profile, [key]: value });

  const toggleActivity = (id: string) => {
    const has = profile.activitiesTried.includes(id);
    set(
      "activitiesTried",
      has
        ? profile.activitiesTried.filter((a) => a !== id)
        : [...profile.activitiesTried, id],
    );
  };

  const valid =
    profile.name.trim().length > 0 &&
    profile.activityLevel !== "" &&
    profile.parentGoal !== "";

  return (
    <Screen
      progress={progress}
      onBack={onBack}
      footer={
        <Button full disabled={!valid} onClick={onNext}>
          Meet your guide →
        </Button>
      }
    >
      <div className="flex items-center gap-3 mb-4">
        <Remi size="sm" bounce={false} />
        <div>
          <h2 className="font-display font-extrabold text-2xl text-deepsea">
            Quick Start
          </h2>
          <p className="text-sm text-deepsea/60">
            Tell us a little about your explorer
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <label className="block font-display font-bold text-deepsea mb-2" htmlFor="child-name">
            What's your child's name? ✏️
          </label>
          <input
            id="child-name"
            type="text"
            value={profile.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Maya"
            className="w-full rounded-2xl border-2 border-deepsea/10 bg-cream px-4 py-3 font-semibold text-deepsea placeholder:text-deepsea/30 focus:border-lagoon focus:outline-none"
          />
        </Card>

        <Card delay={0.05}>
          <p className="font-display font-bold text-deepsea mb-2">
            How old are they? 🎂
          </p>
          <div className="flex flex-wrap gap-2">
            {AGES.map((age) => (
              <Chip
                key={age}
                selected={profile.age === age}
                onClick={() => set("age", age)}
              >
                {age}
              </Chip>
            ))}
          </div>
        </Card>

        <Card delay={0.1}>
          <p className="font-display font-bold text-deepsea mb-2">
            Their everyday energy? 🔋
          </p>
          <div className="space-y-2">
            {ACTIVITY_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => set("activityLevel", lvl.id)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 border-2 text-left transition-all ${
                  profile.activityLevel === lvl.id
                    ? "border-lagoon bg-lagoon/10"
                    : "border-deepsea/10 bg-white hover:border-lagoon/40"
                }`}
              >
                <span className="text-2xl">{lvl.emoji}</span>
                <span>
                  <span className="block font-bold text-deepsea">{lvl.label}</span>
                  <span className="block text-xs text-deepsea/50">{lvl.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card delay={0.15}>
          <p className="font-display font-bold text-deepsea mb-1">
            Activities they've tried 🏐
          </p>
          <p className="text-xs text-deepsea/50 mb-2">Pick as many as you like</p>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES_TRIED.map((a) => (
              <Chip
                key={a.id}
                selected={profile.activitiesTried.includes(a.id)}
                onClick={() => toggleActivity(a.id)}
              >
                {a.emoji} {a.label}
              </Chip>
            ))}
          </div>
        </Card>

        <Card delay={0.2}>
          <p className="font-display font-bold text-deepsea mb-2">
            What's your biggest hope? 💭
          </p>
          <div className="flex flex-wrap gap-2">
            {PARENT_GOALS.map((g) => (
              <Chip
                key={g.id}
                selected={profile.parentGoal === g.id}
                onClick={() => set("parentGoal", g.id)}
              >
                {g.emoji} {g.label}
              </Chip>
            ))}
          </div>
        </Card>

        <Card delay={0.25}>
          <label className="block font-display font-bold text-deepsea mb-1" htmlFor="health-note">
            Anything helpful for coaches to know? 📝
          </label>
          <p className="text-xs text-deepsea/50 mb-2">
            Optional — health, movement or anything else
          </p>
          <textarea
            id="health-note"
            value={profile.healthNote}
            onChange={(e) => set("healthNote", e.target.value)}
            placeholder="e.g. wears glasses, new to group settings…"
            rows={2}
            className="w-full rounded-2xl border-2 border-deepsea/10 bg-cream px-4 py-3 font-semibold text-deepsea placeholder:text-deepsea/30 focus:border-lagoon focus:outline-none resize-none"
          />
        </Card>
      </div>
    </Screen>
  );
}
