"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Button, Card, Pill } from "@/components/ui";

function burst() {
  confetti({
    particleCount: 180,
    spread: 80,
    origin: { y: 0.7 },
  });
}

export default function CompletePage() {
  useEffect(() => {
    burst();
  }, []);

  return (
    <div className="min-h-screen px-5 py-10">
      <div className="mx-auto max-w-xl space-y-6">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="bg-white shadow-md">
            <div className="space-y-4 text-center">
              <Pill>Level complete ✅</Pill>

              <h1 className="text-3xl font-black text-slate-900">
                You finished the lessons 🎉
              </h1>

              <p className="mx-auto max-w-md text-slate-600">
                Ready for the final question?
              </p>

              <Link href="/yes">
                <Button className="w-full bg-rose-500 hover:bg-rose-600">
                  Go to the surprise 💝
                </Button>
              </Link>

              <Button
                className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                onClick={burst}
              >
                Celebrate again ✨
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
