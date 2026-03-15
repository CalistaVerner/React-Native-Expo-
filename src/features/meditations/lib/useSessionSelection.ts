import { useMemo, useState } from 'react';
import { createLogger } from '../../../shared/lib/logger';
import type { Session } from '../config/sessions';

const logger = createLogger('meditations:selection');

export function useSessionSelection(sessions: Session[]) {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) ?? null,
    [sessions, selectedSessionId]
  );

  return {
    selectedSessionId,
    selectedSession,
    selectSession: (session: Session) => {
      logger.info('Session selected', { sessionId: session.id, title: session.title });
      setSelectedSessionId(session.id);
    },
  };
}
