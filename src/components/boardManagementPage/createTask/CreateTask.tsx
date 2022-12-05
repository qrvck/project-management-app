import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TNewTask } from 'models/types';
import { useTranslation } from 'react-i18next';
import styles from './CreateTask.module.scss';

type TCreateTaskType = {
  isOpen: boolean;
  onClose: () => void;
  addTask: (newTask: TNewTask) => void;
};

function CreateTask({ isOpen, onClose, addTask }: TCreateTaskType) {
  const { t } = useTranslation('modal-forms');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const submit: SubmitHandler<{ title: string; description: string }> = (data, event) => {
    event?.preventDefault();
    addTask(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ title: '', description: '' });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <h3 className={styles.title}>Create task</h3>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(submit)}>
          <TextField
            className={styles.input}
            fullWidth
            label={t('taskNameLabel')}
            variant="outlined"
            autoComplete="off"
            margin="dense"
            helperText={errors.title?.message ? t(`${errors.title.message}`) : ' '}
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
            className={styles.input}
            fullWidth
            label={t('taskDescriptionLabel')}
            variant="outlined"
            autoComplete="off"
            margin="dense"
            multiline
            maxRows="4"
            minRows="4"
            helperText={errors.description?.message ? t(`${errors.description.message}`) : ' '}
            {...register('description', {
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
            error={!!errors.description}
          />
          <div className={styles.buttons}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
