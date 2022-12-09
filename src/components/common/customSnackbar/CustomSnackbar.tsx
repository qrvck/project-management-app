import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ISnackBarProps } from './types';
import styles from './CustomSnackbar.module.scss';

function CustomSnackBar({ isOpen, onClose, type, message }: ISnackBarProps) {
  const toggleSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={toggleSnackBar}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        className={styles.alert}
        onClose={toggleSnackBar}
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackBar;
