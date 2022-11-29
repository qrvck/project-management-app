import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import EditTitleForm from './EditTitleForm';
import DeleteColumnButton from './DeleteColumnButton';
import { TSnackbarMessage } from 'components/common/snackbar';
import styles from './ColumnHeader.module.scss';

type TColumnHeaderProps = {
  boardId: number;
  columnId: string;
  label: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
};

function ColumnHeader({ label, boardId, columnId, showSnackMessage }: TColumnHeaderProps) {
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenEditForm((prev) => !prev);
  };

  const handleClose = () => {
    setOpenEditForm(false);
  };

  return (
    <Box className={styles.header}>
      {openEditForm && (
        <EditTitleForm label={label} close={handleClose} showSnackMessage={showSnackMessage} />
      )}
      {!openEditForm && (
        <Tooltip title="Click to edit column name" enterNextDelay={10000} arrow>
          <h3 className={styles.title} onClick={handleEdit}>
            {label}
          </h3>
        </Tooltip>
      )}

      <DeleteColumnButton columnName={label} showSnackMessage={showSnackMessage} />
    </Box>
  );
}

export default ColumnHeader;
