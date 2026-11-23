import prisma from '../../lib/prisma';
import { MOODS } from '../../lib/moods';
import { getInsights, getMoodStats } from '../../lib/moodInsights';
import LocalTime from './LocalTime';
import styles from './mood.module.css';

// Async Server Component: queries the database on the server and streams in
// behind the <Suspense> boundary in page.tsx. None of this code ships to the browser.
export default async function MoodHistory({ userId }: { userId: string }) {
  const entries = await prisma.moodEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  if (entries.length === 0) {
    return (
      <section className={`card ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Recent entries</h2>
        <p className={styles.empty}>No entries yet. Log your first one above.</p>
      </section>
    );
  }

  const stats = getMoodStats(entries);
  const insights = getInsights(entries, stats);

  return (
    <>
      {stats && (
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}>Last 7 days</h2>
          <div className={styles.stats}>
            <Stat label="Most common mood" value={stats.mostCommonMood} />
            <Stat label="Average intensity" value={`${stats.avgIntensity.toFixed(1)} / 10`} />
            <Stat label="Entries" value={String(stats.entriesCount)} />
          </div>
        </section>
      )}

      {insights.length > 0 && (
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}>Observations</h2>
          <div className={styles.insights}>
            {insights.map((insight) => (
              <div
                key={insight.title}
                className={`${styles.insight} ${styles[`insight_${insight.type}`]}`}
              >
                <div className={styles.insightTitle}>{insight.title}</div>
                <div className={styles.insightBody}>{insight.message}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="card">
        <h2 className={styles.sectionTitle}>Recent entries</h2>
        <ul className={styles.entries}>
          {entries.slice(0, 5).map((entry) => {
            const color = MOODS.find((m) => m.name === entry.mood)?.color ?? '#64748b';
            return (
              <li key={entry.id} className={styles.entry}>
                <div className={styles.entryTop}>
                  <span className={styles.dot} style={{ background: color }} aria-hidden="true" />
                  <div>
                    <div className={styles.entryMood}>{entry.mood}</div>
                    <div className={styles.entryTime}>
                      <LocalTime iso={entry.createdAt.toISOString()} />
                    </div>
                  </div>
                  <div className={styles.entryIntensity}>{entry.intensity} / 10</div>
                </div>

                {entry.activities.length > 0 && (
                  <div className={styles.tags}>
                    {entry.activities.map((activity) => (
                      <span key={activity} className={styles.tag}>
                        {activity}
                      </span>
                    ))}
                  </div>
                )}

                {entry.note && <p className={styles.note}>{entry.note}</p>}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}
