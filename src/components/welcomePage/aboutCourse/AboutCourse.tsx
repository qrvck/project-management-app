import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutCourse.module.scss';

function AboutCourse() {
  const { t } = useTranslation('welcome-page');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Rolling Scopes School</h3>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{t('schoolDescription')}</p>
        <p className={styles.description}>{t('courseDescription')}</p>
      </div>
    </div>
  );
}

export default AboutCourse;
