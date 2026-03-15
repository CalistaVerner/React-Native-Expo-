import { useMemo } from 'react';
import { useAppContext } from '../../app/state/AppContext';
import { SCREEN_IDS } from '../../app/navigation/screenIds';
import { useAffirmationController } from '../../features/affirmation/lib/useAffirmationController';
import { SESSIONS } from '../../features/meditations/config/sessions';
import { useSessionSelection } from '../../features/meditations/lib/useSessionSelection';
import { mapSessionToPlayerTrack } from '../../features/player/lib/mapSessionToTrack';
import { usePlayer } from '../../features/player/PlayerProvider';
import { FEATURE_FLAGS } from '../../shared/config/featureFlags';
import { useToast } from '../../shared/ui/toast/ToastProvider';

export function useMeditationsScreenModel() {
  const { theme, t, isSubscribed, setScreen, regionCode, language } = useAppContext();
  const affirmation = useAffirmationController(language);
  const selection = useSessionSelection(SESSIONS);
  const player = usePlayer();
  const { showToast } = useToast();

  const librarySessions = useMemo(() => SESSIONS, []);
  const playerQueue = useMemo(() => SESSIONS.map(mapSessionToPlayerTrack), []);

  return {
    theme,
    t,
    isSubscribed,
    regionCode,
    flags: FEATURE_FLAGS.meditations,
    librarySessions,
    affirmation: {
      ...affirmation,
      handleGenerate: async () => {
        await affirmation.handleGenerate();
        showToast({
          title: t.meditations.affirmationToastTitle,
          message: t.meditations.affirmationToastText,
          variant: 'success',
          icon: { name: 'star', tone: 'accent' },
        });
      },
    },
    selection: {
      ...selection,
      selectSession: (session: (typeof SESSIONS)[number]) => {
        selection.selectSession(session);
        player.openTrack(mapSessionToPlayerTrack(session), playerQueue);
      },
    },
    openSettings: () => setScreen(SCREEN_IDS.preferences),
    openPaywall: () => {
      showToast({
        title: t.meditations.lockedToastTitle,
        message: t.meditations.lockedToastText,
        variant: 'warning',
        icon: { name: 'lock', tone: 'warning' },
      });
      setScreen(SCREEN_IDS.paywall);
    },
  };
}
