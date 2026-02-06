"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, Button, Pill } from "@/components/ui";
import { UNIT, LESSONS } from "@/lib/lessons";
import { loadProgress } from "@/lib/progress";

export default function Home() {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    setCompletedCount(p.completed.length);
  }, []);

  const totalLessons = LESSONS.length;

  const nextLessonLabel = useMemo(() => {
    if (completedCount <= 0) return "Start lesson";
    if (completedCount >= totalLessons) return "View surprise";
    return "Continue";
  }, [completedCount, totalLessons]);

  const nextHref = useMemo(() => {
    if (completedCount >= totalLessons) return "/yes";
    return "/learn";
  }, [completedCount, totalLessons]);

  const progressText = useMemo(() => {
    return `Progress: ${Math.min(completedCount, totalLessons)} / ${totalLessons}`;
  }, [completedCount, totalLessons]);

  const statusLine = useMemo(() => {
    if (completedCount >= totalLessons) return "Unit complete ✅";
    if (completedCount > 0) return "You’re already on a streak 😌";
    return "A tiny lesson + a Valentine twist 💘";
  }, [completedCount, totalLessons]);

  return (
    <div
      className="relative min-h-screen px-5 py-10"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* soft overlay */}
      <div className="absolute inset-0 bg-rose-50/90 backdrop-blur-sm" />

      {/* content */}
      <div className="relative z-10">
        <main className="mx-auto max-w-2xl space-y-5">
          {/* Letter-style intro */}
          <Card className="bg-white shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Pill>Today’s lesson</Pill>
                <div className="text-xs font-semibold text-slate-500">
                  {progressText}
                </div>
              </div>

              <h1 className="text-3xl font-black text-slate-900">
                A quick French lesson...
              </h1>

              <p className="text-slate-600 leading-relaxed">
                I made you a tiny Duolingo-style lesson because you’ve been learning French —
                and I wanted to turn it into something a little more special.
                <br />
                <span className="font-semibold text-slate-800">
                  Finish the unit and you’ll unlock the real reason I built this.
                </span>
              </p>

              <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-sm font-semibold text-slate-700">
                  {statusLine}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Love XP +50 💗
                </div>
              </div>

              <Link href={nextHref}>
                <Button
                  className={`w-full ${
                    completedCount >= totalLessons
                      ? "bg-rose-500 hover:bg-rose-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  {nextLessonLabel} →
                </Button>
              </Link>


            </div>
          </Card>

          {/* Unit overview */}
          <Card className="bg-white shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-black text-slate-900">Unit 1</div>
                <div className="mt-1 text-lg font-black text-slate-900">
                  {UNIT.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {UNIT.subtitle}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                <div className="text-xs font-semibold text-slate-500">
                  Completed
                </div>
                <div className="text-lg font-black text-slate-900">
                  {Math.min(completedCount, totalLessons)}/{totalLessons}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {LESSONS.map((l, idx) => {
                const done = idx < completedCount;
                const isNext =
                  idx === completedCount && completedCount < totalLessons;

                return (
                  <div
                    key={l.id}
                    className={[
                      "flex items-center justify-between rounded-2xl border px-4 py-3",
                      done
                        ? "border-emerald-200 bg-emerald-50"
                        : isNext
                        ? "border-slate-200 bg-white"
                        : "border-slate-200 bg-slate-50 opacity-70",
                    ].join(" ")}
                  >
                    <div>
                      <div className="text-sm font-black text-slate-900">
                        {idx + 1}. {l.title}
                      </div>
                      <div className="text-xs text-slate-600">{l.prompt}</div>
                    </div>
                    <div className="text-xl">
                      {done ? "✅" : isNext ? "➡️" : "🔒"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Link href={nextHref}>
                <Button
                  className={`w-full ${
                    completedCount >= totalLessons
                      ? "bg-rose-500 hover:bg-rose-600"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {completedCount >= totalLessons
                    ? "Go to surprise 💝"
                    : "Continue lesson →"}
                </Button>
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
