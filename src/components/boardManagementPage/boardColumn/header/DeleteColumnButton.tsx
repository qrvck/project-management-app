import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { TSnackbarMessage } from 'components/common/snackbar';
import { ModalForm } from 'components/common/modalForm';

import styles from './DeleteColumnButton.module.scss';

type TDeleteColumnButtonProps = {
  columnName: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
};

function DeleteColumnButton({ columnName, showSnackMessage }: TDeleteColumnButtonProps) {
  const [openConfirmationForm, setOpenConfirmationForm] = useState(false);

  const handleBtnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenConfirmationForm(true);
  };

  const handleClose = () => {
    setOpenConfirmationForm(false);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();

    setOpenConfirmationForm(false);
    showSnackMessage({
      isOpen: true,
      severity: 'success',
      message: 'Column was deleted',
    });
  };

  return (
    <>
      <Tooltip title="Delete column" arrow>
        <IconButton
          className={styles.deleteBtn}
          onClick={handleBtnClick}
          aria-label="Delete column"
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <ModalForm isOpen={openConfirmationForm} onClose={handleClose}>
        <div className={styles.confirmation}>
          <NewReleasesOutlinedIcon color="warning" fontSize="large" className={styles.icon} />
          <div>
            <Typography mb={3}>
              You are going to delete column &ldquo;{columnName}&rdquo;. Are you sure?
            </Typography>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="warning"
              size="small"
              className={styles.delete}
            >
              Delete
            </Button>
            <Button onClick={handleClose} size="small">
              Cancel
            </Button>
          </div>
        </div>
      </ModalForm>

      {/* <SnackbarMessage isOpen={openSnack} onClose={handleCloseSnackBar} severity="success" /> */}
    </>
  );
}

export default DeleteColumnButton;
