import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Button from "../components/Button";
import OptionCard from "../components/OptionCard";
import Remi from "../components/Remi";
import Screen from "../components/Screen";
import SpeechBubble from "../components/SpeechBubble";

export interface QuestOption {
  id: string;
  emoji: string;
  label: string;
  description?: string;
}

interface QuestQuestionProps {
  chapterLabel: string; // e.g. "Movement Snapshot · 1 of 3"
  emoji: string;
  title: string;
  scene: string;
  question?: string;
  options: QuestOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
  extra?: ReactNode;
}

/**
 * Shared layout for every quest question in Movement Snapshot, Comfort Map
 * and Spark Snapshot: Remi sets the scene, parent taps an answer card.
 */
export default function QuestQuestion({
  chapterLabel,
  emoji,
  title,
  scene,
  question,
  options,
  selectedId,
  onSelect,
  onNext,
  onBack,
  progress,
}: QuestQuestionProps) {
  return (
    <Screen
      progress={progress}
      onBack={onBack}
      footer={
        <Button full disabled={!selectedId} onClick={onNext}>
          Next adventure →
        </Button>
      }
    >
      <p className="text-xs font-bold uppercase tracking-widest text-tangerine mb-2">
        {chapterLabel}
      </p>

      <motion.div
        key={title}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 mb-3"
      >
        <span className="text-5xl">{emoji}</span>
        <h2 className="font-display font-extrabold text-2xl leading-tight text-deepsea">
          {title}
        </h2>
      </motion.div>

      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 mt-1">
          <Remi size="sm" bounce={false} />
        </div>
        <SpeechBubble>{scene}</SpeechBubble>
      </div>

      {question && (
        <p className="font-display font-bold text-deepsea/80 mb-3">{question}</p>
      )}

      <div className="space-y-3">
        {options.map((opt, i) => (
          <OptionCard
            key={opt.id}
            index={i}
            emoji={opt.emoji}
            label={opt.label}
            description={opt.description}
            selected={selectedId === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </Screen>
  );
}
