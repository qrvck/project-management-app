import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Board from 'components/boardManagementPage';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './BoardManagementPage.module.scss';

function BoardManagementPage() {
  const { t } = useTranslation('board-management-page');
  const { boardId } = useParams();

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2 className={styles.title}>
        {t('title')} [boardId={boardId}]
      </h2>

      <Box className={styles.buttons} mb={2}>
        <Button
          className={styles.redirectButton}
          variant="outlined"
          component={Link}
          to="/boards-list"
        >
          {t('backButton')}
        </Button>
        <Button className={styles.addButton} type="submit" variant="contained">
          + {t('addColumn')}
        </Button>
      </Box>
      <Board />
    </div>
  );
}

export default BoardManagementPage;
