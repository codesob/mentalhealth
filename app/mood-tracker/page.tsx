import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import MoodForm from './MoodForm';
import MoodHistory from './MoodHistory';
import { HistorySkeleton } from './skeleton';
import styles from './mood.module.css';

export const metadata: Metadata = {
  title: 'Mood tracker | MindHeal',
  description: 'Log how you feel each day and review your recent patterns.',
};

export default async function MoodTrackerPage() {
  // middleware.ts already redirects anonymous visitors; this is the
  // defence-in-depth check, and it provides the user id for the query.
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/mood-tracker');
  }

  return (
    <Layout>
      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Mood tracker</h1>
          <p className={styles.lead}>Log how you feel and review your recent patterns.</p>
        </header>

        {/* The form renders immediately; history streams in once the query finishes. */}
        <MoodForm />

        <Suspense fallback={<HistorySkeleton />}>
          <MoodHistory userId={session.user.id} />
        </Suspense>
      </div>
    </Layout>
  );
}
