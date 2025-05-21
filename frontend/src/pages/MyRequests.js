import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import styles from './MyRequests.module.css';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;
            try {
                setLoading(true);
                setError('');
                const response = await api.getMyRequests();
                setRequests(response.data.sort((a,b) => new Date(b.requestedAt) - new Date(a.requestedAt)));
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch your requests.');
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, [user]);

    if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading your requests...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My Access Requests</h2>
            {requests.length === 0 ? (
                <p style={{ textAlign: 'center' }}>You have not made any requests yet.</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Software</th>
                                <th className={styles.th}>Access Type</th>
                                <th className={styles.th}>Reason</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Requested At</th>
                                <th className={styles.th}>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td className={styles.td}>{req.software?.name || 'N/A'}</td>
                                    <td className={styles.td}>{req.accessType}</td>
                                    <td className={styles.td}>{req.reason}</td>
                                    <td className={styles.td}>
                                        <span className={`${styles.statusChip} ${req.status === 'Approved' ? styles.statusApproved : req.status === 'Rejected' ? styles.statusRejected : ''}`}>{req.status}</span>
                                    </td>
                                    <td className={styles.td}>{new Date(req.requestedAt).toLocaleString()}</td>
                                    <td className={styles.td}>{new Date(req.updatedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRequests;
