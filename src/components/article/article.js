import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import styles from './article.module.sass';

const Article = ({ item }) => {
  const { title, description, favoritesCount, tagList, author } = item;
  const tags = tagList.map((tag, i) => {
    if (tag) {
      return (
        <span key={i} className={styles.tag}>
          {tag}
        </span>
      );
    }
  });
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <div className={styles.title}>{title}</div>
            <HeartOutlined
              style={{
                fontSize: '23px',
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className={styles.count}>{favoritesCount}</div>
          </div>
          {tags}
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.name}>{author.username}</div>
            <div className={styles.date}>March 5, 2020</div>
          </div>
          <Avatar size={46} className={styles.avatar} src={author.image} />
        </div>
      </div>
      <div className={styles.text}>{description}</div>
    </div>
  );
};

export default Article;
