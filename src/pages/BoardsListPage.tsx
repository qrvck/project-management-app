import React from 'react';
import { useTranslation } from 'react-i18next';
import BoardsList from 'components/boardsListPage/boardsList';

import styles from './BoardsListPage.module.scss';

function BoardsListPage() {
  const { t } = useTranslation('boards-list-page');

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('title')}</h2>
        <BoardsList />
      </div>
    </div>
  );
}

export default BoardsListPage;
