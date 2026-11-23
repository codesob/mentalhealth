export interface MoodOption {
  name: string;
  color: string;
}

export const MOODS: MoodOption[] = [
  { name: 'Happy', color: '#16a34a' },
  { name: 'Calm', color: '#0d9488' },
  { name: 'Excited', color: '#db2777' },
  { name: 'Neutral', color: '#64748b' },
  { name: 'Tired', color: '#7c3aed' },
  { name: 'Sad', color: '#2563eb' },
  { name: 'Anxious', color: '#d97706' },
  { name: 'Angry', color: '#dc2626' },
];

export const MOOD_NAMES: string[] = MOODS.map((m) => m.name);

export const ACTIVITIES: string[] = [
  'Exercise',
  'Reading',
  'Music',
  'Socializing',
  'Meditation',
  'Creative work',
  'Work',
  'Gaming',
  'Cooking',
  'Walking',
  'Social media',
  'Resting',
];

export const MAX_NOTE_LENGTH = 1000;
