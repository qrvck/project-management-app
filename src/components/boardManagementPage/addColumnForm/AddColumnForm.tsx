import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TAddColumnFormProps, TAddColumnFormValues } from './AddColumn.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './AddColumnForm.module.scss';

export default function AddColumnForm({ isOpen, onSubmit, onClose }: TAddColumnFormProps) {
  const { t } = useTranslation('add-column-form');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      columnName: '',
    },
  });

  const handlerSubmit: SubmitHandler<TAddColumnFormValues> = (data, event) => {
    event?.preventDefault();
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <h3 className={styles.title}>{t('title')}</h3>
      <DialogContent>
        <form onSubmit={handleSubmit(handlerSubmit)} noValidate>
          <TextField
            focused
            autoComplete="off"
            autoFocus
            margin="dense"
            label={t('inputLabel')}
            type="text"
            fullWidth
            variant="outlined"
            helperText={t('helperText')}
            {...register('columnName', {
              required: 'This field is required',
              minLength: 2,
              maxLength: 50,
            })}
            error={!!errors.columnName}
          />
          <div className={styles.buttons}>
            <Button type="submit" variant="contained">
              {t('addButton')}
            </Button>
            <Button onClick={onClose}>{t('cancelButton')}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
