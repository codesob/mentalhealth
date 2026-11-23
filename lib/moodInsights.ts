export interface MoodEntryView {
  id: string;
  mood: string;
  intensity: number;
  note: string | null;
  activities: string[];
  createdAt: Date;
}

export interface MoodStats {
  mostCommonMood: string;
  avgIntensity: number;
  entriesCount: number;
}

export interface MoodInsight {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
}

const DAY_MS = 1000 * 60 * 60 * 24;

/** Stats for the last 7 days, or null when there are no entries in that window. */
export function getMoodStats(entries: MoodEntryView[], now: Date = new Date()): MoodStats | null {
  const lastWeek = entries.filter(
    (entry) => (now.getTime() - entry.createdAt.getTime()) / DAY_MS <= 7
  );
  if (lastWeek.length === 0) return null;

  const counts = new Map<string, number>();
  for (const entry of lastWeek) {
    counts.set(entry.mood, (counts.get(entry.mood) ?? 0) + 1);
  }
  const [mostCommonMood] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0];

  const avgIntensity = lastWeek.reduce((sum, e) => sum + e.intensity, 0) / lastWeek.length;

  return { mostCommonMood, avgIntensity, entriesCount: lastWeek.length };
}

/**
 * Simple rule-based observations from recent entries (newest first).
 * This is plain logic over the user's own data; no model is involved.
 */
export function getInsights(entries: MoodEntryView[], stats: MoodStats | null): MoodInsight[] {
  if (!stats) return [];

  const insights: MoodInsight[] = [];

  if (stats.mostCommonMood === 'Sad' || stats.mostCommonMood === 'Anxious') {
    insights.push({
      type: 'warning',
      title: 'Recurring low mood',
      message: `You have logged "${stats.mostCommonMood.toLowerCase()}" most often this week. If this continues, consider talking to a professional.`,
    });
  }

  if (stats.avgIntensity > 7) {
    insights.push({
      type: 'info',
      title: 'High intensity',
      message:
        'Your average intensity this week is high. Grounding or breathing exercises may help.',
    });
  }

  if (stats.entriesCount >= 5) {
    insights.push({
      type: 'success',
      title: 'Consistent tracking',
      message: `You logged ${stats.entriesCount} entries this week. Regular entries make patterns easier to spot.`,
    });
  }

  const activityCounts = new Map<string, number>();
  for (const activity of entries.slice(0, 7).flatMap((e) => e.activities)) {
    activityCounts.set(activity, (activityCounts.get(activity) ?? 0) + 1);
  }

  if ((activityCounts.get('Exercise') ?? 0) >= 3) {
    insights.push({
      type: 'success',
      title: 'Regular exercise',
      message: 'Exercise appears in several recent entries. It is a well-supported mood booster.',
    });
  }

  if ((activityCounts.get('Meditation') ?? 0) >= 2) {
    insights.push({
      type: 'success',
      title: 'Meditation practice',
      message: 'You have been meditating regularly. Keep an eye on how it affects your mood.',
    });
  }

  return insights;
}
