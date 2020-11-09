import React from 'react';
import Link from 'next/link';

import styles from './layout.module.css';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <main className={`${styles.content} stack`}>
        {children}
        <footer className={styles.footer}>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>
              <Link href="/">Record</Link>
            </li>
            <li className={styles.footerListItem}>
              <Link href="/list">List</Link>
            </li>
            <li className={styles.footerListItem}>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </footer>
      </main>
    </div>
  );
}
