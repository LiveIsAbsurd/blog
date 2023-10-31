import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { onRegister } from '../../function/api';

import styles from './signUp.module.sass';

const SignUp = () => {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setError,
  } = useForm();

  useEffect(() => {
    setTimeout(() => setClick(() => false), 7000);
  }, [click]);

  const password = useWatch({
    control,
    name: 'password',
  });

  const submit = (data) => {
    if (click) return;
    setClick(() => true);
    dispatch(onRegister(data, setError, history));
  };

  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit((data) => submit(data))}>
        <span className={styles.header}>Create New Account</span>

        <div className={styles.container}>
          <span className={styles.inputHead}>Username</span>
          <input
            {...register('username', {
              required: 'Обязательное поле',
              minLength: { value: 3, message: 'Не менее 3 символов' },
              maxLength: { value: 20, message: 'Не более 20 символов' },
            })}
            placeholder="Username"
            type="text"
            style={errors.username ? { borderColor: 'red' } : null}
          ></input>
          {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Email Adress</span>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Некоректный email',
              },
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
              minLength: { value: 6, message: 'Не менее 6 символов' },
              maxLength: { value: 40, message: 'Не более 40 символов' },
            })}
            placeholder="Password"
            type="password"
            style={errors.password ? { borderColor: 'red' } : null}
          ></input>
          {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Repeat Password</span>
          <input
            {...register('repPassword', {
              required: 'Обязательное поле',
              validate: (value) => value === password || 'Пароли не совпадают',
            })}
            placeholder="Password"
            type="password"
            style={errors.repPassword ? { borderColor: 'red' } : null}
          ></input>
          {errors.repPassword && <span className={styles.errorMessage}>{errors.repPassword.message}</span>}
        </div>

        <label className={styles.agree}>
          <input
            {...register('agree', {
              required: true,
            })}
            id={styles.agree}
            type="checkbox"
            defaultChecked
          />
          <span style={errors.agree && { color: 'red' }}>I agree to the processing of my personal information</span>
        </label>
        <input
          style={Object.keys(errors).length !== 0 || click ? { opacity: '0.5', cursor: 'unset' } : null}
          className={styles.button}
          type="submit"
          value="Create"
        />
      </form>
      <div className={styles.have}>
        Already have an account?{' '}
        <Link to="/sign-in" className={styles.link}>
          Sign In.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
