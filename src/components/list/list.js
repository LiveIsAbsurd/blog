import React from 'react';
import { Pagination } from 'antd';

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
      <Pagination defaultCurrent={1} total={50} className={styles.pagination} />
    </div>
  );
};

export default List;
