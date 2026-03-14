import { APP_CONFIG } from '../../../shared/config/app.config';
import type { Language } from '../../../shared/i18n';
import { AFFIRMATION_LIBRARY, buildAffirmationPrompt } from '../config/prompts';
import type { MoodId } from '../model/types';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateAffirmation(language: Language, mood: MoodId | null | undefined) {
  const safeLanguage: Language = language ?? 'en';
  const safeMood: MoodId = mood ?? 'neutral';
  const prompt = buildAffirmationPrompt(safeLanguage, safeMood);
  const languageLibrary = AFFIRMATION_LIBRARY[safeLanguage] ?? AFFIRMATION_LIBRARY.en;
  const variants = languageLibrary[safeMood] ?? languageLibrary.neutral;
  const text = variants[Math.floor(Math.random() * variants.length)] ?? languageLibrary.neutral[0];

  await sleep(APP_CONFIG.moodGenerationDelayMs);

  return {
    prompt,
    text,
  };
}
