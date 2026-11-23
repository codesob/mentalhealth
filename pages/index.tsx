import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

const FEATURES = [
    {
        href: '/mood-tracker',
        title: 'Mood tracker',
        text: 'Log how you feel each day and review your recent patterns.',
    },
    {
        href: '/ai-journal',
        title: 'Journal',
        text: 'Write down your thoughts and look back on them over time.',
    },
    {
        href: '/ai-therapy',
        title: 'Assistant',
        text: 'Talk things through with an automated assistant. It is not a therapist.',
    },
    {
        href: '/chat',
        title: 'Community',
        text: 'Add friends and message them privately.',
    },
];

const Home = () => (
    <Layout>
        <Head>
            <title>MindHeal</title>
            <meta
                name="description"
                content="Track your mood, keep a journal and stay connected. A self-help tool for everyday wellbeing."
            />
        </Head>

        <div className="container">
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Tools for everyday mental wellbeing</h1>
                <p className={styles.heroText}>
                    Track your mood, keep a journal and stay connected with people you trust.
                </p>
                <div className={styles.heroActions}>
                    <Link href="/register" className="btn btn-primary">
                        Create account
                    </Link>
                    <Link href="/login" className="btn btn-secondary">
                        Sign in
                    </Link>
                </div>
            </section>

            <section className={styles.features} aria-label="Features">
                {FEATURES.map((feature) => (
                    <Link key={feature.href} href={feature.href} className={`card ${styles.feature}`}>
                        <h2 className={styles.featureTitle}>{feature.title}</h2>
                        <p className={styles.featureText}>{feature.text}</p>
                    </Link>
                ))}
            </section>

            <p className={styles.note}>
                MindHeal is a self-help tool and does not replace professional care. If you are in
                immediate danger or thinking about harming yourself, contact your local emergency
                services or someone you trust right away.
            </p>
        </div>
    </Layout>
);

export default Home;
