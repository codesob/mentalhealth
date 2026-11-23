import { HistorySkeleton } from './skeleton';
import styles from './mood.module.css';

// Route-level loading UI: shown immediately on navigation while the page's
// session check runs, then replaced by the real page.
export default function Loading() {
  return (
    <div className={`container ${styles.page}`}>
      <HistorySkeleton />
    </div>
  );
}
