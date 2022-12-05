import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './EditTaskForm.module.scss';

interface IEditTaskFormProps {
  currentTaskTitle: string;
  currentTaskDescription: string;
  updateTaskOnEdit: (taskTitle: string, taskDescription: string) => void;
  onClose: () => void;
}

interface IFormValues {
  taskTitle: string;
  taskDescription: string;
}

function EditTaskForm({
  currentTaskTitle,
  currentTaskDescription,
  updateTaskOnEdit,
  onClose,
}: IEditTaskFormProps) {
  const { t } = useTranslation('modal-forms');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      taskTitle: currentTaskTitle,
      taskDescription: currentTaskDescription,
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = ({ taskTitle, taskDescription }) => {
    updateTaskOnEdit(taskTitle, taskDescription || '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className={styles.titleInput}
          id="task-title"
          type="text"
          helperText={errors.taskTitle?.message ? t(`${errors.taskTitle.message}`) : ' '}
          error={!!errors.taskTitle}
          focused
          autoComplete="off"
          autoFocus
          margin="dense"
          label={t('taskNameLabel')}
          fullWidth
          variant="outlined"
          {...register('taskTitle', {
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
        />

        <TextField
          className={styles.descriptionInput}
          id="task-description"
          type="text"
          focused
          //multiline
          //rows={4}
          autoComplete="off"
          margin="dense"
          label={t('taskDescriptionLabel')}
          fullWidth
          variant="outlined"
          {...register('taskDescription')}
        />

        <div className={styles.buttons}>
          <Button
            className={styles.addButton}
            type="submit"
            variant="contained"
            disabled={!!errors.taskTitle}
          >
            {t('editButton')}
          </Button>
          <Button className={styles.cancelButton} variant="outlined" onClick={onClose}>
            {t('cancelButton')}
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditTaskForm;
