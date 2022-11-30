import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ConfirmationPopup } from 'components/common/confirmationPopup';
import { TSnackbarMessage } from 'components/common/snackbar';

import styles from './DeleteColumn.module.scss';

type TDeleteColumnProps = {
  columnName: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
};

function DeleteColumn({ columnName, showSnackMessage }: TDeleteColumnProps) {
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

      <ConfirmationPopup
        isOpen={openConfirmationForm}
        onClose={handleClose}
        onDelete={handleDelete}
      >
        You are going to delete column &ldquo;{columnName}&rdquo;. Are you sure?
      </ConfirmationPopup>
    </>
  );
}

export default DeleteColumn;
