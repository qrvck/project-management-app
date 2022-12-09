import React, { useState, lazy, Suspense } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Loader from 'components/common/loader';
import { useTranslation } from 'react-i18next';
import styles from './DeleteColumn.module.scss';

const ConfirmationPopup = lazy(() => import('components/common/confirmationPopup'));

type TDeleteColumnProps = {
  columnName: string;
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

      <Dialog open={openConfirmationForm} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent className={styles.dialogContent}>
          <Suspense fallback={<Loader />}>
            <ConfirmationPopup
              itemToDelete={t('deleteInfo', { columnName })}
              onClose={handleClose}
              onDelete={handleDelete}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteColumn;
