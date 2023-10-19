import React, { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../function/api';
import Article from '../article';

import styles from './articlesRender.module.sass';

const articlesRender = () => {
  const pageCount = useSelector((state) => state.pageCount);
  const page = useSelector((state) => state.page);
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => window.scrollTo(0, 0));

  const articles = posts.map((el, i) => {
    return <Article key={i} item={el} />;
  });

  return (
    <div className={styles.wrapper}>
      {!loading ? articles : null}
      {!loading ? (
        <Pagination
          current={page}
          onChange={(count) => dispatch(getPosts(20 * (count - 1)))}
          total={pageCount}
          className={styles.pagination}
          showSizeChanger={false}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default articlesRender;
