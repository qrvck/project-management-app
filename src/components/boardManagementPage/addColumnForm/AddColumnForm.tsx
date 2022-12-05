import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TAddColumnFormProps, TAddColumnFormValues } from './AddColumn.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './AddColumnForm.module.scss';

export default function AddColumnForm({ onSubmit, onClose }: TAddColumnFormProps) {
  const { t } = useTranslation('modal-forms');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      columnName: '',
    },
  });

  const handlerSubmit: SubmitHandler<TAddColumnFormValues> = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handlerSubmit)} noValidate>
      <TextField
        className={styles.titleInput}
        id="column-title"
        focused
        autoComplete="off"
        autoFocus
        margin="dense"
        label={t('createColumnLabel')}
        type="text"
        fullWidth
        variant="outlined"
        helperText={errors.columnName?.message ? t(`${errors.columnName.message}`) : ' '}
        {...register('columnName', {
          required: 'fieldRequired' || '',
          minLength: {
            value: 2,
            message: 'fieldLength' || '',
          },
          maxLength: {
            value: 50,
            message: 'fieldLength' || '',
          },
        })}
        error={!!errors.columnName}
      />
      <div className={styles.buttons}>
        <Button
          className={styles.addButton}
          type="submit"
          variant="contained"
          disabled={!!errors.columnName}
        >
          {t('addButton')}
        </Button>
        <Button className={styles.cancelButton} variant="outlined" onClick={onClose}>
          {t('cancelButton')}
        </Button>
      </div>
    </form>
  );
}
