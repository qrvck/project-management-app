import React from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

import styles from './CreateTask.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

type TCreateTaskType = {
  isOpen: boolean;
  columnId: string | null;
  boardId: string;
  onClose: () => void;
};

function CreateTask({ isOpen, columnId, boardId, onClose }: TCreateTaskType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskName: '',
      taskDescription: '',
    },
  });

  if (!columnId) return <></>;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <h3 className={styles.title}>Create task</h3>
      <DialogContent>
        <form noValidate>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            autoComplete="off"
            margin="normal"
            {...register('taskName', { required: true, minLength: 2, maxLength: 50 })}
            error={!!errors.taskName}
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
            {...register('taskDescription', { required: true, minLength: 2, maxLength: 150 })}
            error={!!errors.taskDescription}
          />
          <Button>Create</Button>
          <Button onClick={onClose}>Cancel</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
