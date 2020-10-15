import React from 'react';

import Layout from '../components/layout';

export default function Index() {
  return (
    <Layout>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
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
