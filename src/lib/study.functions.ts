import { createServerFn } from "@tanstack/react-start";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const InputSchema = z.object({ notes: z.string().min(10) });

const FlashcardsSchema = z.object({
  topic: z.string(),
  flashcards: z.array(z.object({ front: z.string(), back: z.string() })),
});

const QuizSchema = z.object({
  topic: z.string(),
  quiz: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      answer: z.number(),
    }),
  ),
});

export type Flashcard = { front: string; back: string };
export type QuizQuestion = { question: string; options: string[]; answer: number };
export type FlashcardSet = { topic: string; flashcards: Flashcard[] };
export type QuizSet = { topic: string; quiz: QuizQuestion[] };
export type StudySet = FlashcardSet & QuizSet;

// ~10000 words of notes
const MAX_CHARS = 64000;

export const generateFlashcards = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<FlashcardSet> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key, { structuredOutputs: true });

    const prompt = `You are an expert study assistant. Study the notes below in depth and cover ALL key points, definitions, dates, formulas, processes and examples.

Produce:
- a short "topic" title (max 60 chars)
- exactly 50 flashcards ({ front: a clear question or prompt, back: a short precise answer })

Spread the flashcards evenly across the whole material — do not over-focus on the beginning. No duplicates.

NOTES:
"""
${data.notes.slice(0, MAX_CHARS)}
"""`;

    try {
      const { output } = await generateText({
        model: gateway("openai/gpt-5.5"),
        output: Output.object({ schema: FlashcardsSchema }),
        prompt,
      });
      return {
        topic: output.topic.slice(0, 80),
        flashcards: output.flashcards.slice(0, 50),
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("The AI response could not be parsed. Please try again.");
      }
      throw error;
    }
  });

export const generateQuiz = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<QuizSet> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key, { structuredOutputs: true });

    const prompt = `You are an expert study assistant. Study the notes below in depth and cover all key points.

Produce:
- a short "topic" title (max 60 chars)
- exactly 30 multiple-choice questions, each with exactly 4 plausible options and "answer" as the 0-based index of the correct option.

Spread questions across the whole material. No duplicates.

NOTES:
"""
${data.notes.slice(0, MAX_CHARS)}
"""`;

    try {
      const { output } = await generateText({
        model: gateway("openai/gpt-5.5"),
        output: Output.object({ schema: QuizSchema }),
        prompt,
      });
      return {
        topic: output.topic.slice(0, 80),
        quiz: output.quiz.slice(0, 30).map((q) => ({
          ...q,
          options: q.options.slice(0, 4),
          answer: Math.max(0, Math.min(3, q.answer)),
        })),
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("The AI response could not be parsed. Please try again.");
      }
      throw error;
    }
  });
