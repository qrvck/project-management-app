import React, { useState, lazy, Suspense } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import UserForm from 'components/common/userForm/UserForm';
import { TFormValues } from 'components/common/userForm/UserForm.types';
import styles from './EditProfilePage.module.scss';
import FullScreenLoader from 'components/common/fullScreenLoader';
import CustomSnackBar from 'components/common/customSnackbar';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import Loader from 'components/common/loader';
import { editUserCall, deleteUserCall } from 'api/user';
import useAuth from 'auth/useAuth';

const ConfirmationPopup = lazy(() => import('components/common/confirmationPopup'));

function EditProfilePage() {
  const { t } = useTranslation('edit-profile-page');

  const { user, logout } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [snackBar, setSnackBar] = useState<TSnackBarState>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const updateUser = async (name: string, login: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await editUserCall(user.token, user.id, name, login, password);
      setSnackBar({ type: 'success', isOpen: true, message: 'successfulEdit' });
    } catch (error) {
      if (error instanceof Error) {
        setSnackBar({
          isOpen: true,
          type: 'error',
          message: error.message === 'Login already exist' ? 'loginExists' : 'unknownError',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await deleteUserCall(user.token, user.id);
      logout();
    } catch (error) {
      setSnackBar({ isOpen: true, type: 'error', message: 'unknownError' });
    } finally {
      setIsLoading(false);
    }
  };

  const closeSnackBar = (): void => {
    setSnackBar((prevState) => {
      return { ...prevState, isOpen: false };
    });
  };

  const openConfirmationPopup = () => {
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setConfirmationPopupOpen(false);
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
          <UserForm submitButton={t('editButton')} onSubmit={handleFormSubmit} />
        </div>
        <Button className={styles.deleteButton} variant="contained" onClick={openConfirmationPopup}>
          {t('deleteButton')}
        </Button>
      </div>
      <Dialog
        open={isConfirmationPopupOpen}
        onClose={closeConfirmationPopup}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent className={styles.dialogContent}>
          <Suspense fallback={<Loader />}>
            <ConfirmationPopup
              itemToDelete={t('profile')}
              onClose={closeConfirmationPopup}
              onDelete={deleteUser}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
      <CustomSnackBar {...snackBar} onClose={closeSnackBar} message={t(`${snackBar.message}`)} />
      {isLoading && <FullScreenLoader />}
    </>
  );
}

export default EditProfilePage;
