import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import UserForm from 'components/common/userForm/UserForm';
import { TFormValues } from 'components/common/userForm/UserForm.types';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { t } = useTranslation('edit-profile-page');

  const onSubmit: SubmitHandler<TFormValues> = ({ name, login, password }) => {
    //добавить функционал
  };

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.pageTitle}>{t('title')}</h2>
      <div className={styles.warning}>
        <PriorityHighIcon className={styles.warningIcon} />
        <span>{t('warning')}</span>
      </div>
      <div className={styles.formContainer}>
        <UserForm submitButton={t('editButton')} submitCallback={onSubmit} />
      </div>
      <Button className={styles.deleteButton} variant="contained">
        {t('deleteButton')}
      </Button>
    </div>
  );
}

export default EditProfilePage;
