import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../function/api';
import { newPage } from '../../function/actions';
import Article from '../article';

import styles from './list.module.sass';

const List = () => {
  const articlesCount = useSelector((state) => state.articlesCount);
  const changePage = (count) => {
    dispatch(newPage());
    dispatch(getPosts(20 * (count - 1)));
  };
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  console.log(articlesCount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(0));
  }, []);
  const articles = posts.map((el, i) => {
    return <Article key={i} item={el} />;
  });
  return (
    <div className={styles.wrapper}>
      {!loading ? articles : null}
      <Pagination
        defaultCurrent={1}
        onChange={(count) => changePage(count)}
        total={120}
        className={styles.pagination}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  );
};

export default List;
