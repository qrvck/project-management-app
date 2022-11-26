import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import AddColumnForm from './AddColumnForm';
import { TAddColumnFormValues } from './AddColumn.types';

type TAddColumnProps = {
  boardId: number;
  onSubmit: (data: TAddColumnFormValues) => void;
};

function AddColumn({ boardId, onSubmit }: TAddColumnProps) {
  const { t } = useTranslation('board-management-page');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Box mb={2}>
        <Button variant="contained" onClick={handlerClick}>
          + {t('addColumn')}
        </Button>
      </Box>
      {open && <AddColumnForm onClose={handleClose} onSubmit={onSubmit} isOpen={open} />}
    </>
  );
}

export default AddColumn;
