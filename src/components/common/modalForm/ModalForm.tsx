import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import styles from './ModalForm.module.scss';

type TDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalForm: React.FC<TDialogProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <h3 className={styles.title}>{title}</h3>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalForm;
