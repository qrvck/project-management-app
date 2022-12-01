import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { useTranslation } from 'react-i18next';

import styles from './ConfirmationPopup.module.scss';

type TDialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (event: React.MouseEvent) => void;
};

const ConfirmationPopup: React.FC<TDialogProps> = ({ isOpen, onClose, onDelete, children }) => {
  const { t } = useTranslation('confirmation-popup');

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <div className={styles.confirmation}>
          <NewReleasesOutlinedIcon color="warning" fontSize="large" className={styles.icon} />
          <div>
            <Typography mb={3}>{children}</Typography>
            <Button
              onClick={onDelete}
              variant="contained"
              color="warning"
              size="small"
              className={styles.delete}
            >
              {t('delete')}
            </Button>
            <Button onClick={onClose} size="small">
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationPopup;
