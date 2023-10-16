import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import dateForm from '../../function/dateForm';
import tagRender from '../../function/tagRender';
import truncText from '../../function/truncText';

import styles from './article.module.sass';

const Article = ({ item }) => {
  const { slug, title, description, favoritesCount, tagList, author, createdAt } = item;
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <Link to={`/article/${slug}`} className={styles.title}>
              {truncText(title, 40)}
            </Link>
            <HeartOutlined
              style={{
                fontSize: '23px',
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className={styles.count}>{favoritesCount}</div>
          </div>
          {tagRender(tagList, styles)}
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.name}>{author.username}</div>
            <div className={styles.date}>{dateForm(createdAt)}</div>
          </div>
          <Avatar size={46} className={styles.avatar} src={author.image} />
        </div>
      </div>
      <div className={styles.text}>{truncText(description, 200)}</div>
    </div>
  );
};

export default Article;
