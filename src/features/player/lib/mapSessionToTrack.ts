import type { Session } from '../../meditations/config/sessions';
import type { PlayerTrack } from '../model/types';
import { parseDurationLabelToSeconds } from './formatPlayback';

export function mapSessionToPlayerTrack(session: Session): PlayerTrack {
  return {
    id: session.id,
    title: session.title,
    subtitle: `${session.category} · ${session.duration}`,
    durationLabel: session.duration,
    durationSeconds: parseDurationLabelToSeconds(session.duration),
    artworkUri: session.image,
    category: session.category,
  };
}
