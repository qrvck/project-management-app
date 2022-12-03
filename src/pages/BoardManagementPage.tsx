import React, { useEffect, useState } from 'react';
import Board from 'components/boardManagementPage';
import useAuth from 'auth/useAuth';
import { useTranslation } from 'react-i18next';
import { AddColumn } from 'components/boardManagementPage/addColumnForm';
import { TAddColumnFormValues } from 'components/boardManagementPage/addColumnForm';
import { SubmitHandler } from 'react-hook-form';
import { ColumnAPI } from 'api/column';
import { TColumn } from 'models/types';

import styles from './BoardManagementPage.module.scss';

type TBoardManagementPageProps = {
  boardId?: string;
};

function BoardManagementPage({ boardId = '638a9ea62decb250ebf17291' }: TBoardManagementPageProps) {
  const { t } = useTranslation('board-management-page');
  const { user } = useAuth();
  const [columns, setColumns] = useState<TColumn[]>([]);

  useEffect(() => {
    ColumnAPI.getAll(user.token, boardId).then((dataColumns) => {
      if (!dataColumns) return;
      setColumns(dataColumns);
      console.log(dataColumns);
    });
  }, [boardId, user.token]);

  const handlerSubmit: SubmitHandler<TAddColumnFormValues> = async (data) => {
    const newColumn = await ColumnAPI.create(user.token, boardId, data.columnName, 1);
    console.log(newColumn);
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <AddColumn boardId={boardId} onSubmit={handlerSubmit} />
      </div>
      <Board boardId={boardId} columns={columns} />
    </div>
  );
}

export default BoardManagementPage;
