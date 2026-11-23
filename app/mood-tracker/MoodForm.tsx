'use client';

import { useState } from 'react';
import { ACTIVITIES, MAX_NOTE_LENGTH, MOODS } from '../../lib/moods';
import { saveMoodEntry } from './actions';
import styles from './mood.module.css';

export default function MoodForm() {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedMood || isSaving) return;

    setIsSaving(true);
    setError('');
    setSaved(false);

    try {
      // Calls the Server Action directly; no API route or fetch needed.
      const result = await saveMoodEntry({
        mood: selectedMood,
        intensity,
        note,
        activities: selectedActivities,
      });

      if (result.ok) {
        setSelectedMood('');
        setIntensity(5);
        setNote('');
        setSelectedActivities([]);
        setSaved(true);
      } else {
        setError(result.error);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={`card ${styles.section}`} onSubmit={handleSubmit}>
      <h2 className={styles.sectionTitle}>How are you feeling?</h2>

      <div className={styles.moodGrid} role="group" aria-label="Mood">
        {MOODS.map((mood) => {
          const active = selectedMood === mood.name;
          return (
            <button
              type="button"
              key={mood.name}
              aria-pressed={active}
              className={`${styles.chip} ${active ? styles.chipActive : ''}`}
              onClick={() => {
                setSelectedMood(mood.name);
                setSaved(false);
              }}
            >
              <span className={styles.dot} style={{ background: mood.color }} aria-hidden="true" />
              {mood.name}
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <>
          <label className={styles.fieldLabel} htmlFor="intensity">
            Intensity: {intensity} / 10
          </label>
          <input
            id="intensity"
            className={styles.range}
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
          />

          <span className={styles.fieldLabel} id="activities-label">
            Activities
          </span>
          <div className={styles.chips} role="group" aria-labelledby="activities-label">
            {ACTIVITIES.map((activity) => {
              const active = selectedActivities.includes(activity);
              return (
                <button
                  type="button"
                  key={activity}
                  aria-pressed={active}
                  className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                  onClick={() => toggleActivity(activity)}
                >
                  {activity}
                </button>
              );
            })}
          </div>

          <label className={styles.fieldLabel} htmlFor="note">
            Note (optional)
          </label>
          <textarea
            id="note"
            className={`input ${styles.textarea}`}
            value={note}
            maxLength={MAX_NOTE_LENGTH}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything you want to remember about today"
          />

          <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save entry'}
          </button>
        </>
      )}

      <div role="status" aria-live="polite">
        {error && <p className={styles.error}>{error}</p>}
        {saved && <p className={styles.success}>Entry saved.</p>}
      </div>
    </form>
  );
}
