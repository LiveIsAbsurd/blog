import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './header.module.sass';

const Header = () => {
  const username = useSelector((state) => state.username);
  const nonAuth = (
    <React.Fragment>
      <Link to="/articles" className={styles.linkHead}>
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
      <Link to="/articles" className={styles.linkHead}>
        Realworld Blog
      </Link>
      <div>
        <Link to="/profile" className={styles.link}>
          {username}
        </Link>
        <Link to="/sign-in" className={`${styles.log} ${styles.link}`}>
          Log out
        </Link>
      </div>
    </React.Fragment>
  );
  return <div className={styles.header}>{username ? auth : nonAuth}</div>;
};

export default Header;
