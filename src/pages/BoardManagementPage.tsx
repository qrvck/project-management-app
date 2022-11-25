import React from 'react';
import { useTranslation } from 'react-i18next';
import Board from 'components/boardManagementPage';
import { AddColumn } from 'components/boardManagementPage/addColumn';
import styles from './BoardsListPage.module.scss';

type TBoardManagementPageProps = {
  boardId?: number;
};

function BoardManagementPage({ boardId = 1 }: TBoardManagementPageProps) {
  const { t } = useTranslation('board-management-page');

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2>
        {t('title')} [boardId={boardId}]
      </h2>
      <AddColumn />
      <Board />
    </div>
  );
}

export default BoardManagementPage;
