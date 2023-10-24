import React from 'react';
import { Alert } from 'antd';

import styles from './error.module.sass';

const Error = () => {
  return (
    <Alert className={styles.error} message="Ошибка" description="Произошла какая-то ошибка." type="error" showIcon />
  );
};

export default Error;
