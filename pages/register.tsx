import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import userService from '../services/userService';
import styles from '../styles/Auth.module.css';

const MIN_PASSWORD_LENGTH = 8;

const Register = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');

        if (form.password.length < MIN_PASSWORD_LENGTH) {
            setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            await userService.register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            });
            router.push('/login?registered=true');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Create account | MindHeal</title>
            </Head>
            <div className={styles.wrap}>
                <div className={`card ${styles.panel}`}>
                    <h1 className={styles.title}>Create your account</h1>
                    <p className={styles.subtitle}>It only takes a minute.</p>

                    {error && (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="fullName" className={styles.label}>
                                Full name
                            </label>
                            <input
                                id="fullName"
                                className="input"
                                autoComplete="name"
                                value={form.fullName}
                                onChange={update('fullName')}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input"
                                autoComplete="email"
                                value={form.email}
                                onChange={update('email')}
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
                                autoComplete="new-password"
                                value={form.password}
                                onChange={update('password')}
                                required
                            />
                            <span className={styles.hint}>At least {MIN_PASSWORD_LENGTH} characters.</span>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="confirmPassword" className={styles.label}>
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="input"
                                autoComplete="new-password"
                                value={form.confirmPassword}
                                onChange={update('confirmPassword')}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary ${styles.submit}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account…' : 'Create account'}
                        </button>
                    </form>

                    <p className={styles.alt}>
                        Already have an account? <Link href="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
