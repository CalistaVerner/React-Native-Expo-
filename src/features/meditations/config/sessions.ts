import sessionsJson from '../../../../assets/content/meditations/sessions.json';

export type Session = {
  id: string;
  title: string;
  duration: string;
  image: string;
  premium: boolean;
  category: string;
};

export const SESSIONS: Session[] = sessionsJson.map((session) => ({
  id: session.id,
  title: session.title,
  duration: session.duration,
  image: session.image,
  premium: session.premium,
  category: session.category,
}));
