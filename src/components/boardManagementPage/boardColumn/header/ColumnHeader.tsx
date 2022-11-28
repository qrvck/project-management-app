import React, { FocusEventHandler, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditTitleForm from './EditTitleForm';
import styles from './ColumnHeader.module.scss';
import { ClickAwayListener } from '@mui/material';

type TColumnHeaderProps = {
  boardId: number;
  columnId: string;
  label: string;
};

function ColumnHeader({ label, boardId, columnId }: TColumnHeaderProps) {
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenEditForm((prev) => !prev);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(event);
    console.log('Delete; boardId: ', boardId, 'columnId: ', columnId);
  };

  const handleClickAway = () => {
    setOpenEditForm(false);
  };

  return (
    <Box className={styles.header}>
      {openEditForm && <EditTitleForm label={label} onClickAway={handleClickAway} />}
      {!openEditForm && (
        <h3 className={styles.title} onClick={handleEdit}>
          {label}
        </h3>
      )}
      <IconButton className={styles.deleteBtn} onClick={handleDelete} aria-label="Delete column">
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default ColumnHeader;
