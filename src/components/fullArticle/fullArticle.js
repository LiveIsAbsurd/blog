import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Spin, Button, Popconfirm } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { deleteArticle, getArticle, favorite } from '../../function/api';
import dateForm from '../../function/dateForm';
import tagRender from '../../function/tagRender';
import truncText from '../../function/truncText';

import styles from './fullArticle.module.sass';

const FullArticle = ({ slug }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const article = useSelector((state) => state.article);
  const username = useSelector((state) => state.username);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    dispatch(getArticle(slug, token));
    window.scrollTo(0, 0);
  }, []);

  let content = article ? (
    <div className={styles.item}>
      <div className={styles.header}>
        <div>
          <div className={styles.article}>
            <span className={styles.title}>{truncText(article.title, 40)}</span>
            <button className={styles.like} onClick={() => dispatch(favorite(slug, token, article.favorited, 0, true))}>
              {article.favorited ? (
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
      <div className={styles.descButCont}>
        <div className={styles.desc}>{article.description}</div>

        {username == article.author.username ? (
          <div>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => dispatch(deleteArticle(slug, token, history))}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <button onClick={() => history.push(`/articles/${slug}/edit`)} className={styles.edit}>
              Edit
            </button>
          </div>
        ) : null}
      </div>
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
