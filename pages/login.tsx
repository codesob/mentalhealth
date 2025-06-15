import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Auth.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (router.query.registered) {
            setSuccess('Registration successful! Please log in.');
        }
    }, [router.query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    remember: formData.remember
                }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                const data = await response.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Login to continue your journey</p>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <div className={styles.formGroup} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                        />
                        Remember me
                    </label>
                    <Link href="/forgot-password" className={styles.link} style={{ marginLeft: 'auto' }}>
                        Forgot Password?
                    </Link>
                </div>

                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            <div className={styles.separator}>Or continue with</div>

            <div className={styles.socialLogin}>
                <button className={styles.socialButton} onClick={() => router.push('/api/auth/google')}>
                    <Image src="/google.svg" alt="Google" width={20} height={20} className={styles.socialIcon} />
                    Google
                </button>
                <button className={styles.socialButton} onClick={() => router.push('/api/auth/github')}>
                    <Image src="/github.svg" alt="GitHub" width={20} height={20} className={styles.socialIcon} />
                    GitHub
                </button>
            </div>

            <p className={styles.switchText}>
                Don't have an account?
                <Link href="/register" className={styles.link}>
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;