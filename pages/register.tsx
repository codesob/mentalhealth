import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import userService from '../services/userService';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
                setError('Please fill in all fields');
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            await userService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName
            });
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Join our community of mental health support</p>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={styles.input}
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Choose a username"
                    />
                </div>

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
                        placeholder="Create a password"
                        minLength={8}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={styles.input}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your password"
                    />
                </div>

                <button type="submit" className={styles.button}>Create Account</button>
            </form>
        </div>
    );
};

export default Register;