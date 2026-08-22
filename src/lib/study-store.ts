import type { FlashcardSet, QuizSet } from "./study.functions";
import { dummyFlashcards, dummyQuiz } from "./study-data";

const FLASH_KEY = "taleem:flashcards";
const QUIZ_KEY = "taleem:quiz";

function save(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveFlashcardSet(set: FlashcardSet) {
  save(FLASH_KEY, set);
}

export function saveQuizSet(set: QuizSet) {
  save(QUIZ_KEY, set);
}

export function loadFlashcardSet(): FlashcardSet {
  return load<FlashcardSet>(FLASH_KEY, {
    topic: "Sample flashcards",
    flashcards: dummyFlashcards,
  });
}

export function loadQuizSet(): QuizSet {
  return load<QuizSet>(QUIZ_KEY, { topic: "Sample quiz", quiz: dummyQuiz });
}
