import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { t } = useTranslation('edit-profile-page');

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.pageTitle}>{t('title')}</h2>
      <div className={styles.warning}>
        <PriorityHighIcon className={styles.warningIcon} />
        <span>{t('warning')}</span>
      </div>
      <Button className={styles.deleteButton} variant="contained">
        {t('deleteButton')}
      </Button>
    </div>
  );
}

export default EditProfilePage;
