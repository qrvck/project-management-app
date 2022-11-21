import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from './Navigation.module.scss';

function Navigation({ isSticky }: { isSticky: boolean }) {
  const { t } = useTranslation('header');
  const isUserLogged = true;
  const [lang, setLang] = useState('en');

  const handleLangChange = (event: React.MouseEvent<HTMLElement>, newLang: string) => {
    if (newLang) {
      setLang(newLang);
    }
  };

  return (
    <nav>
      <ul className={styles.navigationList}>
        {isUserLogged ? (
          <li className={styles.navigationItem}>
            <HomeIcon />
            <Link
              className={
                isSticky ? `${styles.navigationLink} ${styles.sticky}` : styles.navigationLink
              }
              to="/boards-list"
            >
              {t('mainPage')}
            </Link>
          </li>
        ) : (
          <>
            <li className={styles.navigationItem}>
              <LoginIcon />
              <Link
                className={
                  isSticky ? `${styles.navigationLink} ${styles.sticky}` : styles.navigationLink
                }
                to="/sign-in"
              >
                {t('signIn')}
              </Link>
            </li>
            <li className={styles.navigationItem}>
              <AppRegistrationIcon />
              <Link
                className={
                  isSticky ? `${styles.navigationLink} ${styles.sticky}` : styles.navigationLink
                }
                to="/sign-up"
              >
                {t('signUp')}
              </Link>
            </li>
          </>
        )}
        {isUserLogged && (
          <>
            <li className={styles.navigationItem}>
              <AddCircleOutlineIcon />
              <span
                className={
                  isSticky ? `${styles.navigationButton} ${styles.sticky}` : styles.navigationButton
                }
              >
                {t('createBoard')}
              </span>
            </li>
            <li className={styles.navigationItem}>
              <PersonIcon />
              <Link
                className={
                  isSticky ? `${styles.navigationLink} ${styles.sticky}` : styles.navigationLink
                }
                to="/edit-profile"
              >
                {t('editProfile')}
              </Link>
            </li>
            <li className={styles.navigationItem}>
              <LogoutIcon />
              <span
                className={
                  isSticky ? `${styles.navigationButton} ${styles.sticky}` : styles.navigationButton
                }
              >
                {t('signOut')}
              </span>
            </li>
          </>
        )}
        <li>
          <ToggleButtonGroup
            className={styles.langToggle}
            value={lang}
            exclusive
            onChange={handleLangChange}
          >
            <ToggleButton
              className={isSticky ? `${styles.langItem} ${styles.sticky}` : styles.langItem}
              value="en"
            >
              EN
            </ToggleButton>
            <ToggleButton
              className={isSticky ? `${styles.langItem} ${styles.sticky}` : styles.langItem}
              value="ru"
            >
              RU
            </ToggleButton>
          </ToggleButtonGroup>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
