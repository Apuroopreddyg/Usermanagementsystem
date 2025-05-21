import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await loginUser({ username, password });
        if (!result.success) {
            setError(result.message || 'Login failed. Please check your credentials.');
        } else {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Username:</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
