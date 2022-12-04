import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ConfirmationPopup } from 'components/common/confirmationPopup';
import { TSnackbarMessage } from 'components/common/snackbar';
import { useTranslation } from 'react-i18next';

import styles from './DeleteColumn.module.scss';

type TDeleteColumnProps = {
  columnName: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
  deleteColumn: () => void;
};

function DeleteColumn({ columnName, deleteColumn }: TDeleteColumnProps) {
  const [openConfirmationForm, setOpenConfirmationForm] = useState(false);
  const { t } = useTranslation('board-management-page');

  const handleBtnClick = () => {
    setOpenConfirmationForm(true);
  };

  const handleClose = () => {
    setOpenConfirmationForm(false);
  };

  const handleDelete = () => {
    deleteColumn();
    setOpenConfirmationForm(false);
  };

  return (
    <>
      <Tooltip title={t('deleteLabel')} arrow>
        <>
          <IconButton className={styles.deleteBtn} onClick={handleBtnClick}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </>
      </Tooltip>

      <ConfirmationPopup
        isOpen={openConfirmationForm}
        onClose={handleClose}
        onDelete={handleDelete}
      >
        {t('deleteColumnConfirmation', { columnName })}
      </ConfirmationPopup>
    </>
  );
}

export default DeleteColumn;
