import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import { Board } from 'components/boardManagementPage';
import CustomSnackBar from 'components/common/customSnackbar';
import FullScreenLoader from 'components/common/fullScreenLoader';
import Loader from 'components/common/loader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { TaskAPI } from 'api/task';
import { ColumnAPI } from 'api/column';
import { TColumn, TNewTask, TTask } from 'models/types';
import { AddColumn } from 'components/boardManagementPage/addColumnForm';
import { TAddColumnFormValues } from 'components/boardManagementPage/addColumnForm';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import { getBoardCall } from 'api/boards';
import { useParams, Link } from 'react-router-dom';
import styles from './BoardManagementPage.module.scss';

const CreateTask = lazy(() => import('components/boardManagementPage/createTask'));

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return items.sort((a, b) => a.order - b.order);
}

type TAddTaskFormState = {
  isOpen: boolean;
  columnId: string | null;
  boardId: string | null;
  order: number;
};

function BoardManagementPage() {
  const { boardId } = useParams();
  const { t } = useTranslation('board-management-page');
  const { user } = useAuth();
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackBar, setSnackBar] = useState<TSnackBarState>({
    isOpen: false,
    type: 'success',
    message: '',
  });
  const [boardTitle, setBoardTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [boardNotFound, setBoardNotFound] = useState(false);
  const [taskFormState, setTaskFormState] = useState<TAddTaskFormState>({
    isOpen: false,
    columnId: null,
    boardId: boardId || null,
    order: 0,
  });

  const getBoard = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { title } = await getBoardCall(user.token, boardId || '');
      setBoardTitle(title);
    } catch (error) {
      setBoardNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [boardId, user.token]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const getTasks = useCallback(
    (dataColumns: TColumn[]) => {
      if (!dataColumns.length || !boardId) return;

      const promises: Promise<TTask[]>[] = dataColumns.map((column) =>
        TaskAPI.getAll(user.token, boardId, column._id)
      );

      Promise.all(promises).then((taskData) => {
        if (!taskData) return;

        const newColumns = [...dataColumns];

        taskData.forEach((task, idx) => {
          newColumns[idx] = { ...newColumns[idx], items: sortByOrder(task) };
        });

        setColumns([...newColumns]);
        snackBar.message && setSnackBar((prev) => ({ ...prev, isOpen: true }));
      });
    },
    [boardId, snackBar.message, user.token]
  );

  const getColumnsAndTasks = useCallback(() => {
    if (!boardId) return;

    ColumnAPI.getAll(user.token, boardId).then((dataColumns) => {
      setLoading(false);

      if (!dataColumns) return;

      dataColumns.length && getTasks(sortByOrder(dataColumns));
    });
  }, [getTasks, boardId, user.token]);

  useEffect(() => {
    getColumnsAndTasks();
  }, [getColumnsAndTasks]);

  if (!boardId) return <></>;

  const addColumnSubmit: SubmitHandler<TAddColumnFormValues> = async (data) => {
    if (!boardId) return;

    setLoading(true);
    const index = columns.length ? columns[columns.length - 1].order + 1 : 0;
    const newColumn = await ColumnAPI.create(user.token, boardId, data.columnName, index);

    if (!newColumn) {
      setLoading(false);
      setSnackBar((prev) => ({
        ...prev,
        isOpen: true,
        type: 'error',
        message: 'columnNotAdd',
      }));
      return;
    }

    getColumnsAndTasks();

    setSnackBar((prev) => ({
      ...prev,
      type: 'success',
      message: 'columnAdd',
    }));
  };

  const handleCloseSnackBar = () => {
    setSnackBar((prev) => ({ ...prev, isOpen: false, message: '' }));
  };

  const deleteTaskSubmit = (columnId: string, taskId: string) => {
    setLoading(true);

    TaskAPI.delete(user.token, boardId, columnId, taskId).then((taskData) => {
      if (!taskData) {
        setLoading(false);
        setSnackBar((prev) => ({
          ...prev,
          isOpen: true,
          type: 'error',
          message: 'taskNotDeleted',
        }));
        return;
      }
      getColumnsAndTasks();

      setSnackBar((prev) => ({
        ...prev,
        type: 'success',
        message: 'taskDeleted',
      }));
    });
  };

  const addTaskSubmit = (taskParams: TNewTask) => {
    const { columnId, order } = taskFormState;
    const newTask = { ...taskParams, order, userId: user.id, users: [] };

    if (!columnId || !boardId) return;

    closeTaskForm();

    setLoading(true);

    TaskAPI.create(user.token, boardId, columnId, newTask).then((taskData) => {
      if (!taskData) {
        setLoading(false);
        setSnackBar((prev) => ({
          ...prev,
          isOpen: true,
          type: 'error',
          message: 'taskNotCreated',
        }));
        return;
      }

      getColumnsAndTasks();

      setSnackBar((prev) => ({
        ...prev,
        type: 'success',
        message: 'taskCreated',
      }));
    });
  };

  const openTaskForm = ({ isOpen, columnId }: { isOpen: boolean; columnId: string }) => {
    setTaskFormState((prev) => ({ ...prev, isOpen, columnId }));
  };

  const closeTaskForm = () => {
    setTaskFormState((prev) => ({ ...prev, isOpen: false }));
  };

  const editTaskSubmit = (task: TTask) => {
    const { _id, title, order, description, columnId, userId, users } = task;

    setLoading(true);

    TaskAPI.update(user.token, boardId, columnId, userId, _id, title, order, description).then(
      (tasksData) => {
        if (!tasksData) return;

        getColumnsAndTasks();

        setSnackBar((prev) => ({
          ...prev,
          type: 'success',
          message: 'update',
        }));
      }
    );
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      {boardNotFound && <Navigate to="/404" />}
      <div className={styles.header}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Box className={styles.buttons} mb={2}>
              <AddColumn onSubmit={addColumnSubmit} />
              <Button
                className={styles.redirectButton}
                variant="outlined"
                component={Link}
                to="/boards-list"
              >
                {t('backButton')}
              </Button>
            </Box>
            <h2 className={styles.title}>{`${t('title')} "${boardTitle || ''}"`}</h2>
          </>
        )}
      </div>
      {!!columns.length && (
        <Board
          boardId={boardId}
          columns={columns}
          setColumns={setColumns}
          setSnackBar={setSnackBar}
          openTaskForm={openTaskForm}
          deleteTask={deleteTaskSubmit}
        />
      )}
      {loading && <FullScreenLoader />}
      <CustomSnackBar
        onClose={handleCloseSnackBar}
        isOpen={snackBar.isOpen}
        type={snackBar.type}
        message={t(`${snackBar.message}`)}
      />
      <Dialog open={taskFormState.isOpen} onClose={closeTaskForm} maxWidth="xs" fullWidth>
        <h3 className={styles.createTaskTitle}>{t('createTask')}</h3>
        <DialogContent className={styles.dialogContent}>
          <Suspense fallback={<Loader />}>
            <CreateTask addTask={addTaskSubmit} onClose={closeTaskForm} {...taskFormState} />
          </Suspense>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BoardManagementPage;
