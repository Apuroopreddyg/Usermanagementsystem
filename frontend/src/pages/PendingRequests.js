import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import styles from './PendingRequests.module.css';

const PendingRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await api.getPendingRequests();
            setRequests(response.data.sort((a,b) => new Date(b.requestedAt) - new Date(a.requestedAt)));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch pending requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const handleUpdateRequest = async (requestId, status) => {
        setMessage('');
        setError('');
        try {
            await api.updateRequestStatus(requestId, { status });
            setMessage(`Request ${status.toLowerCase()} successfully.`);
            fetchPendingRequests();
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${status.toLowerCase()} request.`);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading pending requests...</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Pending Access Requests</h2>
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            {requests.length === 0 && !loading && <p style={{ textAlign: 'center' }}>No pending requests.</p>}
            {requests.length > 0 && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>User</th>
                                <th className={styles.th}>Software</th>
                                <th className={styles.th}>Access Type</th>
                                <th className={styles.th}>Reason</th>
                                <th className={styles.th}>Requested At</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td className={styles.td}>{req.user?.username || 'N/A'}</td>
                                    <td className={styles.td}>{req.software?.name || 'N/A'}</td>
                                    <td className={styles.td}>{req.accessType}</td>
                                    <td className={styles.td}>{req.reason}</td>
                                    <td className={styles.td}>{new Date(req.requestedAt).toLocaleString()}</td>
                                    <td className={styles.td}>
                                        <button onClick={() => handleUpdateRequest(req.id, 'Approved')} className={`${styles.actionButton} ${styles.approve}`}>Approve</button>
                                        <button onClick={() => handleUpdateRequest(req.id, 'Rejected')} className={`${styles.actionButton} ${styles.reject}`}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingRequests;
