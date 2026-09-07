import type { FlashcardSet, QuizSet } from "./study.functions";


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

export function loadFlashcardSet(): FlashcardSet | null {
  const set = load<FlashcardSet | null>(FLASH_KEY, null);
  return set && set.flashcards?.length ? set : null;
}

export function loadQuizSet(): QuizSet | null {
  const set = load<QuizSet | null>(QUIZ_KEY, null);
  return set && set.quiz?.length ? set : null;
}
