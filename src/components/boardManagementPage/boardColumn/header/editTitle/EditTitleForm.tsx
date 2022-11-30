import React from 'react';
import Input from '@mui/material/Input';
import styles from './EditTitleForm.module.scss';
import { TSnackbarMessage } from 'components/common/snackbar';

type TEditTitleForm = {
  label: string;
  close: () => void;
  showSnackMessage: (props: TSnackbarMessage) => void;
};

function EditTitleForm({ label, close, showSnackMessage }: TEditTitleForm) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    showSnackMessage({
      isOpen: true,
      severity: 'success',
      message: 'Title has been updated',
    });

    close();
  };

  const handlerClose = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    showSnackMessage({
      isOpen: true,
      severity: 'error',
      message: 'Title has not been updated',
    });

    close();
  };

  return (
    <>
      <form autoComplete="off" className={styles.editForm} onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          defaultValue={label}
          autoFocus={true}
          fullWidth
          disableUnderline
          onBlur={handlerClose}
        />
      </form>
    </>
  );
}

export default EditTitleForm;
