import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styles from './AboutCourse.module.scss';

function AboutCourse() {
  const { t } = useTranslation('welcome-page');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Rolling Scopes School</h3>
      <p className={styles.description}>
        <Trans>{t('courseDescription')}</Trans>
      </p>
    </div>
  );
}

export default AboutCourse;
