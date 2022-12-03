import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getUserCall } from 'api/user';
import { createBoardCall } from 'api/boards';
import useAuth from 'auth/useAuth';
import styles from './AddBoardForm.module.scss';

interface IAddBoardFormProps {
  onClose: () => void;
}

interface IFormValues {
  boardTitle: string;
}

function AddBoardForm({ onClose }: IAddBoardFormProps) {
  const { user } = useAuth();
  const { t } = useTranslation('add-board-form');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = ({ boardTitle }) => {
    console.log(boardTitle);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        id="board-title"
        type="text"
        helperText={errors.boardTitle?.message ? t(`${errors.boardTitle.message}`) : ' '}
        error={!!errors.boardTitle}
        focused
        autoComplete="off"
        autoFocus
        margin="dense"
        label={t('boardTitle')}
        fullWidth
        variant="outlined"
        {...register('boardTitle', {
          required: 'fieldRequired' || '',
          minLength: {
            value: 2,
            message: 'minLength' || '',
          },
          maxLength: {
            value: 50,
            message: 'maxLength' || '',
          },
        })}
      />
      <div className={styles.button}>
        <Button type="submit" variant="contained">
          {t('addButton')}
        </Button>
        <Button onClick={onClose}>{t('cancelButton')}</Button>
      </div>
    </form>
  );
}

export default AddBoardForm;
