import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { signupUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        const result = await signupUser({ username, password, role });
        if (result.success) {
            setMessage(result.message || 'Signup successful! Please login.');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setRole('Employee');
        } else {
            setError(result.message || 'Signup failed. Username might be taken or server error.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign Up</h2>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.success}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username_signup" className={styles.label}>Username:</label>
                    <input id="username_signup" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className={styles.input}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password_signup" className={styles.label}>Password:</label>
                    <input id="password_signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirm_password_signup" className={styles.label}>Confirm Password:</label>
                    <input id="confirm_password_signup" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={styles.input}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="role_signup" className={styles.label}>Role:</label>
                    <select id="role_signup" value={role} onChange={(e) => setRole(e.target.value)} required className={styles.select}>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Already have an account? <Link to="/login" className={styles.link}>Login</Link>
            </p>
        </div>
    );
};

export default Signup;