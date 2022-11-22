import React from 'react';
import { useTranslation } from 'react-i18next';
import Board from 'components/boardManagementPage';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type TBoardManagementPageProps = {
  boardId?: number;
};

function BoardManagementPage({ boardId = 1 }: TBoardManagementPageProps) {
  const { t } = useTranslation('board-management-page');

  return (
    <>
      <h2>
        {t('title')} [boardId={boardId}]
      </h2>
      <Box mb={2}>
        <Button variant="contained">+ {t('addColumn')}</Button>
      </Box>
      <Board />
    </>
  );
}

export default BoardManagementPage;
