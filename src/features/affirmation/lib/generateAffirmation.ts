import { APP_CONFIG } from '../../../shared/config/app.config';
import { AFFIRMATION_LIBRARY, buildAffirmationPrompt } from '../config/prompts';
import type { MoodId } from '../model/types';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateAffirmation(mood: MoodId | null | undefined) {
  const safeMood: MoodId = mood ?? 'neutral';
  const prompt = buildAffirmationPrompt(safeMood);
  const variants = AFFIRMATION_LIBRARY[safeMood] ?? AFFIRMATION_LIBRARY.neutral;
  const text = variants[Math.floor(Math.random() * variants.length)] ?? AFFIRMATION_LIBRARY.neutral[0];

  await sleep(APP_CONFIG.moodGenerationDelayMs);

  return {
    prompt,
    text,
  };
}
