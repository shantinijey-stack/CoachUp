import { COMFORT_QUESTIONS } from "../data/content";
import type { Answers, Level } from "../types";
import QuestQuestion from "./QuestQuestion";

interface ComfortMapProps {
  index: number; // 0–3
  answers: Answers;
  onAnswer: (index: number, level: Level) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

export default function ComfortMap({
  index,
  answers,
  onAnswer,
  onNext,
  onBack,
  progress,
}: ComfortMapProps) {
  const q = COMFORT_QUESTIONS[index];
  const selected = answers.comfort[q.key];

  return (
    <QuestQuestion
      chapterLabel={`Comfort Map · ${index + 1} of 4`}
      emoji={q.emoji}
      title={q.title}
      scene={q.scene}
      options={q.options.map((o) => ({
        id: String(o.level),
        emoji: o.emoji,
        label: o.label,
        description: o.description,
      }))}
      selectedId={selected !== undefined ? String(selected) : undefined}
      onSelect={(id) => onAnswer(index, Number(id) as Level)}
      onNext={onNext}
      onBack={onBack}
      progress={progress}
    />
  );
}
