import ActivityGuide from "../components/ActivityGuide";
import TimerBox from "../components/TimerBox";
import { MOVEMENT_ACTIVITIES } from "../data/content";
import type { AgeBand, Answers, Level } from "../types";
import QuestQuestion from "./QuestQuestion";

interface MovementSnapshotProps {
  ageBand: AgeBand;
  index: number; // 0–2
  answers: Answers;
  onAnswer: (index: number, level: Level) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

export default function MovementSnapshot({
  ageBand,
  index,
  answers,
  onAnswer,
  onNext,
  onBack,
  progress,
}: MovementSnapshotProps) {
  const activity = MOVEMENT_ACTIVITIES[ageBand][index];
  const selected = answers.movement[activity.domain];

  return (
    <QuestQuestion
      chapterLabel={`Movement Snapshot · ${index + 1} of 3`}
      emoji={activity.emoji}
      title={activity.title}
      scene={activity.scene}
      question={activity.question}
      extra={
        <>
          <ActivityGuide activity={activity} />
          <TimerBox timer={activity.timer} />
        </>
      }
      options={activity.options.map((o) => ({
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
