import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.sass';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/articles" className={styles.link}>
        Realworld Blog
      </Link>
      <div>
        <button>Sign In</button>
        <button className={styles.log}>Log In</button>
      </div>
    </div>
  );
};

export default Header;
