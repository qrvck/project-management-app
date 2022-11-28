import React from 'react';
import { useTranslation } from 'react-i18next';
import Board from 'components/boardManagementPage';
import { AddColumn } from 'components/boardManagementPage/addColumnForm';
import styles from './BoardManagementPage.module.scss';
import { TAddColumnFormValues } from 'components/boardManagementPage/addColumnForm';
import { SubmitHandler } from 'react-hook-form';

type TBoardManagementPageProps = {
  boardId?: number;
};

function BoardManagementPage({ boardId = 1 }: TBoardManagementPageProps) {
  const { t } = useTranslation('board-management-page');

  const handlerSubmit: SubmitHandler<TAddColumnFormValues> = (data) => {
    console.log('submit from BoardManagementPage: ', data);
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2>
        {t('title')} [boardId={boardId}]
      </h2>
      <AddColumn boardId={boardId} onSubmit={handlerSubmit} />
      <Board boardId={boardId} />
    </div>
  );
}

export default BoardManagementPage;
