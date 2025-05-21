import React, { useEffect, useState } from 'react';
import { getAllSoftware } from '../services/api';
import styles from './AdminSoftwares.module.css';

const AdminSoftwares = () => {
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSoftwares = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getAllSoftware();
        setSoftwares(response.data);
      } catch (err) {
        setError('Failed to fetch software list.');
      } finally {
        setLoading(false);
      }
    };
    fetchSoftwares();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Created Software</h2>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && softwares.length === 0 && <p>No software found.</p>}
      <div className={styles.grid}>
        {softwares.map((sw) => (
          <div className={styles.card} key={sw.id}>
            <h3 className={styles.name}>{sw.name}</h3>
            <p className={styles.desc}>{sw.description}</p>
            <div className={styles.levels}><strong>Access Levels:</strong> {sw.accessLevels?.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSoftwares; 