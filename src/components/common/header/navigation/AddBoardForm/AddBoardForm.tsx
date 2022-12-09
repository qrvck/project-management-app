import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FullScreenLoader from 'components/common/fullScreenLoader';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getUserCall } from 'api/user';
import { createBoardCall } from 'api/boards';
import useAuth from 'auth/useAuth';
import { updateBoardsAfterCreation } from 'store/boardsSlice';
import styles from './AddBoardForm.module.scss';

interface IAddBoardFormProps {
  onClose: () => void;
  updateSnackBar: ({ isOpen, type, message }: TSnackBarState) => void;
}

interface IFormValues {
  boardTitle: string;
}

function AddBoardForm({ onClose, updateSnackBar }: IAddBoardFormProps) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t } = useTranslation('modal-forms');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createBoard = async (title: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { name: owner } = await getUserCall(user.token, user.id);
      await createBoardCall(user.token, owner, title);
      updateSnackBar({ type: 'success', isOpen: true, message: 'successfulCreation' });
      dispatch(updateBoardsAfterCreation(true));
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
      onClose();
    }
  };

  const onSubmit: SubmitHandler<IFormValues> = ({ boardTitle }) => {
    createBoard(boardTitle);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className={styles.titleInput}
          id="board-title"
          type="text"
          helperText={errors.boardTitle?.message ? t(`${errors.boardTitle.message}`) : ' '}
          error={!!errors.boardTitle}
          focused
          autoComplete="off"
          autoFocus
          margin="dense"
          label={t('createBoardLabel')}
          fullWidth
          variant="outlined"
          {...register('boardTitle', {
            required: 'fieldRequired' || '',
            minLength: {
              value: 2,
              message: 'fieldLength' || '',
            },
            maxLength: {
              value: 50,
              message: 'fieldLength' || '',
            },
          })}
        />
        <div className={styles.buttons}>
          <Button
            className={styles.addButton}
            type="submit"
            variant="contained"
            disabled={!!errors.boardTitle}
          >
            {t('addButton')}
          </Button>
          <Button className={styles.cancelButton} variant="outlined" onClick={onClose}>
            {t('cancelButton')}
          </Button>
        </div>
      </form>
      {isLoading && <FullScreenLoader />}
    </>
  );
}

export default AddBoardForm;
