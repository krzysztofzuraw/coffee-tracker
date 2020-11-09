import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';

import styles from '../styles/list.module.css';
import { CoffeeEntry } from '../helpers/models';
import { initDatabase } from '../helpers/database';

export default function ListPage() {
  const [logs, setLogs] = useState<CoffeeEntry[]>([]);
  useEffect(() => {
    async function fetchDatabase() {
      const db = await initDatabase();
      const logs = await db.getAllFromIndex('logs', 'date');
      setLogs(logs);
    }
    fetchDatabase();
  }, []);

  return (
    <Layout>
      <ol className={styles.logItemsList}>
        {logs.map((log) => (
          <li key={log.date} className={styles.logItem}>
            <h2 className={styles.logItemHeader}>{log.coffee}</h2>
            <time className={styles.logItemDate}>
              {new Date(log.date).toLocaleString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </time>
            <p className={styles.logItemDescription}>
              {log.roaster} - {log.method}
            </p>
          </li>
        ))}
      </ol>
    </Layout>
  );
}
