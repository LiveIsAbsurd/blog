import React from 'react';

import styles from './profile.module.sass';

const Profile = () => {
  return (
    <div className={styles.window}>
      <span className={styles.header}>Edit Profile</span>
      <span className={styles.inputHead}>Username</span>
      <input placeholder="Username" type="text" />
      <span className={styles.inputHead}>Email Adress</span>
      <input placeholder="Email Adress" type="text" />
      <span className={styles.inputHead}>New Password</span>
      <input placeholder="Password" type="text" />
      <span className={styles.inputHead}>{'Avatar Image (url)'}</span>
      <input placeholder="Avatar image" type="text" />
      <button>Save</button>
    </div>
  );
};

export default Profile;
