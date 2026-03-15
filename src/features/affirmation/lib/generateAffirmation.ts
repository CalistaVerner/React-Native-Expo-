import { APP_CONFIG } from '../../../shared/config/app.config';
import type { Language } from '../../../shared/i18n';
import { createLogger } from '../../../shared/lib/logger';
import { AFFIRMATION_LIBRARY, buildAffirmationPrompt } from '../config/prompts';
import type { MoodId } from '../model/types';

const logger = createLogger('affirmation:generator');

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

  logger.info('Generating affirmation', {
    language: safeLanguage,
    mood: safeMood,
    variants: variants.length,
  });

  await sleep(APP_CONFIG.moodGenerationDelayMs);

  logger.info('Affirmation generated', {
    language: safeLanguage,
    mood: safeMood,
    preview: text.slice(0, 48),
  });

  return {
    prompt,
    text,
  };
}
