import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.sass';

const Header = () => {
  return (
    <div className={styles.header}>
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
    </div>
  );
};

export default Header;
