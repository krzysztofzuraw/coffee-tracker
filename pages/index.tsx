import React, { useEffect } from 'react';
import { openDB } from 'idb';

import Layout from '../components/layout';
import styles from '../styles/index.module.css';

async function doDatabaseStuff() {
  const db = await openDB('coffeeTracker', 1, {
    upgrade(db) {
      const store = db.createObjectStore('logs', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('date', 'date');
    },
  });

  await db.add('logs', { coffee: 'Etiopia', date: Date.now() });
}

export default function Index() {
  useEffect(() => {
    doDatabaseStuff();
  }, []);
  return (
    <Layout>
      <form className={`${styles.form} stack`}>
        <label htmlFor="coffee">Coffee</label>
        <input type="text" id="coffee" name="coffee" />
        <label htmlFor="roaster">Roaster</label>
        <input type="text" id="roaster" name="roaster" />
        <label htmlFor="method">Method</label>
        <input type="text" id="method" name="method" />
        <label htmlFor="grinder">Grinder setting</label>
        <input type="text" id="grinder" name="grinder" />
        <label htmlFor="score">Score</label>
        <input type="text" id="score" name="score" />
        <label htmlFor="notes">Notes</label>
        <input type="text" id="notes" name="notes" />
        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}
