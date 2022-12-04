import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Board from 'components/boardManagementPage';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Loader from 'components/common/loader';
import { getBoardCall } from 'api/boards';
import useAuth from 'auth/useAuth';
import styles from './BoardManagementPage.module.scss';

function BoardManagementPage() {
  const { t } = useTranslation('board-management-page');
  const { boardId } = useParams();
  const { user } = useAuth();
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBoard = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { title } = await getBoardCall(user.token, boardId || '');
      setBoardTitle(title);
    } finally {
      setIsLoading(false);
    }
  }, [boardId, user.token]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <>
      <div className={`container ${styles.wrapper}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className={styles.title}>{`${t('title')} "${boardTitle || ''}"`}</h2>
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
          </>
        )}
      </div>
    </>
  );
}

export default BoardManagementPage;
