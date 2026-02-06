"use client";

import { useEffect, useMemo, useState } from "react";
import type { MatchLesson } from "@/lib/lessons";

type Props = {
  lesson: MatchLesson;
  onValidityChange: (ok: boolean) => void;
  onAttemptChange: (didAttempt: boolean) => void;
};

// Fisher–Yates shuffle (stable + safe)
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchPairs({
  lesson,
  onValidityChange,
  onAttemptChange,
}: Props) {
  const left = lesson.pairs.map((p) => p[0]);

  // 🔀 Shuffle English words ONCE
  const right = useMemo(
    () => shuffle(lesson.pairs.map((p) => p[1])),
    [lesson.pairs]
  );

  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [usedRight, setUsedRight] = useState<Set<string>>(new Set());

  const correctMap = useMemo(() => {
    const m: Record<string, string> = {};
    lesson.pairs.forEach(([l, r]) => (m[l] = r));
    return m;
  }, [lesson.pairs]);

  const completed = Object.keys(matches).length === left.length;

  // ✅ validity check
  useEffect(() => {
    if (!completed) {
      onValidityChange(false);
      return;
    }
    const allCorrect = left.every((l) => matches[l] === correctMap[l]);
    onValidityChange(allCorrect);
  }, [completed, matches, left, correctMap, onValidityChange]);

  // ✅ attempted tracking
  useEffect(() => {
    const didAttempt = Object.keys(matches).length > 0 || pickedLeft !== null;
    onAttemptChange(didAttempt);
  }, [matches, pickedLeft, onAttemptChange]);

  function pickRight(r: string) {
    if (!pickedLeft) return;
    if (usedRight.has(r)) return;

    setMatches((prev) => ({ ...prev, [pickedLeft]: r }));
    setUsedRight((prev) => new Set(prev).add(r));
    setPickedLeft(null);
  }

  function reset() {
    setPickedLeft(null);
    setMatches({});
    setUsedRight(new Set());
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* French */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500">French</div>
          {left.map((l) => (
            <button
              key={l}
              onClick={() => setPickedLeft(l)}
              className={[
                "w-full rounded-2xl border p-3 text-left font-semibold transition",
                pickedLeft === l
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:bg-slate-50",
              ].join(" ")}
            >
              {l}
              {matches[l] && (
                <span className="ml-2 text-xs text-slate-500">
                  → {matches[l]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* English (shuffled) */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500">English</div>
          {right.map((r) => {
            const disabled = usedRight.has(r);
            return (
              <button
                key={r}
                onClick={() => pickRight(r)}
                disabled={disabled}
                className={[
                  "w-full rounded-2xl border p-3 text-left font-semibold transition",
                  disabled
                    ? "border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed"
                    : "border-slate-200 bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={reset}
        className="text-sm font-semibold text-slate-500 hover:text-slate-700"
      >
        Reset pairs
      </button>

      <div className="text-xs text-slate-500">
        Tip: select a French word, then its English match.
      </div>
    </div>
  );
}
