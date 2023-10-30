import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { onUpdateProfile } from '../../function/api';

import styles from './profile.module.sass';

const Profile = () => {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const token = useSelector((state) => state.token);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const submit = (data) => {
    if (click) return;
    setClick(() => true);
    dispatch(onUpdateProfile(data, token, setError, history));
  };

  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit((data) => submit(data))}>
        <span className={styles.header}>Edit Profile</span>

        <div className={styles.container}>
          <span className={styles.inputHead}>Username</span>
          <input
            {...register('username', {
              minLength: { value: 3, message: 'Не менее 3 символов' },
              maxLength: { value: 20, message: 'Не более 20 символов' },
            })}
            placeholder="Username"
            type="text"
            defaultValue={username}
            style={errors.username ? { borderColor: 'red' } : null}
          ></input>
          {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Email Adress</span>
          <input
            {...register('email', {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Некоректный email',
              },
            })}
            placeholder="Email adress"
            type="text"
            defaultValue={email}
            style={errors.email ? { borderColor: 'red' } : null}
          ></input>
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>New Password</span>
          <input
            {...register('password', {
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
          <input
            {...register('image', {
              pattern: {
                value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/i,
                message: 'Некоректный url',
              },
            })}
            placeholder="Avatar image"
            type="text"
            style={errors.image ? { borderColor: 'red' } : null}
          ></input>
          {errors.image && <span className={styles.errorMessage}>{errors.image.message}</span>}
        </div>
        <input type="submit" value="save" className={styles.button} />
      </form>
    </div>
  );
};

export default Profile;
