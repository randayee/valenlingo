"use client";

import { useEffect, useState } from "react";
import type { McqLesson } from "@/lib/lessons";

type Props = {
  lesson: McqLesson;
  onValidityChange: (ok: boolean) => void;
  onAttemptChange: (didAttempt: boolean) => void; // NEW
};

export default function MultipleChoice({
  lesson,
  onValidityChange,
  onAttemptChange,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    onValidityChange(selected === lesson.answerIndex);
  }, [selected, lesson.answerIndex, onValidityChange]);

  useEffect(() => {
    onAttemptChange(selected !== null);
  }, [selected, onAttemptChange]);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-50 p-4 text-slate-900 font-semibold">
        {lesson.question}
      </div>

      <div className="space-y-2">
        {lesson.choices.map((c, idx) => (
          <button
            key={c}
            onClick={() => setSelected(idx)}
            className={[
              "w-full rounded-2xl border p-3 text-left font-semibold transition",
              selected === idx
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white hover:bg-slate-50",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
