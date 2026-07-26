export type Flashcard = { front: string; back: string };
export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};

export const dummyFlashcards: Flashcard[] = [
  { front: "What is photosynthesis?", back: "The process plants use to convert light into chemical energy." },
  { front: "Define mitochondria", back: "The organelle that produces ATP — the cell's powerhouse." },
  { front: "What is Newton's 1st law?", back: "An object at rest stays at rest unless acted on by a force." },
  { front: "What is a prime number?", back: "A number greater than 1 divisible only by 1 and itself." },
  { front: "What does DNA stand for?", back: "Deoxyribonucleic acid." },
  { front: "What is the capital of Japan?", back: "Tokyo." },
  { front: "Speed of light?", back: "≈ 299,792 km/s." },
  { front: "What is O(n log n)?", base: "", back: "Time complexity of efficient comparison sorts like mergesort." } as Flashcard,
  { front: "What is a mole in chemistry?", back: "6.022 × 10²³ particles (Avogadro's number)." },
  { front: "What is the Pythagorean theorem?", back: "a² + b² = c² for right triangles." },
];

export const dummyQuiz: QuizQuestion[] = [
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
    answer: 1,
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: 2,
  },
  {
    question: "2 + 2 × 2 = ?",
    options: ["6", "8", "4", "10"],
    answer: 0,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Dickens", "Shakespeare", "Austen", "Tolstoy"],
    answer: 1,
  },
  {
    question: "H2O is the chemical formula for?",
    options: ["Salt", "Oxygen", "Water", "Hydrogen peroxide"],
    answer: 2,
  },
];