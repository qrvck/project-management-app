import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TNewTask } from 'models/types';
import { useTranslation } from 'react-i18next';
import styles from './CreateTask.module.scss';

type TCreateTaskType = {
  onClose: () => void;
  addTask: (newTask: TNewTask) => void;
};

function CreateTask({ onClose, addTask }: TCreateTaskType) {
  const { t } = useTranslation('modal-forms');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: ' ',
    },
  });

  const submit: SubmitHandler<{ title: string; description: string }> = (data) => {
    addTask(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(submit)}>
      <TextField
        className={styles.titleInput}
        id="task-title"
        fullWidth
        focused
        autoFocus
        helperText={errors.title?.message ? t(`${errors.title.message}`) : ' '}
        label={t('createTaskLabel')}
        variant="outlined"
        autoComplete="off"
        margin="dense"
        {...register('title', {
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
        error={!!errors.title}
      />
      <TextField
        className={styles.titleInput}
        focused
        fullWidth
        label={t('taskDescriptionLabel')}
        variant="outlined"
        autoComplete="off"
        margin="dense"
        multiline
        maxRows="4"
        minRows="4"
        {...register('description')}
      />
      <div className={styles.buttons}>
        <Button
          className={styles.addButton}
          type="submit"
          variant="contained"
          disabled={!!errors.title}
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

export default CreateTask;
