import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from 'auth/useAuth';

import FullScreenLoader from 'components/common/fullScreenLoader';
import UserForm from 'components/common/userForm/UserForm';
import { TFormValues } from 'components/common/userForm/UserForm.types';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import authGreeting from 'assets/images/auth-greeting.svg';
import styles from '../Forms.module.scss';

function SignUpForm() {
  const { signUp, isLoading, errorMessage } = useAuth();

  const { t } = useTranslation('sign-pages');

  const onSubmit: SubmitHandler<TFormValues> = ({ name, login, password }) => {
    signUp(name, login, password);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.formCard}>
          <div>
            <img className={styles.welcomeImage} src={authGreeting} />
            <p className={styles.imageTitle}>{t('image title')}</p>
            <p className={styles.imageSubtitle}>{t('image subtitle')}</p>
          </div>
          <div>
            <h2 className={styles.title}>{t('sign up')}</h2>

            <Alert
              className={`${styles.serverError} ${errorMessage ? '' : styles.hiddenServerError}`}
              severity="error"
            >
              {t(errorMessage)}
            </Alert>

            <UserForm submitButton={t('sign up')} submitCallback={onSubmit} />

            <div className={styles.redirectWrapper}>
              <p className={styles.redirectText}>{t('already have an account')}?</p>
              <Button
                className={styles.redirectButton}
                variant="outlined"
                size="small"
                component={Link}
                to="/sign-in"
              >
                {t('sign in')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <FullScreenLoader />}
    </>
  );
}

export default SignUpForm;
