import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import EditTitleForm from './editTitle';
import DeleteColumn from './deleteColumn';
import styles from './ColumnHeader.module.scss';

type TColumnHeaderProps = {
  label: string;
  deleteColumn: () => void;
  updateColumnTitle: (title: string) => void;
};

function ColumnHeader({ label, deleteColumn, updateColumnTitle }: TColumnHeaderProps) {
  const [openEditForm, setOpenEditForm] = useState(false);
  const columnNameRef = useRef(label);

  const handleEdit = () => {
    setOpenEditForm(true);
  };

  const handleClose = () => {
    setOpenEditForm(false);
  };

  return (
    <Box className={styles.header}>
      {openEditForm ? (
        <EditTitleForm
          label={label}
          close={handleClose}
          columnNameRef={columnNameRef}
          updateColumnTitle={updateColumnTitle}
        />
      ) : (
        <h3 className={styles.title} onClick={handleEdit}>
          {columnNameRef.current}
        </h3>
      )}

      {!openEditForm && <DeleteColumn columnName={label} deleteColumn={deleteColumn} />}
    </Box>
  );
}

export default ColumnHeader;
