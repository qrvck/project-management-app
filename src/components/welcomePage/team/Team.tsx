import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Team.module.scss';
import mentor from 'assets/images/team/mentor.png';
import femaleProgrammer1 from 'assets/images/team/female-programmer-1.png';
import femaleProgrammer2 from 'assets/images/team/female-programmer-2.png';
import maleProgrammer from 'assets/images/team/male-programmer.png';

function Team() {
  const { t } = useTranslation('welcome-page');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('teamHeader')}</h3>
      <div className={styles.members}>
        <div className={styles.member}>
          <img className={styles.photo} src={mentor} alt="Teammember photo" />
          <p className={styles.name}>{t('memberOne')}</p>
          <p className={styles.role}>{t('mentor')}</p>
        </div>
        <div className={styles.member}>
          <img className={styles.photo} src={maleProgrammer} alt="Teammember photo" />
          <p className={styles.name}>{t('memberTwo')}</p>
          <p className={styles.role}>{t('teamLead')}</p>
        </div>
        <div className={styles.member}>
          <img className={styles.photo} src={femaleProgrammer1} alt="Teammember photo" />
          <p className={styles.name}>{t('memberThree')}</p>
          <p className={styles.role}>{t('developer')}</p>
        </div>
        <div className={styles.member}>
          <img className={styles.photo} src={femaleProgrammer2} alt="Teammember photo" />
          <p className={styles.name}>{t('memberFour')}</p>
          <p className={styles.role}>{t('developer')}</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
