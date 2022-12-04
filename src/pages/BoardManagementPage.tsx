import React, { useCallback, useEffect, useState } from 'react';
import useAuth from 'auth/useAuth';
import Board from 'components/boardManagementPage';
import Loader from 'components/common/loader';
import { useTranslation } from 'react-i18next';
import { AddColumn } from 'components/boardManagementPage/addColumnForm';
import { TAddColumnFormValues } from 'components/boardManagementPage/addColumnForm';
import { SubmitHandler } from 'react-hook-form';
import { ColumnAPI } from 'api/column';
import { TColumn, TTask } from 'models/types';
import { taskAPI } from 'api/task';

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

  const addTasks = useCallback(
    (dataColumns: TColumn[]) => {
      if (!dataColumns.length) return;

      const promises: Promise<TTask[]>[] = dataColumns.map((column) =>
        taskAPI.getAll(user.token, boardId, column._id)
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
    const index = columns.length ? columns[columns.length - 1].order + 1 : 0;
    const newColumn = await ColumnAPI.create(user.token, boardId, data.columnName, index);
    setColumns((prev) => [...prev, newColumn]);
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <AddColumn onSubmit={handlerSubmit} />
      </div>
      {!!columns.length && <Board boardId={boardId} columns={columns} setColumns={setColumns} />}
      {loading && <Loader />}
    </div>
  );
}

export default BoardManagementPage;
