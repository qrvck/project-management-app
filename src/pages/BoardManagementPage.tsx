import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Board, CreateTask } from 'components/boardManagementPage';

import styles from './BoardManagementPage.module.scss';

type TBoardManagementPageProps = {
  boardId?: string;
};

type TBoardManagementPageState = {
  isOpen: boolean;
  columnId: string | null;
};

function BoardManagementPage({ boardId = '1' }: TBoardManagementPageProps) {
  const [state, setState] = useState<TBoardManagementPageState>({
    isOpen: false,
    columnId: null,
  });

  const { t } = useTranslation('board-management-page');

  const showCreateForm = (columnId: string) => {
    setState({ isOpen: true, columnId });
  };

  const handlerClose = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2>
        {t('title')} [boardId={boardId}]
      </h2>
      <Box mb={2}>
        <Button variant="contained">+ {t('addColumn')}</Button>
      </Box>
      <Board addTask={showCreateForm} />
      <CreateTask boardId={boardId} onClose={handlerClose} {...state} />
    </div>
  );
}

export default BoardManagementPage;
