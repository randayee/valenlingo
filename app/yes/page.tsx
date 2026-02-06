"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Button, Card, Pill } from "@/components/ui";
import { resetProgress } from "@/lib/progress";

function burst() {
  confetti({
    particleCount: 220,
    spread: 90,
    origin: { y: 0.65 },
  });
}

export default function YesPage() {
  useEffect(() => {
    burst();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-xl space-y-6">
        {/* top row */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Back home
          </Link>

          <button
            onClick={() => {
              resetProgress();
              burst();
            }}
            className="text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            Reset (testing)
          </button>
        </div>

        {/* main reveal card */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="bg-white shadow-md">
            <div className="space-y-4 text-center">
              <Pill>Surprise unlocked 💝</Pill>

              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Veux-tu être ma Valentine ?
              </h1>

              <p className="mx-auto max-w-md text-slate-600">
                I decided to be a little extra this year and made this since you love Duolingo so much so hopefully it gives a similar vibe.
              </p>

              <div className="grid gap-2">
                <Button
                  className="w-full bg-rose-500 hover:bg-rose-600"
                  onClick={burst}
                >
                  Yes 💘
                </Button>

                <Button
                  className="w-full bg-slate-900 hover:bg-slate-800"
                  onClick={burst}
                >
                  Yes, obviously 😌
                </Button>
              </div>

              <div className="pt-2 text-xs text-slate-500">
                (Both buttons say yes. I’m not risking it.)
              </div>
            </div>
          </Card>
        </motion.div>

        {/* plan + note cards */}
        <div className="grid gap-4">
          <Card className="bg-white">
            <div className="space-y-2">
              <div className="text-sm font-black text-slate-900">Valentines Plans</div>
              <div className="text-slate-700">
                Sushi dinner since what else?
              </div>
              <div className="text-xs text-slate-500">
                (unless you would like to try something else 🤔)
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="space-y-2">
              <div className="text-sm font-black text-slate-900">A little note</div>
              <p className="text-slate-700 leading-relaxed">
                I’m really lucky to have you. Thank you for everything you do for me and Poppy. I love you
                more than I can put into words. 💛
              </p>
            </div>
          </Card>
        </div>

        {/* optional footer link */}
        <div className="text-center">
          <Link
            href="/learn"
            className="text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            Replay the lessons →
          </Link>
        </div>
      </div>
    </div>
  );
}
