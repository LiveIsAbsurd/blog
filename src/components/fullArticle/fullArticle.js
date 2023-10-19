import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import { getArticle } from '../../function/api';
import dateForm from '../../function/dateForm';
import tagRender from '../../function/tagRender';
import truncText from '../../function/truncText';

import styles from './fullArticle.module.sass';

const FullArticle = ({ slug }) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  useEffect(() => {
    dispatch(getArticle(slug));
    window.scrollTo(0, 0);
  }, []);

  let content = article ? (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <span className={styles.title}>{truncText(article.title, 40)}</span>
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
  ) : (
    <div className={styles.wrapper}>
      <Spin />
    </div>
  );
  return content;
};

export default FullArticle;
