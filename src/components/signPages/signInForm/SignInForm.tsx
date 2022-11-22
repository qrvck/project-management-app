import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Login from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import authGreeting from 'assets/images/auth-greeting.svg';
import styles from '../Forms.module.scss';

type TFormValues = {
  login: string;
  password: string;
};

function SignInForm() {
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
    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <div>
          <img className={styles.welcomeImage} src={authGreeting} />
          <p className={styles.imageTitle}>{t('image title')}</p>
          <p className={styles.imageSubtitle}>{t('image subtitle')}</p>
        </div>
        <div>
          <h2 className={styles.title}>{t('sign in')}</h2>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
              })}
            />

            <Button className={styles.submitButton} type="submit" variant="contained" fullWidth>
              {t('sign in')}
            </Button>
          </form>
          <div className={styles.redirectWrapper}>
            <p className={styles.redirectText}>{t('have no account yet')}?</p>
            <Button
              className={styles.redirectButton}
              variant="outlined"
              size="small"
              component={Link}
              to="/sign-up"
            >
              {t('sign up')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
