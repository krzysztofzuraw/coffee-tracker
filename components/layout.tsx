import React from 'react';
import Link from 'next/link';

import styles from './layout.module.css';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <main className={`${styles.content} stack`}>
        {children}
        <footer>
          <ul className={styles.nav}>
            <li>
              <Link href="/">Record</Link>
            </li>
            <li>
              <Link href="/list">List</Link>
            </li>
            <li>Settings</li>
          </ul>
        </footer>
      </main>
    </div>
  );
}
