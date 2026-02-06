"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

import { Button, Card, Pill } from "@/components/ui";
import type { Lesson, MatchLesson, McqLesson, FillLesson, TranslateLesson } from "@/lib/lessons";
import type { Progress } from "@/lib/progress";
import { loadProgress, markCompleted, saveProgress } from "@/lib/progress";

import MatchPairs from "@/components/exercises/MatchPairs";
import MultipleChoice from "@/components/exercises/MultipleChoice";
import FillBlank from "@/components/exercises/FillBlank";
import Translate from "@/components/exercises/Translate";

type Props = {
  lesson: Lesson;
  onComplete?: (nextProgress: Progress) => void;
};

function fireConfetti() {
  confetti({
    particleCount: 140,
    spread: 75,
    origin: { y: 0.7 },
  });
}

export default function LessonRunner({ lesson, onComplete }: Props) {
  const router = useRouter();

  const [isCorrect, setIsCorrect] = useState(false);
  const [checked, setChecked] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const handleValidityChange = useCallback((ok: boolean) => {
    setIsCorrect(ok);
  }, []);

  const handleAttemptChange = useCallback((didAttempt: boolean) => {
    if (didAttempt) setAttempted(true);
    // hide old feedback once user interacts again
    setChecked((prev) => (prev ? false : prev));
  }, []);

  const buttonLabel = lesson.isFinal ? "Unlock surprise" : "Check";

  const renderExercise = () => {
    switch (lesson.type) {
      case "match":
        return (
          <MatchPairs
            lesson={lesson as MatchLesson}
            onValidityChange={handleValidityChange}
            onAttemptChange={handleAttemptChange}
          />
        );

      case "mcq":
        return (
          <MultipleChoice
            lesson={lesson as McqLesson}
            onValidityChange={handleValidityChange}
            onAttemptChange={handleAttemptChange}
          />
        );

      case "fill":
        return (
          <FillBlank
            lesson={lesson as FillLesson}
            onValidityChange={handleValidityChange}
            onAttemptChange={handleAttemptChange}
          />
        );

      case "translate":
        return (
          <Translate
            lesson={lesson as TranslateLesson}
            onValidityChange={handleValidityChange}
            onAttemptChange={handleAttemptChange}
          />
        );

      default:
        return <div className="text-slate-600">Unknown exercise.</div>;
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Pill>{lesson.title}</Pill>
          <div className="text-sm text-slate-500">Love XP +10 💗</div>
        </div>

        <div className="text-lg font-extrabold text-slate-900">
          {lesson.prompt}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {renderExercise()}
        </motion.div>

        {checked && (
          <div
            className={[
              "rounded-2xl p-3 text-sm font-semibold",
              isCorrect
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800",
            ].join(" ")}
          >
            {isCorrect
              ? lesson.explain ?? "Correct! 🎉"
              : lesson.wrongExplain ?? "Not quite — try again 🙂"}
          </div>
        )}

        <Button
          className={`w-full ${
            lesson.isFinal ? "bg-rose-500 hover:bg-rose-600" : ""
          }`}
          disabled={!attempted}
          onClick={() => {
            setChecked(true);
            if (!isCorrect) return;

            fireConfetti();

            const current = loadProgress();
            const next = markCompleted(current, lesson.id);
            saveProgress(next);

            setTimeout(() => {
              if (lesson.isFinal) router.push("/complete");
              else onComplete?.(next);
            }, 450);
          }}
        >
          {attempted ? buttonLabel : "Choose an answer"}
        </Button>

        <div className="text-xs text-slate-500">
          Tip: wrong answers give hints — keep going 😌
        </div>
      </div>
    </Card>
  );
}
