import { openDB, DBSchema } from 'idb';

import { CoffeeEntry } from './models';

export interface CoffeeTrackerDB extends DBSchema {
  logs: {
    value: {
      date: number;
      coffee: CoffeeEntry['coffee'];
      roaster: CoffeeEntry['roaster'];
      method: CoffeeEntry['method'];
      grinder: CoffeeEntry['grinder'];
      score: CoffeeEntry['score'];
      notes: CoffeeEntry['notes'];
    };
    key: string;
    indexes: { date: number };
  };
}

export const initDatabase = () =>
  openDB<CoffeeTrackerDB>('coffeeTracker', 1, {
    upgrade(db) {
      const store = db.createObjectStore('logs', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('date', 'date');
    },
  });
