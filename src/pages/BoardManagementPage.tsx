import React from 'react';
import { Board } from '../components/boardManagementPage';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type TBoardManagementPageProps = {
  boardId?: number;
};

function BoardManagementPage({ boardId = 1 }: TBoardManagementPageProps) {
  const { t } = useTranslation('board-management-page');

  return (
    <>
      <h2>Board Management Page, boradId={boardId}</h2>
      <Box mb={2}>
        <Button variant="contained">+ {t('addColumn')}</Button>
      </Box>
      <Board />
    </>
  );
}

export default BoardManagementPage;
