import { useCallback, useState } from 'react';
import type { Language } from '../../../shared/i18n';
import { generateAffirmation } from './generateAffirmation';
import type { MoodId } from '../model/types';

export function useAffirmationController(language: Language) {
  const [selectedMood, setSelectedMood] = useState<MoodId>('neutral');
  const [affirmationText, setAffirmationText] = useState('');
  const [lastPrompt, setLastPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAffirmation(language, selectedMood);
      setAffirmationText(result.text);
      setLastPrompt(result.prompt);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, language, selectedMood]);

  return {
    selectedMood,
    setSelectedMood,
    affirmationText,
    lastPrompt,
    isGenerating,
    handleGenerate,
  };
}
