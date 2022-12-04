import React, { useState, Suspense, lazy } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Hamburger from './hamburger';
import Loader from 'components/common/loader';
import CustomSnackBar from 'components/common/customSnackbar';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import useAuth from 'auth/useAuth';
import styles from './Navigation.module.scss';

const AddBoardForm = lazy(() => import('./AddBoardForm'));

function Navigation({ isSticky }: { isSticky: boolean }) {
  const { t, i18n } = useTranslation('header');
  const { isAuthenticated, logout } = useAuth();
  const [lang, setLang] = useState(i18n.language);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [isAddBoardFormOpen, setAddBoardFormOpen] = useState(false);
  const [snackBar, setSnackBar] = useState<TSnackBarState>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const handleLangChange = (event: React.MouseEvent<HTMLElement>, newLang: string) => {
    if (newLang) {
      setLang(newLang);
      i18n.changeLanguage(newLang);
    }
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };

  const openAddBoardForm = () => {
    setAddBoardFormOpen(true);
  };

  const closeAddBoardForm = () => {
    setAddBoardFormOpen(false);
  };

  const closeSnackBar = (): void => {
    setSnackBar((prevState) => {
      return { ...prevState, isOpen: false };
    });
  };

  const updateSnackBar = ({ isOpen, type, message }: TSnackBarState) => {
    setSnackBar({ isOpen, type, message });
  };

  return (
    <>
      <nav className={styles.navigation}>
        <div
          className={`${styles.hamburgerOverlay} ${isHamburgerOpen ? styles.open : ''}`}
          onClick={toggleHamburger}
        />
        <ul
          className={`${styles.navigationList} ${isSticky ? styles.sticky : ''} ${
            isHamburgerOpen ? styles.open : ''
          }`}
        >
          {isAuthenticated ? (
            <li className={styles.navigationItem}>
              <HomeIcon />
              <Link
                className={
                  isSticky ? `${styles.navigationLink} ${styles.sticky}` : styles.navigationLink
                }
                to="/boards-list"
                onClick={() => {
                  if (isHamburgerOpen) toggleHamburger();
                }}
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
          {isAuthenticated && (
            <>
              <li className={styles.navigationItem}>
                <AddCircleOutlineIcon />
                <span
                  className={
                    isSticky
                      ? `${styles.navigationButton} ${styles.sticky}`
                      : styles.navigationButton
                  }
                  onClick={() => {
                    openAddBoardForm();
                    if (isHamburgerOpen) toggleHamburger();
                  }}
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
                  onClick={() => {
                    if (isHamburgerOpen) toggleHamburger();
                  }}
                >
                  {t('editProfile')}
                </Link>
              </li>
              <li className={styles.navigationItem}>
                <LogoutIcon />
                <span
                  className={
                    isSticky
                      ? `${styles.navigationButton} ${styles.sticky}`
                      : styles.navigationButton
                  }
                  onClick={logout}
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
        <Hamburger isSticky={isSticky} isOpen={isHamburgerOpen} toggleHamburger={toggleHamburger} />
      </nav>
      <Dialog open={isAddBoardFormOpen} onClose={closeAddBoardForm} maxWidth="xs" fullWidth>
        <h3 className={styles.formTitle}>{t('createBoard')}</h3>
        <DialogContent className={styles.dialogContent}>
          <Suspense fallback={<Loader />}>
            <AddBoardForm onClose={closeAddBoardForm} updateSnackBar={updateSnackBar} />
          </Suspense>
        </DialogContent>
      </Dialog>
      <CustomSnackBar {...snackBar} onClose={closeSnackBar} message={t(`${snackBar.message}`)} />
    </>
  );
}

export default Navigation;
