"use client";

import { useEffect, useMemo, useState } from "react";
import type { FillLesson } from "@/lib/lessons";

type Props = {
  lesson: FillLesson;
  onValidityChange: (ok: boolean) => void;
  onAttemptChange: (didAttempt: boolean) => void;
};

function splitOnBlank(sentence: string) {
  // expects exactly one blank token like ____ (your current format)
  const token = "____";
  const idx = sentence.indexOf(token);
  if (idx === -1) return { before: sentence, after: "" };
  return {
    before: sentence.slice(0, idx),
    after: sentence.slice(idx + token.length),
  };
}

export default function FillBlank({
  lesson,
  onValidityChange,
  onAttemptChange,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const ok = useMemo(() => selected === lesson.answerIndex, [selected, lesson.answerIndex]);

  useEffect(() => {
    onValidityChange(ok);
  }, [ok, onValidityChange]);

  useEffect(() => {
    onAttemptChange(selected !== null);
  }, [selected, onAttemptChange]);

  const { before, after } = useMemo(
    () => splitOnBlank(lesson.sentence),
    [lesson.sentence]
  );

  const selectedWord = selected !== null ? lesson.choices[selected] : null;

  return (
    <div className="space-y-4">
      {/* Prompt card */}
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="text-xs font-bold text-slate-500">French</div>

        <div className="mt-2 text-lg font-extrabold text-slate-900 leading-relaxed">
          <span>{before}</span>

          {/* Blank slot */}
          <span
            className={[
              "mx-1 inline-flex min-w-[120px] items-center justify-center rounded-xl border px-3 py-1 align-middle",
              selectedWord
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : "border-slate-200 bg-white text-slate-400",
            ].join(" ")}
          >
            {selectedWord ?? "…"}
          </span>

          <span>{after}</span>
        </div>

        <div className="mt-2 text-xs text-slate-500">
          Tap a word below to fill the blank.
        </div>
      </div>

      {/* Choices as chips */}
      <div className="grid gap-2 sm:grid-cols-2">
        {lesson.choices.map((c, idx) => {
          const isSelected = selected === idx;
          return (
            <button
              key={c}
              onClick={() => setSelected(idx)}
              className={[
                "rounded-2xl border px-4 py-3 text-left font-semibold transition",
                isSelected
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:bg-slate-50",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Small utility */}
      {selected !== null && (
        <button
          onClick={() => setSelected(null)}
          className="text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          Clear choice
        </button>
      )}

      <div className="text-xs text-slate-500">
        Tip: pick the word that best completes the sentence.
      </div>
    </div>
  );
}
