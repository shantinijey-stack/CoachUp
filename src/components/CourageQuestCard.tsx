import { AnimatePresence, motion } from "framer-motion";
import { personalizeText, useGuide } from "./GuideContext";
import type { CourageQuest } from "../data/courage";
import type { CourageAnswer } from "../types";

interface CourageQuestCardProps {
  quest: CourageQuest;
  answer: CourageAnswer;
  expanded: boolean;
  onExpand: () => void;
  onChoose: (index: number) => void;
  onToggleMission: () => void;
}

/**
 * The weekly Courage Quest: a scenario story, a "what would you do?"
 * choice (every answer gets a warm response. The strongest one gets
 * celebrated), a tiny real-world mission and a parent prompt.
 */
export default function CourageQuestCard({
  quest,
  answer,
  expanded,
  onExpand,
  onChoose,
  onToggleMission,
}: CourageQuestCardProps) {
  const guide = useGuide();
  const done = !!answer.missionDone;
  const chosen = answer.choice;

  return (
    <div
      className={`rounded-2xl border-2 transition-colors ${
        expanded ? "border-berry/50 bg-berry/5" : "border-berry/20 bg-gradient-to-r from-berry/10 to-sky/10"
      }`}
    >
      <div className="flex items-center gap-2.5 p-3">
        <button
          type="button"
          onClick={onToggleMission}
          aria-label={done ? `Mark ${quest.title} mission as not done` : `Mark ${quest.title} mission as done`}
          className={`shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-base transition-all ${
            done ? "bg-berry border-berry text-white scale-105" : "bg-white border-berry/30 text-transparent"
          }`}
        >
          💜
        </button>
        <button type="button" onClick={onExpand} className="flex-1 min-w-0 flex items-center gap-2.5 text-left">
          <span className="text-2xl">{quest.emoji}</span>
          <span className="flex-1 min-w-0">
            <span className={`block font-display font-bold text-sm ${done ? "text-deepsea/40 line-through" : "text-deepsea"}`}>
              {quest.title}
            </span>
            <span className="block text-[11px] font-bold text-berry/80">
              💜 Courage Quest · {quest.stageEmoji} {quest.stage}
            </span>
          </span>
          <span className={`text-deepsea/40 text-sm transition-transform ${expanded ? "rotate-180" : ""}`}>▾</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3">
              {/* Story */}
              <div className="flex items-start gap-2">
                <span className="text-xl mt-0.5">{guide.emoji}</span>
                <p className="flex-1 bg-white rounded-2xl rounded-tl-md shadow-card px-3.5 py-3 text-xs text-deepsea/85 leading-relaxed">
                  {personalizeText(quest.story, guide)}
                </p>
              </div>

              {/* Question + choices */}
              <p className="font-display font-bold text-sm text-deepsea">{quest.question}</p>
              <div className="space-y-2">
                {quest.choices.map((choice, i) => {
                  const isChosen = chosen === i;
                  return (
                    <div key={i}>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onChoose(i)}
                        aria-pressed={isChosen}
                        className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 border-2 text-left transition-all ${
                          isChosen
                            ? choice.best
                              ? "bg-meadow/30 border-lagoon"
                              : "bg-sunshine/20 border-sunshine"
                            : "bg-white border-transparent shadow-card hover:border-berry/30"
                        }`}
                      >
                        <span className="text-lg">{choice.emoji}</span>
                        <span className="flex-1 text-xs font-bold text-deepsea leading-snug">{choice.label}</span>
                        {isChosen && <span className="text-sm">{choice.best ? "🌟" : "💛"}</span>}
                      </motion.button>
                      <AnimatePresence>
                        {isChosen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden text-xs text-deepsea/75 leading-relaxed px-3 pt-2"
                          >
                            <span className="font-bold">{guide.emoji} {guide.firstName}:</span>{" "}
                            {personalizeText(choice.response, guide)}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mission */}
              <div className="bg-berry/10 rounded-xl px-3 py-2.5">
                <p className="text-xs text-deepsea/85 leading-snug">
                  <span className="font-extrabold text-berry">🎯 This week's mission:</span> {quest.mission}
                </p>
                <button
                  type="button"
                  onClick={onToggleMission}
                  className={`mt-2 w-full rounded-xl py-2 font-display font-bold text-xs transition-all ${
                    done
                      ? "bg-berry text-white"
                      : "bg-white text-berry shadow-card hover:ring-2 hover:ring-berry/30"
                  }`}
                >
                  {done ? "💜 Mission complete. Courage grew today!" : "Mark mission complete"}
                </button>
              </div>

              {/* Parent prompt */}
              <p className="text-[11px] text-deepsea/55 italic leading-snug">
                <span className="font-bold not-italic">👪 For grown-ups:</span> {quest.parentPrompt}
              </p>
              {quest.safetyNote && (
                <p className="text-[11px] bg-sunshine/25 border border-sunshine rounded-xl px-3 py-2 text-deepsea/80 leading-snug">
                  <span className="font-bold">🧡 Please read:</span> {quest.safetyNote}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
