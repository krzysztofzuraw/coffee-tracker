import React, { useEffect, useState } from 'react';
import { IDBPDatabase } from 'idb';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout';
import styles from '../styles/index.module.css';
import { CoffeeEntry } from '../helpers/models';
import { CoffeeTrackerDB, initDatabase } from '../helpers/database';

export default function Index() {
  const { register, handleSubmit, reset } = useForm<CoffeeEntry>();
  const [log, setLog] = useState<CoffeeEntry | null>(null);
  const dbRef = React.useRef<IDBPDatabase<CoffeeTrackerDB>>();

  useEffect(() => {
    async function fetchDatabase() {
      const db = await initDatabase();
      dbRef.current = db;
      const tx = db.transaction('logs');
      const lastLog = await tx.store.openCursor(undefined, 'prev');
      setLog(lastLog?.value ?? null);
      await tx.done;
    }
    fetchDatabase();
  }, []);

  const onSubmit = (data: CoffeeEntry) => {
    dbRef?.current?.add('logs', {
      ...data,
      date: Date.now(),
    });
    reset();
  };

  return (
    <Layout>
      <form className={`${styles.form} stack`} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="coffee">Coffee</label>
        <input
          type="text"
          id="coffee"
          name="coffee"
          ref={register}
          placeholder="Name - Country"
          list="coffeeSuggestions"
        />
        {log?.coffee && (
          <datalist id="coffeeSuggestions">
            <option value={log.coffee} />
          </datalist>
        )}
        <label htmlFor="roaster">Roaster</label>
        <input
          type="text"
          id="roaster"
          name="roaster"
          ref={register}
          placeholder="Where it was roasted?"
          list="roasterSuggestions"
        />
        {log?.roaster && (
          <datalist id="roasterSuggestions">
            <option value={log.roaster} />
          </datalist>
        )}
        <label htmlFor="method">Method</label>
        <input
          list="methodSuggestions"
          id="method"
          name="method"
          ref={register}
          placeholder="How did you do it?"
        />
        <datalist id="methodSuggestions">
          <option value="Chemex" />
          <option value="V60" />
          <option value="Aeropress" />
          <option value="Mokka" />
          <option value="French Press" />
        </datalist>
        <label htmlFor="grinder">Grinder setting</label>
        <select
          id="grinder"
          name="grinder"
          ref={register}
          defaultValue={log?.grinder ?? '20'}
          key={log?.grinder}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
        </select>
        <label htmlFor="score">Score</label>
        <select name="score" id="score" ref={register} defaultValue="7">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <input type="text" id="notes" name="notes" ref={register} placeholder="Falvour etc." />
        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}
