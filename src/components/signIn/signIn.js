import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { useDispatch } from 'react-redux';

import { onAuth } from '../../function/api';

import styles from './signIn.module.sass';

const SignIn = () => {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    setTimeout(() => setClick(() => false), 7000);
  }, [click]);

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      return 'Некоректный email';
    }
    return true;
  };

  const submit = (data) => {
    if (click) return;
    setClick(() => true);
    dispatch(onAuth(data, setError, history));
  };

  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit((data) => submit(data))}>
        <span className={styles.header}>Sign In</span>

        <div className={styles.container}>
          <span className={styles.inputHead}>Email Adress</span>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              validate: validateEmail,
            })}
            placeholder="Email adress"
            type="text"
            style={errors.email ? { borderColor: 'red' } : null}
          ></input>
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Password</span>
          <input
            {...register('password', {
              required: 'Обязательное поле',
            })}
            placeholder="Password"
            type="password"
            style={errors.password ? { borderColor: 'red' } : null}
          ></input>
          {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
        </div>
        <input
          style={Object.keys(errors).length !== 0 || click ? { opacity: '0.5', cursor: 'unset' } : null}
          className={styles.button}
          type="submit"
          value="Log in"
        />
      </form>
      <div className={styles.have}>
        Already have an account?{' '}
        <Link to="/sign-up" className={styles.link}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
