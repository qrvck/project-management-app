import React, { Suspense, lazy } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { TAddColumnFormValues } from './AddColumn.types';
import Loader from 'components/common/loader';
import styles from './AddColumn.module.scss';

const AddColumnForm = lazy(() => import('./AddColumnForm'));

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
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <h3 className={styles.title}>{t('formTitle')}</h3>
        <DialogContent className={styles.dialogContent}>
          <Suspense fallback={<Loader />}>
            <AddColumnForm onClose={handleClose} onSubmit={onSubmit} />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddColumn;
