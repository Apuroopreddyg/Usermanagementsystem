import React, { useState } from 'react';
import * as api from '../services/api';
import styles from './CreateSoftware.module.css';

const CreateSoftware = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [accessLevels, setAccessLevels] = useState({ Read: false, Write: false, Admin: false });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCheckboxChange = (e) => {
        setAccessLevels({ ...accessLevels, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        const selectedLevels = Object.keys(accessLevels).filter(level => accessLevels[level]);
        if (selectedLevels.length === 0) {
            setError("Please select at least one access level.");
            return;
        }
        try {
            await api.createSoftware({ name, description, accessLevels: selectedLevels });
            setMessage('Software created successfully!');
            setName('');
            setDescription('');
            setAccessLevels({ Read: false, Write: false, Admin: false });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create software.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Create New Software (Admin)</h2>
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="sw_name" className={styles.label}>Name:</label>
                    <input id="sw_name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="sw_desc" className={styles.label}>Description:</label>
                    <textarea id="sw_desc" value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.textarea} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Access Levels:</label>
                    <div className={styles.checkboxGroup}>
                        <label><input type="checkbox" name="Read" checked={accessLevels.Read} onChange={handleCheckboxChange} /> Read</label>
                        <label><input type="checkbox" name="Write" checked={accessLevels.Write} onChange={handleCheckboxChange} /> Write</label>
                        <label><input type="checkbox" name="Admin" checked={accessLevels.Admin} onChange={handleCheckboxChange} /> Admin</label>
                    </div>
                </div>
                <button type="submit" className={styles.button}>Create Software</button>
            </form>
        </div>
    );
};

export default CreateSoftware;
