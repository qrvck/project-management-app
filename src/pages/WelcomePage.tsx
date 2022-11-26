import React from 'react';
import { useTranslation } from 'react-i18next';
import AboutApp from 'components/welcomePage/aboutApp';
import Team from 'components/welcomePage/team';
import AboutCourse from 'components/welcomePage/aboutCourse';
import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const { t } = useTranslation('welcome-page');

  return (
    <div className="container">
      <h2 className={styles.pageTitle}>{t('title')}</h2>
      <AboutApp />
      <Team />
      <AboutCourse />
    </div>
  );
}

export default WelcomePage;
