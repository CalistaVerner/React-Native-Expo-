export type Session = {
  id: string;
  title: string;
  duration: string;
  image: string;
  premium: boolean;
  category: string;
};

export const SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Deep Sleep Reset',
    duration: '12 min',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    premium: false,
    category: 'Sleep',
  },
  {
    id: '2',
    title: 'Focus in the Noise',
    duration: '9 min',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    premium: false,
    category: 'Focus',
  },
  {
    id: '3',
    title: 'Anxiety Release',
    duration: '14 min',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    premium: true,
    category: 'Stress',
  },
  {
    id: '4',
    title: 'Morning Clarity',
    duration: '7 min',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    premium: true,
    category: 'Morning',
  },
  {
    id: '5',
    title: 'Breathing for Reset',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=80',
    premium: true,
    category: 'Breathwork',
  },
];
