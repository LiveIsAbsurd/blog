import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import styles from './signUp.module.sass';

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      return 'Некоректный email';
    }
    return true;
  };

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
          ></input>
          {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Email Adress</span>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              validate: validateEmail,
            })}
            placeholder="Email adress"
            type="text"
          ></input>
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Password</span>
          <input placeholder="Password" type="text" />
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Repeat Password</span>
          <input placeholder="Password" type="text" />
        </div>

        <label>
          <input id={styles.agree} type="checkbox" defaultChecked />
          <span>I agree to the processing of my personal information</span>
        </label>
        <input className={styles.button} type="submit" value="Create" />
        <div>
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.link}>
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
