import { createServerFn } from "@tanstack/react-start";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const InputSchema = z.object({ notes: z.string().min(10) });

const StudySchema = z.object({
  topic: z.string(),
  flashcards: z.array(
    z.object({ front: z.string(), back: z.string() }),
  ),
  quiz: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      answer: z.number(),
    }),
  ),
});

export type StudySet = z.infer<typeof StudySchema>;

export const generateStudySet = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<StudySet> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key, {
      structuredOutputs: true,
    });

    const prompt = `You are a study assistant. From the notes below, produce:
- a short "topic" title (max 60 chars)
- exactly 10 concise flashcards ({ front: question, back: short answer })
- exactly 5 multiple-choice quiz questions, each with exactly 4 options and an "answer" that is the 0-based index of the correct option.

Focus on the most important facts. Keep language simple and clear.

NOTES:
"""
${data.notes.slice(0, 8000)}
"""`;

    try {
      const { output } = await generateText({
        model: gateway("openai/gpt-5.5"),
        output: Output.object({ schema: StudySchema }),
        prompt,
      });

      // Clamp to expected counts and sanitize
      return {
        topic: output.topic.slice(0, 80),
        flashcards: output.flashcards.slice(0, 10),
        quiz: output.quiz
          .slice(0, 5)
          .map((q) => ({
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