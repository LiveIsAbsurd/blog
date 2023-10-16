import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { submit, change } from '../../function/form';

import styles from './signIn.module.sass';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  return (
    <div className={styles.window}>
      <form onSubmit={(e) => submit(state, e)}>
        <span className={styles.header}>Sign In</span>
        <span className={styles.inputHead}>Email Adress</span>
        <input placeholder="Email Adress" type="text" onChange={(e) => change(state, setState, 'email', e)} />
        <span className={styles.inputHead}>Password</span>
        <input placeholder="Password" type="text" onChange={(e) => change(state, setState, 'password', e)} />
        <input className={styles.button} type="submit" value="Login" />
        <div>
          Already have an account?{' '}
          <Link to="/sign-up" className={styles.link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
