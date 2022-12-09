import React from 'react';
import Loader from '../loader';
import styles from './FullScreenLoader.module.scss';

function FullScreenLoader() {
  return (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );
}

export default FullScreenLoader;
