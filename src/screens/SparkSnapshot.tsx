import { SPARK_QUESTIONS } from "../data/content";
import type { Answers, Level, SocialStyle } from "../types";
import QuestQuestion from "./QuestQuestion";

interface SparkSnapshotProps {
  index: number; // 0–2
  answers: Answers;
  onAnswer: (key: "drive" | "confidence" | "social", value: Level | SocialStyle) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

export default function SparkSnapshot({
  index,
  answers,
  onAnswer,
  onNext,
  onBack,
  progress,
}: SparkSnapshotProps) {
  const q = SPARK_QUESTIONS[index];
  const selected =
    q.key === "drive" ? answers.drive : q.key === "confidence" ? answers.confidence : answers.social;

  return (
    <QuestQuestion
      chapterLabel={`Spark Snapshot · ${index + 1} of 3`}
      emoji={q.emoji}
      title={q.title}
      scene={q.scene}
      options={q.options.map((o) => ({
        id: String(o.value),
        emoji: o.emoji,
        label: o.label,
        description: o.description,
      }))}
      selectedId={selected !== undefined ? String(selected) : undefined}
      onSelect={(id) => {
        if (q.key === "social") {
          onAnswer("social", id as SocialStyle);
        } else {
          onAnswer(q.key, Number(id) as Level);
        }
      }}
      onNext={onNext}
      onBack={onBack}
      progress={progress}
    />
  );
}
