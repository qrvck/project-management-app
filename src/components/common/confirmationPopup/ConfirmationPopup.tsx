import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { useTranslation } from 'react-i18next';

import styles from './ConfirmationPopup.module.scss';

type TDialogProps = {
  itemToDelete: string;
  onClose: () => void;
  onDelete: () => void;
};

const ConfirmationPopup: React.FC<TDialogProps> = ({ onClose, onDelete, itemToDelete }) => {
  const { t } = useTranslation('confirmation-popup');

  return (
    <div className={styles.confirmation}>
      <NewReleasesOutlinedIcon color="warning" fontSize="large" className={styles.icon} />
      <div>
        <Typography className={styles.title} mb={3}>
          {t('deleteColumnConfirmation', { itemToDelete })}
        </Typography>
        <Button
          onClick={onDelete}
          variant="contained"
          color="warning"
          size="small"
          className={styles.delete}
        >
          {t('delete')}
        </Button>
        <Button className={styles.cancel} onClick={onClose} size="small">
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
