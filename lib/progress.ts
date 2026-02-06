export type Progress = { completed: string[] };

const KEY = "valenlingo_progress_v1";

export function loadProgress(): Progress {
  if (typeof window === "undefined") return { completed: [] };
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : { completed: [] };
  } catch {
    return { completed: [] };
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(KEY, JSON.stringify(progress));
}

export function markCompleted(progress: Progress, lessonId: string): Progress {
  if (progress.completed.includes(lessonId)) return progress;
  return { ...progress, completed: [...progress.completed, lessonId] };
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}
