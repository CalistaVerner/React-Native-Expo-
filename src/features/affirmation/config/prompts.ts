import affirmationLibraryJson from '../../../../assets/content/affirmations/library.json';
import moodsJson from '../../../../assets/content/affirmations/moods.json';
import promptTemplatesJson from '../../../../assets/content/affirmations/prompts.json';
import type { Language } from '../../../shared/i18n';
import type { MoodId, MoodOption } from '../model/types';
import type { AppIconSpec } from '../../../shared/ui/AppIcon';

export const MOODS: MoodOption[] = moodsJson.map((mood) => ({
  id: mood.id as MoodId,
  icon: mood.icon as AppIconSpec,
}));

type LanguageAffirmationMap = Record<Language, Record<MoodId, string[]>>;

export const AFFIRMATION_LIBRARY: LanguageAffirmationMap = affirmationLibraryJson as LanguageAffirmationMap;

const PROMPT_TEMPLATES: Record<Language, string> = promptTemplatesJson as Record<Language, string>;

export function buildAffirmationPrompt(language: Language, mood: MoodId) {
  const template = PROMPT_TEMPLATES[language] ?? PROMPT_TEMPLATES.en;
  return template.replaceAll('{{mood}}', mood);
}
