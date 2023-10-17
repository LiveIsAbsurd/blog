import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import styles from './profile.module.sass';

const Profile = () => {
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
        <span className={styles.header}>Edit Profile</span>

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
              validate: validateEmail,
            })}
            placeholder="Email adress"
            type="text"
            style={errors.email ? { borderColor: 'red' } : null}
          ></input>
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>New Password</span>
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
          <span className={styles.inputHead}>{'Avatar Image (url)'}</span>
          <input placeholder="Avatar image" type="text" />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default Profile;
