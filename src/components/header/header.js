import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { findUser } from '../../function/api';
import { logOut, clearArticle } from '../../function/actions';

import styles from './header.module.sass';

const Header = ({ token }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector((state) => state.username);
  const image = useSelector((state) => state.image);

  useEffect(() => {
    if (token) {
      dispatch(findUser(token));
    }
  }, [token]);
  const nonAuth = (
    <React.Fragment>
      <Link to="/articles" className={styles.linkHead} onClick={() => dispatch(clearArticle())}>
        Realworld Blog
      </Link>
      <div>
        <Link to="/sign-up" className={styles.link}>
          Sign Up
        </Link>
        <Link to="/sign-in" className={`${styles.log} ${styles.link}`}>
          Log In
        </Link>
      </div>
    </React.Fragment>
  );
  const auth = (
    <React.Fragment>
      <Link to="/articles" className={styles.linkHead} onClick={() => dispatch(clearArticle())}>
        Realworld Blog
      </Link>
      <div>
        <Link to="/new-article" className={styles.newArticle}>
          Create Article
        </Link>
        <Link to="/profile" className={styles.link}>
          <span>{username}</span>
          <Avatar size={46} className={styles.avatar} src={image} />
        </Link>
        <button
          to="/sign-in"
          className={`${styles.logOut} ${styles.link}`}
          onClick={() => {
            dispatch(logOut());
            history.push('/sign-in');
          }}
        >
          Log out
        </button>
      </div>
    </React.Fragment>
  );
  return <div className={styles.header}>{username ? auth : nonAuth}</div>;
};

export default Header;
