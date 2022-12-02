import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import UserForm from 'components/common/userForm/UserForm';
import { TFormValues } from 'components/common/userForm/UserForm.types';
import styles from './EditProfilePage.module.scss';
import FullScreenLoader from 'components/common/fullScreenLoader';
import CustomSnackBar from 'components/common/customSnackbar';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import { editUser } from 'api/user';
import useAuth from 'auth/useAuth';

function EditProfilePage() {
  const { t } = useTranslation('edit-profile-page');

  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<TSnackBarState>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const updateUser = async (name: string, login: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await editUser(user.token, user.id, name, login, password);
      setSnackBar({ type: 'success', isOpen: true, message: 'successfulEdit' });
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message === 'Login already exist' ? 'loginExists' : 'unknownError';
      } else {
        errorMessage = 'unknownError';
      }
      setSnackBar({ isOpen: true, type: 'error', message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSnackBarOpen = (): void => {
    setSnackBar((prevState) => {
      return { ...prevState, isOpen: !prevState.isOpen };
    });
  };

  const handleFormSubmit: SubmitHandler<TFormValues> = ({ name, login, password }): void => {
    updateUser(name, login, password);
  };

  return (
    <>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.pageTitle}>{t('title')}</h2>
        <div className={styles.warning}>
          <PriorityHighIcon className={styles.warningIcon} />
          <span>{t('warning')}</span>
        </div>
        <div className={styles.formContainer}>
          <UserForm submitButton={t('editButton')} submitCallback={handleFormSubmit} />
        </div>
        <Button className={styles.deleteButton} variant="contained">
          {t('deleteButton')}
        </Button>
      </div>
      <CustomSnackBar
        {...snackBar}
        closeCallback={toggleSnackBarOpen}
        message={t(`${snackBar.message}`)}
      />
      {isLoading && <FullScreenLoader />}
    </>
  );
}

export default EditProfilePage;
