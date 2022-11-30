import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ModalForm } from '../../common/modalForm';
import { TAddColumnFormProps, TAddColumnFormValues } from './AddColumn.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './AddColumnForm.module.scss';
// import { useTranslation } from 'react-i18next';

export default function AddColumnForm({ isOpen, onSubmit, onClose }: TAddColumnFormProps) {
  // const { t } = useTranslation('add-column-form');
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
    console.log('submit: ', data);
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Create column">
      <form onSubmit={handleSubmit(handlerSubmit)} noValidate>
        <TextField
          focused
          autoComplete="off"
          autoFocus
          margin="dense"
          label="Column name"
          type="text"
          fullWidth
          variant="outlined"
          helperText="Column name must be at least 2 symbols and maximum 50"
          {...register('columnName', {
            required: 'This field is required',
            minLength: 2,
            maxLength: 50,
          })}
          error={!!errors.columnName}
        />

        <div className={styles.buttons}>
          <Button type="submit" variant="contained">
            {/* {t('addButton')} */} add column
          </Button>
          <Button onClick={onClose}>
            {/* {t('cancelButton')} */}
            cancel
          </Button>
        </div>
      </form>
    </ModalForm>
  );
}
