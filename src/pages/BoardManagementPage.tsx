import React, { useCallback, useEffect, useState } from 'react';
import useAuth from 'auth/useAuth';
import { Board, CreateTask } from 'components/boardManagementPage';
import CustomSnackBar from 'components/common/customSnackbar';
import FullScreenLoader from 'components/common/fullScreenLoader';
import Loader from 'components/common/loader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { TaskAPI } from 'api/task';
import { ColumnAPI } from 'api/column';
import { TColumn, TTask } from 'models/types';
import { AddColumn } from 'components/boardManagementPage/addColumnForm';
import { TAddColumnFormValues } from 'components/boardManagementPage/addColumnForm';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import { getBoardCall } from 'api/boards';
import { useParams, Link } from 'react-router-dom';
import styles from './BoardManagementPage.module.scss';

const sortByOrder = (items: TColumn[]) => {
  return items.sort((a, b) => a.order - b.order);
};

type TBoardManagementPageState = {
  isOpen: boolean;
  columnId: string | null;
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
  const [state, setState] = useState<TBoardManagementPageState>({
    isOpen: false,
    columnId: null,
  });

  const getBoard = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { title } = await getBoardCall(user.token, boardId || '');
      setBoardTitle(title);
    } finally {
      setIsLoading(false);
    }
  }, [boardId, user.token]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const addTasks = useCallback(
    (dataColumns: TColumn[]) => {
      if (!dataColumns.length || !boardId) return;

      const promises: Promise<TTask[]>[] = dataColumns.map((column) =>
        TaskAPI.getAll(user.token, boardId, column._id)
      );

      Promise.all(promises).then((taskData) => {
        if (!taskData) return;

        const newColumns = [...dataColumns];

        taskData.forEach((task, idx) => {
          newColumns[idx] = { ...newColumns[idx], items: task };
        });

        setColumns([...newColumns]);
      });
    },
    [boardId, user.token]
  );

  useEffect(() => {
    if (!boardId) return;

    ColumnAPI.getAll(user.token, boardId).then((dataColumns) => {
      setLoading(false);

      if (!dataColumns) return;

      dataColumns.length && addTasks(sortByOrder(dataColumns));
    });
  }, [addTasks, boardId, user.token]);

  if (!boardId) return <></>;

  const handlerSubmit: SubmitHandler<TAddColumnFormValues> = async (data) => {
    if (!boardId) return;

    setLoading(true);
    const index = columns.length ? columns[columns.length - 1].order + 1 : 0;
    const newColumn = await ColumnAPI.create(user.token, boardId, data.columnName, index);
    setLoading(false);

    if (!newColumn) {
      setSnackBar((prev) => ({
        ...prev,
        isOpen: true,
        type: 'error',
        message: 'columnNotAdd',
      }));
      return;
    }

    setColumns((prev) => [...prev, newColumn]);

    setSnackBar((prev) => ({
      ...prev,
      isOpen: true,
      type: 'success',
      message: 'columnAdd',
    }));
  };

  const handleCloseSnackBar = () => {
    setSnackBar((prev) => ({ ...prev, isOpen: false }));
  };

  const showCreateForm = (columnId: string) => {
    setState({ isOpen: true, columnId });
  };

  const handlerClose = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className={styles.title}>{`${t('title')} "${boardTitle || ''}"`}</h2>
            <Box className={styles.buttons} mb={2}>
              <AddColumn onSubmit={handlerSubmit} />
              <Button
                className={styles.redirectButton}
                variant="outlined"
                component={Link}
                to="/boards-list"
              >
                {t('backButton')}
              </Button>
            </Box>
          </>
        )}
      </div>
      {!!columns.length && (
        <Board
          boardId={boardId}
          columns={columns}
          setColumns={setColumns}
          setSnackBar={setSnackBar}
          addTask={showCreateForm}
        />
      )}
      {loading && <FullScreenLoader />}
      <CustomSnackBar
        onClose={handleCloseSnackBar}
        isOpen={snackBar.isOpen}
        type={snackBar.type}
        message={t(`${snackBar.message}`)}
      />
      <CreateTask boardId={boardId} onClose={handlerClose} {...state} />
    </div>
  );
}

export default BoardManagementPage;
