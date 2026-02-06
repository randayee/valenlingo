"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UNIT, LESSONS } from "@/lib/lessons";
import type { Progress } from "@/lib/progress";
import { loadProgress, resetProgress } from "@/lib/progress";
import { Card, Button, Pill } from "@/components/ui";
import LessonRunner from "@/components/LessonRunner";

export default function LearnPage() {
  const [progress, setProgress] = useState<Progress>({ completed: [] });
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const completed = new Set(progress.completed);

  const activeLesson = activeLessonId
    ? LESSONS.find((l) => l.id === activeLessonId) ?? null
    : null;

  if (activeLesson) {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-8">
        <div className="mx-auto max-w-xl">
          <Link
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            href="/learn"
            onClick={(e) => {
              e.preventDefault();
              setActiveLessonId(null);
            }}
          >
            ← Back to path
          </Link>

          <div className="mt-4">
            <LessonRunner
              lesson={activeLesson}
              onComplete={(nextProgress) => {
                setProgress(nextProgress);
                setActiveLessonId(null);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-xl space-y-4">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill>{UNIT.title}</Pill>
              <div className="mt-2 text-slate-600">{UNIT.subtitle}</div>
            </div>
            <div className="text-sm text-slate-500">
              Completed: {progress.completed.length}/{LESSONS.length}
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            {LESSONS.map((l, idx) => {
              const prev = LESSONS[idx - 1];
              const unlocked = idx === 0 || (prev ? completed.has(prev.id) : true);
              const done = completed.has(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => unlocked && setActiveLessonId(l.id)}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition",
                    unlocked
                      ? "bg-white hover:bg-slate-50 border-slate-200"
                      : "bg-slate-100 border-slate-200 opacity-60",
                  ].join(" ")}
                  disabled={!unlocked}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-slate-900">
                        {idx + 1}. {l.title}
                      </div>
                      <div className="text-sm text-slate-600">{l.prompt}</div>
                    </div>
                    <div className="text-xl">
                      {done ? "✅" : unlocked ? "⭕" : "🔒"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

<Card className="bg-white">
  <div className="flex items-center justify-between gap-4">
    <div>
      <div className="text-sm font-black text-slate-900">
        Reset progress
      </div>
      <div className="text-xs text-slate-500">
        Replay the lessons from the beginning
      </div>
    </div>

    <Button
      className="bg-slate-100 text-slate-700 hover:bg-slate-200"
      onClick={() => {
        resetProgress();
        const p = loadProgress();
        setProgress(p);
      }}
    >
      Reset
    </Button>
  </div>
</Card>


      </div>
    </div>
  );
}
