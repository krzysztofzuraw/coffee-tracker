import React from 'react';

import styles from './layout.module.css';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.main}>
      {children}
      <footer>
        <ul className={styles.nav}>
          <li>Record</li>
          <li>List</li>
          <li>Settings</li>
        </ul>
      </footer>
    </div>
  );
}
