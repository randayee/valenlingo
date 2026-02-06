"use client";

import { useEffect, useMemo, useState } from "react";
import type { TranslateLesson } from "@/lib/lessons";

type Props = {
  lesson: TranslateLesson;
  onValidityChange: (ok: boolean) => void;
  onAttemptChange: (didAttempt: boolean) => void; // NEW
};

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[?.!]/g, "");
}

export default function Translate({
  lesson,
  onValidityChange,
  onAttemptChange,
}: Props) {
  const [value, setValue] = useState("");

  const ok = useMemo(() => {
    const v = normalize(value);
    return lesson.acceptable.some((a) => normalize(a) === v);
  }, [value, lesson.acceptable]);

  useEffect(() => {
    onValidityChange(ok);
  }, [ok, onValidityChange]);

  useEffect(() => {
    onAttemptChange(value.trim().length > 0);
  }, [value, onAttemptChange]);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="text-sm text-slate-500">French</div>
        <div className="text-2xl font-black text-slate-900">
          {lesson.french}
        </div>
        {lesson.hint && (
          <div className="mt-2 text-xs text-slate-500">
            Hint: {lesson.hint}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-slate-700">English</div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your translation…"
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-emerald-500"
        />
        <div className="text-xs text-slate-500">
          Tip: punctuation doesn’t matter.
        </div>
      </div>
    </div>
  );
}
