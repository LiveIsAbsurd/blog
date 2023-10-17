import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { authentication } from '../../function/actions';

import styles from './signUp.module.sass';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
          if (data.errors.username) {
            setError('username', {
              type: 'taken',
              message: 'Уже используется',
            });
          }

          if (data.errors.email) {
            setError('email', {
              type: 'taken',
              message: 'Уже используется',
            });
          }
        } else {
          dispatch(authentication(data.user));
          history.push('/article');
        }
      });
  };

  const password = useWatch({
    control,
    name: 'password',
  });

  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          style={Object.keys(errors).length !== 0 ? { opacity: '0.5', cursor: 'unset' } : null}
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
