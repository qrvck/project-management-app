import React, { useRef, useState } from 'react';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import Box from '@mui/material/Box';
import EditTitleForm from './editTitle';
import DeleteColumn from './deleteColumn';
import styles from './ColumnHeader.module.scss';

type TColumnHeaderProps = {
  label: string;
  showSnackMessage: React.Dispatch<React.SetStateAction<TSnackBarState>>;
  deleteColumn: () => void;
};

function ColumnHeader({ label, showSnackMessage, deleteColumn }: TColumnHeaderProps) {
  const [openEditForm, setOpenEditForm] = useState(false);
  const columnName = useRef(label);

  const handleEdit = () => {
    setOpenEditForm(true);
  };

  const handleClose = () => {
    setOpenEditForm(false);
  };

  return (
    <Box className={styles.header}>
      {openEditForm && (
        <EditTitleForm
          label={label}
          close={handleClose}
          columnName={columnName}
          showSnackMessage={showSnackMessage}
        />
      )}
      {!openEditForm && (
        <h3 className={styles.title} onClick={handleEdit}>
          {columnName.current}
        </h3>
      )}

      {!openEditForm && <DeleteColumn columnName={label} deleteColumn={deleteColumn} />}
    </Box>
  );
}

export default ColumnHeader;
