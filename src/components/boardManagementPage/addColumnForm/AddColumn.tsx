import React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { TAddColumnFormValues } from './AddColumn.types';
import AddColumnForm from './AddColumnForm';
import styles from './AddColumn.module.scss';

type TAddColumnProps = {
  onSubmit: (data: TAddColumnFormValues) => void;
};

function AddColumn({ onSubmit }: TAddColumnProps) {
  const { t } = useTranslation('board-management-page');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handlerClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handlerClick}
        size={'small'}
        className={styles.addButton}
      >
        + {t('addColumn')}
      </Button>
      {open && <AddColumnForm onClose={handleClose} onSubmit={onSubmit} isOpen={open} />}
    </>
  );
}

export default AddColumn;
