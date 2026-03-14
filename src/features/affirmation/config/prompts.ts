import type { MoodId, MoodOption } from '../model/types';

export const MOODS: MoodOption[] = [
  { id: 'calm', emoji: '😌' },
  { id: 'neutral', emoji: '🙂' },
  { id: 'stressed', emoji: '😣' },
];

export const AFFIRMATION_LIBRARY: Record<MoodId, string[]> = {
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
};

export function buildAffirmationPrompt(mood: MoodId) {
  return `Generate a short premium meditation affirmation for a user who feels ${mood}. Tone: warm, calm, elegant. Length: 1-2 sentences.`;
}
