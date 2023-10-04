import React from 'react';

import Header from '../header';
import List from '../list/list';

import styles from './app.module.sass';

const App = () => {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <List />
      </div>
    </div>
  );
};

export default App;
