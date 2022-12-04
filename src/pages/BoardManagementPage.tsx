import React, { useCallback, useEffect, useState } from 'react';
import useAuth from 'auth/useAuth';
import Board from 'components/boardManagementPage';
import CustomSnackBar from 'components/common/customSnackbar';
import FullScreenLoader from 'components/common/fullScreenLoader';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { TaskAPI } from 'api/task';
import { ColumnAPI } from 'api/column';
import { TColumn, TTask } from 'models/types';
import { AddColumn } from 'components/boardManagementPage/addColumnForm';
import { TAddColumnFormValues } from 'components/boardManagementPage/addColumnForm';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import styles from './BoardManagementPage.module.scss';

type TBoardManagementPageProps = {
  boardId?: string;
};

const sortByOrder = (items: TColumn[]) => {
  return items.sort((a, b) => a.order - b.order);
};

function BoardManagementPage({ boardId = '638a9ea62decb250ebf17291' }: TBoardManagementPageProps) {
  const { t } = useTranslation('board-management-page');
  const { user } = useAuth();
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackBar, setSnackBar] = useState<TSnackBarState>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const addTasks = useCallback(
    (dataColumns: TColumn[]) => {
      if (!dataColumns.length) return;

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
    ColumnAPI.getAll(user.token, boardId).then((dataColumns) => {
      setLoading(false);

      if (!dataColumns) return;

      dataColumns.length && addTasks(sortByOrder(dataColumns));
    });
  }, [addTasks, boardId, user.token]);

  const handlerSubmit: SubmitHandler<TAddColumnFormValues> = async (data) => {
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

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <AddColumn onSubmit={handlerSubmit} />
      </div>
      {!!columns.length && (
        <Board
          boardId={boardId}
          columns={columns}
          setColumns={setColumns}
          setSnackBar={setSnackBar}
        />
      )}
      {loading && <FullScreenLoader />}
      {
        <CustomSnackBar
          onClose={handleCloseSnackBar}
          isOpen={snackBar.isOpen}
          type={snackBar.type}
          message={t(`${snackBar.message}`)}
        />
      }
    </div>
  );
}

export default BoardManagementPage;
