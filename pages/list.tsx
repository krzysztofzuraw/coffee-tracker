import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { IDBPDatabase, openDB } from 'idb';

const initDatabase = () =>
  openDB('coffeeTracker', 1, {
    upgrade(db) {
      const store = db.createObjectStore('logs', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('date', 'date');
    },
  });

export default function ListPage() {
  const [logs, setLogs] = useState<any>([]);
  useEffect(() => {
    async function fetchDatabase() {
      const db = await initDatabase();
      const logs = await db.getAllFromIndex('logs', 'date');
      setLogs(logs);
    }
    fetchDatabase();
  }, []);
  console.log({ logs });
  return <Layout>List</Layout>;
}
