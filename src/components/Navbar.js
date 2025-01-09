import React from 'react';
import styles from '../styles/navbar.module.scss';

function Navbar({ goBack }) {

  return (
    <div className={`${styles.navbar}`}>
      <h1 onClick={goBack} style={{ cursor: 'pointer' }}>Where in the World</h1>
      <button  className={styles.themeToggle}>
        {'☀️ Light Mode'}
      </button>
    </div>
  );
}

export default Navbar;
