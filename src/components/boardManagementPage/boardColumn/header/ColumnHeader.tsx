import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import EditTitleForm from './editTitle';
import DeleteColumn from './deleteColumn';
import { TSnackbarMessage } from 'components/common/snackbar';

import styles from './ColumnHeader.module.scss';

type TColumnHeaderProps = {
  label: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
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

      {!openEditForm && (
        <DeleteColumn
          columnName={label}
          deleteColumn={deleteColumn}
          showSnackMessage={showSnackMessage}
        />
      )}
    </Box>
  );
}

export default ColumnHeader;
