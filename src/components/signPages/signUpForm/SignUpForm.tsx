import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from 'auth/useAuth';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Person from '@mui/icons-material/Person';
import Login from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import authGreeting from 'assets/images/auth-greeting.svg';
import styles from '../Forms.module.scss';

type TFormValues = {
  name: string;
  login: string;
  password: string;
};

function SignUpForm() {
  const { signUp, isLoading, errorMessage } = useAuth();

  const [isShowingPassword, setShowingPassword] = useState<boolean>(false);
  const { t } = useTranslation('sign-pages');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const handleClickShowPassword = () => {
    setShowingPassword(!isShowingPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    const { name, login, password } = data;
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

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                className={styles.nameInput}
                id="name-input"
                type="text"
                placeholder={t('name') || ''}
                helperText={errors.name?.message || ' '}
                error={!!errors.name}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                {...register('name', {
                  required: t('this field is required') || '',
                  minLength: {
                    value: 2,
                    message: t('minimum length symbols', { symbolsCount: '2' }) || '',
                  },
                  maxLength: {
                    value: 20,
                    message: t('maximum length 20 symbols') || '',
                  },
                  pattern: {
                    value: /^[a-zA-Zа-яёА-ЯЁ]+$/u,
                    message: t('must contain only letters') || '',
                  },
                })}
              />

              <TextField
                className={styles.loginInput}
                id="login-input"
                type="text"
                placeholder={t('login') || ''}
                helperText={errors.login?.message || ' '}
                error={!!errors.login}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Login />
                    </InputAdornment>
                  ),
                }}
                {...register('login', {
                  required: t('this field is required') || '',
                  minLength: {
                    value: 4,
                    message: t('minimum length symbols', { symbolsCount: '4' }) || '',
                  },
                  maxLength: {
                    value: 20,
                    message: t('maximum length 20 symbols') || '',
                  },
                  pattern: {
                    value: /^[a-zA-Z1-9]+$/,
                    message: t('must contain only latin letters or/and digits') || '',
                  },
                  validate: (inputValue) =>
                    !parseInt(inputValue[0]) || t('must start only with a letter') || '',
                })}
              />

              <TextField
                className={styles.passwordInput}
                id="password-input"
                type={isShowingPassword ? 'text' : 'password'}
                placeholder={t('password') || ''}
                helperText={errors.password?.message || ' '}
                error={!!errors.password}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isShowingPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register('password', {
                  required: t('this field is required') || '',
                  minLength: {
                    value: 8,
                    message: t('minimum length symbols', { symbolsCount: '8' }) || '',
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])/,
                    message:
                      t('at least one number, one uppercase and one lowercase letters') || '',
                  },
                })}
              />

              <Button className={styles.submitButton} type="submit" variant="contained" fullWidth>
                {t('sign up')}
              </Button>
            </form>
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
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <p>загрузка</p>
          {/*заменить на лоадер */}
        </div>
      )}
    </>
  );
}

export default SignUpForm;
