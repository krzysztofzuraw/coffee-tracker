import React from 'react';
import Layout from '../components/layout';

import styles from '../styles/settings.module.css';
import { initDatabase } from '../helpers/database';

export default function SettingsPage() {
  const exportData = async () => {
    const db = await initDatabase();
    const logs = await db.getAllFromIndex('logs', 'date');

    const dataToExport = logs
      .map((log) =>
        [
          '---',
          `date: ${log.date}`,
          `coffee: ${log.coffee}`,
          `method: ${log.method}`,
          `grinder: ${log.grinder}/40`,
          `score: ${log.score}/10`,
          '---',
          `${log.notes}`,
          '',
        ].join('\r\n')
      )
      .join('\r\n');

    const data = new Blob([dataToExport], { type: 'text/plain' });
    const url = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'export.txt');
    tempLink.click();
  };

  return (
    <Layout>
      <div className={styles.exportData}>
        <h1 className={styles.exportHeader}>Export your data to plain text</h1>
        <button className={styles.exportButton} onClick={exportData}>
          Export
        </button>
      </div>
    </Layout>
  );
}
