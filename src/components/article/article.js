import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import styles from './article.module.sass';

const Article = () => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <div className={styles.title}>Some Article Title</div>
            <HeartOutlined
              style={{
                fontSize: '23px',
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className={styles.count}>12</div>
          </div>
          <span className={styles.tag}>Tag 1</span>
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.name}>Andrey Boba</div>
            <div className={styles.date}>March 5, 2020</div>
          </div>
          <Avatar size={46} className={styles.avatar} />
        </div>
      </div>
      <div className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </div>
    </div>
  );
};

export default Article;
