import React, { useState, Suspense, lazy } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Loader from 'components/common/loader';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { TaskContainer } from './task';
import { TTask } from 'models/types';
import { useTranslation } from 'react-i18next';
import styles from './TaskList.module.scss';

const EditTaskForm = lazy(() => import('./task/editTaskForm'));

type TTaskListProps = {
  items: TTask[];
  columnId: string;
  deleteTask: (columnId: string, taskId: string) => void;
};

function TaskList({ columnId, items, deleteTask }: TTaskListProps) {
  const { t } = useTranslation('board-management-page');
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const { setNodeRef } = useDroppable({
    id: `${columnId}drop`,
    data: {
      accepts: ['task'],
      columnId: columnId,
    },
  });

  const handleClose = () => {
    setShowEditTaskForm(false);
  };

  const handleOpen = () => {
    setShowEditTaskForm(true);
  };

  const updateTaskOnEdit = () => {
    console.log('updateTaskOnEdit');
  };

  return (
    <>
      <SortableContext items={items.map((task) => task._id)}>
        <Box ref={setNodeRef} className={styles.scrollable}>
          <ul>
            {items.map((item) => (
              <TaskContainer
                key={item._id}
                {...item}
                columnId={columnId}
                deleteTask={deleteTask}
                openEditForm={handleOpen}
              />
            ))}
          </ul>
        </Box>
      </SortableContext>
      <Dialog open={showEditTaskForm} onClose={handleClose} maxWidth="xs" fullWidth>
        <h3 className={styles.formTitle}>{t('editTask')}</h3>
        <DialogContent className={styles.dialogContent}>
          <Suspense fallback={<Loader />}>
            <EditTaskForm
              currentTaskTitle={''}
              currentTaskDescription={''}
              updateTaskOnEdit={updateTaskOnEdit}
              onClose={handleClose}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskList;
