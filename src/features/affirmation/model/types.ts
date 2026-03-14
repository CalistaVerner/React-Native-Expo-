import type { AppIconName } from '../../../shared/ui/AppIcon';

export type MoodId = 'calm' | 'neutral' | 'stressed';

export type MoodOption = {
  id: MoodId;
  icon: AppIconName;
};
