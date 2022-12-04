import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Delete from '@mui/icons-material/Delete';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import FullScreenLoader from 'components/common/fullScreenLoader';
import { deleteBoardCall } from 'api/boards';
import useAuth from 'auth/useAuth';
import styles from './BoardCard.module.scss';

interface IBoardCardProps {
  boardId: string;
  title: string;
  owner: string;
  updateBoards: () => void;
  updateSnackBar: ({ isOpen, type, message }: TSnackBarState) => void;
}

function BoardCard({ boardId, title, owner, updateBoards, updateSnackBar }: IBoardCardProps) {
  const { user } = useAuth();
  const { t } = useTranslation('boards-list-page');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteBoard = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await deleteBoardCall(user.token, boardId);
      updateSnackBar({ type: 'success', isOpen: true, message: 'successDeletion' });
      updateBoards();
    } catch (error) {
      if (error instanceof Error) {
        updateSnackBar({
          isOpen: true,
          type: 'error',
          message: 'unknownError',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.board}>
        <Link className={styles.link} to={`/board-management/${boardId}`}>
          <Paper className={styles.paper} elevation={4}>
            <p className={styles.title}>{title}</p>
            <p className={styles.owner}>
              {t('owner')}: {owner}
            </p>
          </Paper>
        </Link>
        <IconButton className={styles.deleteBtn} onClick={deleteBoard}>
          <Delete />
        </IconButton>
      </div>

      {isLoading && <FullScreenLoader />}
    </>
  );
}

export default BoardCard;
