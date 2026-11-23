import styles from './mood.module.css';

// Shown while the server streams in the stats and history for this user.
export function HistorySkeleton() {
  return (
    <section className="card" aria-busy="true" aria-label="Loading your entries">
      <div className={styles.skeletonBar} style={{ width: '30%' }} />
      <div className={styles.skeletonBar} style={{ width: '100%' }} />
      <div className={styles.skeletonBar} style={{ width: '85%' }} />
      <div className={styles.skeletonBar} style={{ width: '92%' }} />
    </section>
  );
}
