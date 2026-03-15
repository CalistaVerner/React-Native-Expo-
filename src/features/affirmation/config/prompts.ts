import type { Language } from '../../../shared/i18n';
import type { MoodId, MoodOption } from '../model/types';

export const MOODS: MoodOption[] = [
  { id: 'calm', icon: { name: 'spa', tone: 'accent' } },
  { id: 'neutral', icon: { name: 'sun', tone: 'primary', variant: 'regular' } },
  { id: 'stressed', icon: { name: 'bolt', tone: 'warning' } },
];

type LanguageAffirmationMap = Record<Language, Record<MoodId, string[]>>;

export const AFFIRMATION_LIBRARY: LanguageAffirmationMap = {
  en: {
    calm: [
      'You already carry the stillness you are looking for. Let today unfold gently.',
      'Stay soft, stay clear, and let your breath guide your focus.',
      'Peace is already here. Breathe slowly and move through the day with ease.',
    ],
    neutral: [
      'You do not need a perfect day to create a centered moment.',
      'Take one deep breath and begin again from where you are.',
      'Clarity grows when you slow down enough to hear yourself.',
    ],
    stressed: [
      'Nothing has to be solved in this second. First, let your body feel safe.',
      'Release the pressure from your shoulders. You are allowed to pause.',
      'Breathe in for calm, breathe out what is too heavy to carry right now.',
    ],
  },
  ru: {
    calm: [
      'Спокойствие уже внутри вас. Позвольте этому дню раскрыться мягко и уверенно.',
      'Останьтесь в тишине этого момента и позвольте дыханию вести вас дальше.',
      'Мир не нужно искать далеко. Он уже рядом — в этом вдохе и в этом выдохе.',
    ],
    neutral: [
      'Для внутреннего равновесия не нужен идеальный день. Достаточно одной осознанной паузы.',
      'Сделайте один глубокий вдох и спокойно начните заново с той точки, где вы сейчас.',
      'Ясность приходит тогда, когда вы даёте себе немного тишины.',
    ],
    stressed: [
      'Не всё нужно решать прямо сейчас. Сначала позвольте телу почувствовать безопасность.',
      'Отпустите напряжение в плечах. У вас есть право остановиться и перевести дыхание.',
      'Вдохните спокойствие и мягко отпустите всё, что сейчас слишком тяжело нести.',
    ],
  },
  de: {
    calm: [
      'Die Ruhe, die du suchst, ist bereits in dir. Lass diesen Tag sanft beginnen.',
      'Bleib weich, bleib klar und lass deinen Atem dich führen.',
      'Frieden ist schon da. Atme langsam und gehe mit Leichtigkeit durch den Tag.',
    ],
    neutral: [
      'Du brauchst keinen perfekten Tag, um einen ruhigen Moment zu schaffen.',
      'Atme einmal tief ein und beginne von dort neu, wo du gerade bist.',
      'Klarheit wächst, wenn du langsam genug wirst, um dich selbst zu hören.',
    ],
    stressed: [
      'Nicht alles muss in dieser Sekunde gelöst werden. Lass deinen Körper zuerst Sicherheit spüren.',
      'Löse den Druck aus deinen Schultern. Du darfst anhalten und durchatmen.',
      'Atme Ruhe ein und lass mit dem Ausatmen los, was gerade zu schwer geworden ist.',
    ],
  },
};

const PROMPT_TEMPLATES: Record<Language, (mood: MoodId) => string> = {
  en: (mood) =>
    `Generate a short premium meditation affirmation in English for a user who feels ${mood}. Tone: warm, calm, elegant. Length: 1-2 sentences.`,
  ru: (mood) =>
    `Сгенерируй короткую премиальную аффирмацию для медитации на русском языке для пользователя, который чувствует состояние: ${mood}. Тон: тёплый, спокойный, деликатный. Длина: 1–2 предложения.`,
  de: (mood) =>
    `Erzeuge eine kurze Premium-Meditationsaffirmation auf Deutsch für eine Person mit der Stimmung ${mood}. Ton: warm, ruhig, elegant. Länge: 1-2 Sätze.`,
};

export function buildAffirmationPrompt(language: Language, mood: MoodId) {
  return (PROMPT_TEMPLATES[language] ?? PROMPT_TEMPLATES.en)(mood);
}
