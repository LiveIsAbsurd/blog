import React from 'react';

import Article from '../article';

import styles from './list.module.sass';

const List = () => {
  return (
    <div className={styles.wrapper}>
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </div>
  );
};

export default List;
