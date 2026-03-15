import type { AppIconSpec } from '../../../shared/ui/AppIcon';

export type MoodId = 'calm' | 'neutral' | 'stressed';

export type MoodOption = {
  id: MoodId;
  icon: AppIconSpec;
};
