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

const ConfirmationPopup = lazy(() => import('components/common/confirmationPopup'));
const EditTaskForm = lazy(() => import('./editTaskForm'));

interface ITaskProps {
  title: string;
  description: string;
  order: number;
  columnId: string;
  _id: string;
  isDragging?: boolean;
  isOverlay?: boolean;
  deleteTask?: () => void;
  openEditForm?: (
    columnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string
  ) => void;
}

function Task({
  title,
  description,
  order,
  columnId,
  _id,
  isDragging = false,
  isOverlay = false,
  deleteTask = () => {},
  openEditForm = () => {},
}: ITaskProps) {
  const [openConfirmationForm, setOpenConfirmationForm] = useState(false);
  const [editForm, setOpenEditForm] = useState(false);
  const { t } = useTranslation('board-management-page');

  const handleOpenEdit = () => {
    setOpenEditForm(true);
  };

  const handleOpenDeleteForm = () => {
    setOpenConfirmationForm(true);
  };

  const handleCloseEdit = () => {
    setOpenEditForm(false);
  };

  const handleClose = () => {
    setOpenConfirmationForm(false);
  };

  const handleEdit = (newTitle: string, newDescription: string) => {
    openEditForm(columnId, _id, newTitle, order, newDescription);
    setOpenEditForm(false);
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
            <IconButton className={styles.editBtn} onClick={handleOpenEdit}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton className={styles.deleteBtn} onClick={handleOpenDeleteForm}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </Box>

      <Dialog open={openConfirmationForm} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent className={styles.dialogConfirmation}>
          <Suspense fallback={<Loader />}>
            <ConfirmationPopup
              itemToDelete={t('deleteTaskInfo', { title })}
              onClose={handleClose}
              onDelete={handleDelete}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
      <Dialog open={editForm} onClose={handleCloseEdit} maxWidth="xs" fullWidth>
        <h3 className={styles.formTitle}>{t('editTask')}</h3>
        <DialogContent className={styles.dialogEdit}>
          <Suspense fallback={<Loader />}>
            <EditTaskForm
              currentTaskTitle={title}
              currentTaskDescription={description}
              updateTaskOnEdit={handleEdit}
              onClose={handleCloseEdit}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Task;
