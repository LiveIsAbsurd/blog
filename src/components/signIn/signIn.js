import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { useDispatch } from 'react-redux';

import { onAuth } from '../../function/api';

import styles from './signIn.module.sass';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      return 'Некоректный email';
    }
    return true;
  };

  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit((data) => dispatch(onAuth(data, setError, history)))}>
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
          style={Object.keys(errors).length !== 0 ? { opacity: '0.5', cursor: 'unset' } : null}
          className={styles.button}
          type="submit"
          value="Create"
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
