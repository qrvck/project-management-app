import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Person from '@mui/icons-material/Person';
import Login from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { TFormValues } from './UserForm.types';

import styles from '../../signPages/Forms.module.scss';

interface IUserFormProps {
  submitButton: string;
  onSubmit: ({ name, login, password }: TFormValues) => void;
}

function UserForm({ submitButton, onSubmit }: IUserFormProps) {
  const [isShowingPassword, setShowingPassword] = useState<boolean>(false);
  const { t } = useTranslation('user-form');
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className={styles.nameInput}
          id="name-input"
          type="text"
          placeholder={t('name') || ''}
          helperText={
            errors.name?.message
              ? t(
                  `${JSON.parse(errors.name.message).key as string}`,
                  JSON.parse(errors.name.message).param as { [key: string]: string } | undefined
                )
              : ' '
          }
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
            required: JSON.stringify({ key: 'this field is required' }) || '',
            minLength: {
              value: 2,
              message:
                JSON.stringify({ key: 'minimum length symbols', param: { symbolsCount: '2' } }) ||
                '',
            },
            maxLength: {
              value: 20,
              message: JSON.stringify({ key: 'maximum length 20 symbols' }) || '',
            },
            pattern: {
              value: /^[a-zA-Zа-яёА-ЯЁ]+$/u,
              message: JSON.stringify({ key: 'must contain only letters' }) || '',
            },
          })}
        />

        <TextField
          className={styles.loginInput}
          id="login-input"
          type="text"
          placeholder={t('login') || ''}
          helperText={
            errors.login?.message
              ? t(
                  `${JSON.parse(errors.login.message).key as string}`,
                  JSON.parse(errors.login.message).param as { [key: string]: string } | undefined
                )
              : ' '
          }
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
            required: JSON.stringify({ key: 'this field is required' }) || '',
            minLength: {
              value: 4,
              message:
                JSON.stringify({ key: 'minimum length symbols', param: { symbolsCount: '4' } }) ||
                '',
            },
            maxLength: {
              value: 20,
              message: JSON.stringify({ key: 'maximum length 20 symbols' }) || '',
            },
            pattern: {
              value: /^[a-zA-Z1-9]+$/,
              message:
                JSON.stringify({ key: 'must contain only latin letters or/and digits' }) || '',
            },
            validate: (inputValue) =>
              !parseInt(inputValue[0]) ||
              JSON.stringify({ key: 'must start only with a letter' }) ||
              '',
          })}
        />

        <TextField
          className={styles.passwordInput}
          id="password-input"
          type={isShowingPassword ? 'text' : 'password'}
          placeholder={t('password') || ''}
          helperText={
            errors.password?.message
              ? t(
                  `${JSON.parse(errors.password.message).key as string}`,
                  JSON.parse(errors.password.message).param as { [key: string]: string } | undefined
                )
              : ' '
          }
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
            required: JSON.stringify({ key: 'this field is required' }) || '',
            minLength: {
              value: 8,
              message:
                JSON.stringify({ key: 'minimum length symbols', param: { symbolsCount: '8' } }) ||
                '',
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])/,
              message:
                JSON.stringify({
                  key: 'at least one number, one uppercase and one lowercase letters',
                }) || '',
            },
          })}
        />

        <Button
          className={styles.submitButton}
          type="submit"
          variant="contained"
          fullWidth
          disabled={errors.login || errors.name || errors.password ? true : false}
        >
          {submitButton}
        </Button>
      </form>
    </>
  );
}

export default UserForm;
