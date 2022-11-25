import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import StarsIcon from '@mui/icons-material/Stars';
import styles from './AboutApp.module.scss';

function AboutApp() {
  const { t } = useTranslation('welcome-page');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('aboutHeader')}</h3>
      <p className={styles.description}>
        <Trans>{t('appDescription')}</Trans>
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <StarsIcon className={styles.starIcon} />
          <p className={styles.featureDescription}>{t('featureOne')}</p>
        </div>
        <div className={styles.feature}>
          <StarsIcon className={styles.starIcon} />
          <p className={styles.featureDescription}>{t('featureTwo')}</p>
        </div>
        <div className={styles.feature}>
          <StarsIcon className={styles.starIcon} />
          <p className={styles.featureDescription}>{t('featureThree')}</p>
        </div>
        <div className={styles.feature}>
          <StarsIcon className={styles.starIcon} />
          <p className={styles.featureDescription}>{t('featureFour')}</p>
        </div>
        <div className={styles.feature}>
          <StarsIcon className={styles.starIcon} />
          <p className={styles.featureDescription}>{t('featureFive')}</p>
        </div>
        <div className={styles.feature}>
          <StarsIcon className={styles.starIcon} />
          <p className={styles.featureDescription}>{t('featureSix')}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutApp;
