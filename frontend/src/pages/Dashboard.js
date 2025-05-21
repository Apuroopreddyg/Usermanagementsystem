import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import AdminSoftwaresInline from './AdminSoftwares';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading user data or please log in.</p>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Dashboard</h2>
            <p className={styles.welcome}>Welcome, <strong>{user.username}</strong>! Your role is: <strong>{user.role}</strong></p>
            <div className={styles.cardGrid}>
                {user.role === 'Admin' && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Admin Actions</h3>
                        <ul className={styles.list}>
                            <li><Link to="/admin/create-software" className={styles.link}>Create New Software</Link></li>
                        </ul>
                    </div>
                )}
                {user.role === 'Manager' && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Manager Actions</h3>
                        <ul className={styles.list}>
                            <li><Link to="/manager/pending-requests" className={styles.link}>View Pending Requests</Link></li>
                        </ul>
                    </div>
                )}
                {user.role === 'Employee' && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Employee Actions</h3>
                        <ul className={styles.list}>
                            <li><Link to="/employee/request-access" className={styles.link}>Request Software Access</Link></li>
                            <li><Link to="/employee/my-requests" className={styles.link}>View My Requests</Link></li>
                        </ul>
                    </div>
                )}
            </div>
            {user.role === 'Admin' && (
                <div style={{ marginTop: '2.5rem' }}>
                    <React.Suspense fallback={<div>Loading software list...</div>}>
                        <AdminSoftwaresInline />
                    </React.Suspense>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
