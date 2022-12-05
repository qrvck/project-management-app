import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TNewTask } from 'models/types';
import styles from './CreateTask.module.scss';

type TCreateTaskType = {
  isOpen: boolean;
  onClose: () => void;
  addTask: (newTask: TNewTask) => void;
};

function CreateTask({ isOpen, onClose, addTask }: TCreateTaskType) {
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
            fullWidth
            label="Title"
            variant="outlined"
            autoComplete="off"
            margin="normal"
            {...register('title', { required: true, minLength: 2, maxLength: 50 })}
            error={!!errors.title}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            autoComplete="off"
            margin="normal"
            multiline
            maxRows="4"
            minRows="4"
            {...register('description', { required: true, minLength: 2, maxLength: 150 })}
            error={!!errors.description}
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
