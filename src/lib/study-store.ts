import type { StudySet } from "./study.functions";
import { dummyFlashcards, dummyQuiz } from "./study-data";

const KEY = "taleem:study-set";

export function saveStudySet(set: StudySet) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(set));
  } catch {
    // ignore
  }
}

export function loadStudySet(): StudySet {
  if (typeof window === "undefined") {
    return fallback();
  }
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return fallback();
    return JSON.parse(raw) as StudySet;
  } catch {
    return fallback();
  }
}

function fallback(): StudySet {
  return {
    topic: "Sample study set",
    flashcards: dummyFlashcards,
    quiz: dummyQuiz,
  };
}