import React, { useState, useEffect, useCallback } from 'react';
import BoardCard from '../boardCard';
import Loader from 'components/common/loader';
import { getAllBoardsCall } from 'api/boards';
import { TBoards } from 'api/types';
import useAuth from 'auth/useAuth';
import { useTranslation } from 'react-i18next';
import styles from './BoardsList.module.scss';

function BoardsList() {
  const { t } = useTranslation('boards-list-page');
  const { user } = useAuth();
  const [boards, setBoards] = useState<TBoards>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getAllBoards = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const boards: TBoards = await getAllBoardsCall(user.token);
      setBoards(boards);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage('unknownError');
      }
    } finally {
      setIsLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    getAllBoards();
  }, [getAllBoards]);

  return (
    <>
      <div className={styles.list}>
        {isLoading && <Loader />}
        {!!boards.length &&
          !isLoading &&
          !errorMessage &&
          boards.map((board) => (
            <BoardCard key={board._id} to={board._id} title={board.title} owner={board.owner} />
          ))}
      </div>
      {errorMessage && <p>{t(`${errorMessage}`)}</p>}
      {!boards.length && !isLoading && !errorMessage && <p>{t('noBoards')}</p>}
    </>
  );
}

export default BoardsList;
