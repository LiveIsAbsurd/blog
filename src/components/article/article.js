import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import dateForm from '../../function/dateForm';
import tagRender from '../../function/tagRender';
import truncText from '../../function/truncText';
import { favorite } from '../../function/api';

import styles from './article.module.sass';

const Article = ({ item }) => {
  const [clickLike, setClickLIke] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const page = useSelector((state) => state.page);
  const { slug, title, description, favoritesCount, favorited, tagList, author, createdAt } = item;
  useEffect(() => {
    setTimeout(() => setClickLIke(() => false), 2000);
  }, [clickLike]);
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <Link to={`/article/${slug}`} className={styles.title}>
              {truncText(title, 40)}
            </Link>
            <button
              className={styles.like}
              onClick={() => {
                if (clickLike) return;
                setClickLIke(() => true);
                dispatch(favorite(slug, token, favorited, (page - 1) * 20, false, history));
              }}
            >
              {favorited ? (
                <HeartFilled
                  style={{
                    fontSize: '23px',
                    color: '#FF0707',
                  }}
                />
              ) : (
                <HeartOutlined
                  style={{
                    fontSize: '23px',
                  }}
                />
              )}
            </button>
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
      <div className={styles.text}>{description ? truncText(description, 200) : null}</div>
    </div>
  );
};

export default Article;
