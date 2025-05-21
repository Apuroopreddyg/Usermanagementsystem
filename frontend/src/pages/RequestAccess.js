import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import styles from './RequestAccess.module.css';

const RequestAccess = () => {
    const [softwareList, setSoftwareList] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState('');
    const [selectedSoftwareDetails, setSelectedSoftwareDetails] = useState(null);
    const [accessType, setAccessType] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingSoftware, setLoadingSoftware] = useState(true);

    useEffect(() => {
        const fetchSoftware = async () => {
            setLoadingSoftware(true);
            try {
                const response = await api.getAllSoftware();
                setSoftwareList(response.data);
            } catch (err) {
                setError('Failed to load software list.');
                console.error(err);
            } finally {
                setLoadingSoftware(false);
            }
        };
        fetchSoftware();
    }, []);

    useEffect(() => {
        if (selectedSoftware) {
            const details = softwareList.find(s => s.id === parseInt(selectedSoftware));
            setSelectedSoftwareDetails(details);
            setAccessType('');
        } else {
            setSelectedSoftwareDetails(null);
        }
    }, [selectedSoftware, softwareList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!selectedSoftware || !accessType || !reason) {
            setError('All fields are required.');
            return;
        }
        try {
            await api.submitAccessRequest({
                softwareId: parseInt(selectedSoftware),
                accessType,
                reason,
            });
            setMessage('Access request submitted successfully!');
            setSelectedSoftware('');
            setAccessType('');
            setReason('');
            setSelectedSoftwareDetails(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit request.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Request Software Access</h2>
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            {loadingSoftware && <p>Loading software list...</p>}
            {!loadingSoftware && softwareList.length === 0 && !error && <p>No software available to request.</p>}
            {!loadingSoftware && softwareList.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="req_software" className={styles.label}>Software:</label>
                        <select id="req_software" value={selectedSoftware} onChange={(e) => setSelectedSoftware(e.target.value)} required className={styles.select}>
                            <option value="">Select Software</option>
                            {softwareList.map((sw) => (
                                <option key={sw.id} value={sw.id}>{sw.name}</option>
                            ))}
                        </select>
                    </div>
                    {selectedSoftwareDetails && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="req_access_type" className={styles.label}>Access Type:</label>
                            <select id="req_access_type" value={accessType} onChange={(e) => setAccessType(e.target.value)} required className={styles.select}>
                                <option value="">Select Access Type</option>
                                {selectedSoftwareDetails.accessLevels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <label htmlFor="req_reason" className={styles.label}>Reason:</label>
                        <textarea id="req_reason" value={reason} onChange={(e) => setReason(e.target.value)} required className={styles.textarea} />
                    </div>
                    <button type="submit" className={styles.button}>Submit Request</button>
                </form>
            )}
        </div>
    );
};

export default RequestAccess;
