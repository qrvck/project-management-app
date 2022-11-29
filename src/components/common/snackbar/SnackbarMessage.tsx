import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

export type TSnackbarMessage = {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
};

interface ISnackbarMessageProps extends TSnackbarMessage {
  onClose?: () => void;
}

function SnackbarMessage({ isOpen, onClose, severity, message }: ISnackbarMessageProps) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose && onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={2000}
      open={isOpen}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
