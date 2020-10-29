import React, { useEffect } from 'react';
import { openDB } from 'idb';
import { useForm } from 'react-hook-form';

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

  return db;
  // await db.add('logs', { coffee: 'Etiopia', date: Date.now() });
}

const useIDB = () => {
  const [initalValue, setInitialValue] = React.useState('');
  const dbRef = React.useRef<any>();

  async function initIDB() {
    const db = await openDB('coffeeTracker', 1, {
      upgrade(db) {
        const store = db.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('date', 'date');
      },
    });
    setInitialValue('');
    // setAdd(db);
    dbRef.current = db;
  }

  useEffect(() => {
    initIDB();
  }, []);

  return {
    initalValue,
    add: (values: FormValues) => {
      if (dbRef && dbRef.current) {
        dbRef.current.add('logs', {
          ...values,
          date: Date.now(),
        });
      }
    },
  };
};

type FormValues = {
  coffee: string;
  roaster: string;
  method: string;
  grinder: string;
  score: string;
  notes: string;
};

export default function Index() {
  const { initalValue, add } = useIDB();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => add(data);

  return (
    <Layout>
      <form className={`${styles.form} stack`} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="coffee">Coffee</label>
        <input type="text" id="coffee" name="coffee" ref={register} />
        <label htmlFor="roaster">Roaster</label>
        <input type="text" id="roaster" name="roaster" ref={register} />
        <label htmlFor="method">Method</label>
        <input type="text" id="method" name="method" ref={register} />
        <label htmlFor="grinder">Grinder setting</label>
        <input type="text" id="grinder" name="grinder" ref={register} />
        <label htmlFor="score">Score</label>
        <input type="text" id="score" name="score" ref={register} />
        <label htmlFor="notes">Notes</label>
        <input type="text" id="notes" name="notes" ref={register} />
        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}
