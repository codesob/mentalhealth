'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import prisma from '../../lib/prisma';
import { ACTIVITIES, MAX_NOTE_LENGTH, MOOD_NAMES } from '../../lib/moods';

export type SaveMoodResult = { ok: true } | { ok: false; error: string };

interface SaveMoodInput {
  mood: string;
  intensity: number;
  note: string;
  activities: string[];
}

/**
 * Server Action: saves one mood entry for the signed-in user.
 * Server Actions are public POST endpoints, so the session and every
 * field are checked here, never trusted from the client.
 */
export async function saveMoodEntry(input: SaveMoodInput): Promise<SaveMoodResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { ok: false, error: 'Please sign in to save your mood.' };
  }

  const { mood, intensity, note, activities } = input ?? ({} as SaveMoodInput);

  if (typeof mood !== 'string' || !MOOD_NAMES.includes(mood)) {
    return { ok: false, error: 'Please choose a mood.' };
  }
  if (!Number.isInteger(intensity) || intensity < 1 || intensity > 10) {
    return { ok: false, error: 'Intensity must be between 1 and 10.' };
  }
  if (typeof note !== 'string' || note.length > MAX_NOTE_LENGTH) {
    return { ok: false, error: `Notes can be up to ${MAX_NOTE_LENGTH} characters.` };
  }
  if (
    !Array.isArray(activities) ||
    activities.length > ACTIVITIES.length ||
    !activities.every((a) => typeof a === 'string' && ACTIVITIES.includes(a))
  ) {
    return { ok: false, error: 'Invalid activities.' };
  }

  try {
    await prisma.moodEntry.create({
      data: {
        userId: session.user.id,
        mood,
        intensity,
        note: note.trim() || null,
        activities: Array.from(new Set(activities)),
      },
    });
  } catch (err) {
    console.error('saveMoodEntry failed', err);
    return { ok: false, error: 'Could not save your entry. Please try again.' };
  }

  // Re-renders the server components on this route so the history, stats
  // and insights update without a client-side refetch.
  revalidatePath('/mood-tracker');
  return { ok: true };
}
