import React, { lazy, Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import yellow from '@mui/material/colors/yellow';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import Loader from 'components/common/loader';
import { DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './Task.module.scss';
import EditTaskForm from './editTaskForm';

const ConfirmationPopup = lazy(() => import('components/common/confirmationPopup'));

interface ITaskProps {
  title: string;
  isDragging?: boolean;
  isOverlay?: boolean;
  deleteTask?: () => void;
}

function Task({ title, isDragging = false, isOverlay = false, deleteTask = () => {} }: ITaskProps) {
  const [openConfirmationForm, setOpenConfirmationForm] = useState(false);
  const { t } = useTranslation('board-management-page');

  const handleEdit = () => {};

  const handleOpen = () => {
    setOpenConfirmationForm(true);
  };

  const handleClose = () => {
    setOpenConfirmationForm(false);
  };

  const handleDelete = () => {
    deleteTask();
    setOpenConfirmationForm(false);
  };

  return (
    <>
      <Box
        className={styles.task}
        m={1}
        sx={{
          bgcolor: isDragging ? yellow[100] : yellow[50],
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div className={styles.title}>{title}</div>

        {!isOverlay && (
          <div className={styles.buttons}>
            <IconButton className={styles.editBtn} onClick={handleEdit}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton className={styles.deleteBtn} onClick={handleOpen}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </Box>

      {!isOverlay && (
        <Dialog open={openConfirmationForm} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogContent className={styles.dialogContent}>
            <Suspense fallback={<Loader />}>
              <ConfirmationPopup
                itemToDelete={t('deleteTaskInfo', { title })}
                onClose={handleClose}
                onDelete={handleDelete}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Task;
