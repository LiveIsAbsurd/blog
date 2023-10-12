import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import { getArticle } from '../../function/api';
import dateForm from '../../function/dateForm';
import tagRender from '../../function/tagRender';

import styles from './fullArticle.module.sass';

const FullArticle = ({ slug }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticle(slug));
  }, []);
  const article = useSelector((state) => state.article);
  const loading = useSelector((state) => state.loading);
  let content = !loading ? (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <span className={styles.title}>{article.title}</span>
            <HeartOutlined
              style={{
                fontSize: '23px',
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className={styles.count}>{article.favoritesCount}</div>
          </div>
          {tagRender(article.tagList, styles)}
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.name}>{article.author.username}</div>
            <div className={styles.date}>{dateForm(article.createdAt)}</div>
          </div>
          <Avatar size={46} className={styles.avatar} src={article.author.image} />
        </div>
      </div>
      <div className={styles.desc}>{article.description}</div>
      <ReactMarkdown className={styles.text}>{article.body}</ReactMarkdown>
    </div>
  ) : null;
  return content;
};

export default FullArticle;
