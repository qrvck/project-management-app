import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ISnackBarProps } from './types';
import styles from './CustomSnackbar.module.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomSnackBar({ isOpen, onClose, type, message }: ISnackBarProps) {
  const toggleSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };
  return (
    <Snackbar
      className={styles.snackbar}
      open={isOpen}
      autoHideDuration={2000}
      onClose={toggleSnackBar}
    >
      <Alert className={styles.alert} onClose={toggleSnackBar} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackBar;
