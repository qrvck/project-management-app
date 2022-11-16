import React from 'react';
import { useTranslation } from 'react-i18next';
import BoardsList from 'components/boardsListPage/boardsList/BoardsList';

function BoardsListPage() {
  const { t } = useTranslation('boards-list-page');

  return (
    <>
      <h2>{t('title')}</h2>
      <BoardsList />
    </>
  );
}

export default BoardsListPage;
