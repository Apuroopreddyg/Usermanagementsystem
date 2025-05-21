import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user, logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link to={user ? "/dashboard" : "/login"} className={styles.link}>Home</Link>
                {user && user.role === 'Admin' && (
                    <Link to="/admin/create-software" className={styles.link}>Create Software</Link>
                )}
                {user && user.role === 'Manager' && (
                    <Link to="/manager/pending-requests" className={styles.link}>Pending Requests</Link>
                )}
                {user && user.role === 'Employee' && (
                    <>
                        <Link to="/employee/request-access" className={styles.link}>Request Access</Link>
                        <Link to="/employee/my-requests" className={styles.link}>My Requests</Link>
                    </>
                )}
            </div>
            <div>
                {user ? (
                    <>
                        <span className={styles.userInfo}>Welcome, {user.username} ({user.role})</span>
                        <button onClick={handleLogout} className={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <span className={styles.linkGap}></span>
                        <Link to="/signup" className={styles.link}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
