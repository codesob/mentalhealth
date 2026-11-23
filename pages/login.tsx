import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';
import styles from '../styles/Auth.module.css';

// Only allow same-site relative redirects after sign-in.
function safeCallbackUrl(value: string | string[] | undefined): string {
    const url = Array.isArray(value) ? value[0] : value;
    return url && url.startsWith('/') && !url.startsWith('//') ? url : '/';
}

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const justRegistered = router.query.registered === 'true';

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await signIn('credentials', { redirect: false, email, password });

        if (result?.ok) {
            router.push(safeCallbackUrl(router.query.callbackUrl));
        } else {
            setError('Invalid email or password.');
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Sign in | MindHeal</title>
            </Head>
            <div className={styles.wrap}>
                <div className={`card ${styles.panel}`}>
                    <h1 className={styles.title}>Sign in</h1>
                    <p className={styles.subtitle}>Welcome back.</p>

                    {justRegistered && !error && (
                        <p className={styles.success}>Account created. You can sign in now.</p>
                    )}
                    {error && (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="input"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary ${styles.submit}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>

                    <p className={styles.alt}>
                        New here? <Link href="/register">Create an account</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
