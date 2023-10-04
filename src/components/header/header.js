import React from 'react';

import styles from './header.module.sass';

const Header = () => {
  return (
    <div className={styles.header}>
      <span>Realworld Blog</span>
      <div>
        <button>Sign In</button>
        <button className={styles.log}>Log In</button>
      </div>
    </div>
  );
};

export default Header;
