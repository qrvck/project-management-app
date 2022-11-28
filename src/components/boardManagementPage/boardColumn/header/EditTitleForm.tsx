import React from 'react';
import Input from '@mui/material/Input';

import styles from './EditTitleForm.module.scss';

type TEditTitleForm = {
  label: string;
  onClickAway: () => void;
};

function EditTitleForm({ label, onClickAway }: TEditTitleForm) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClickAway();
  };

  return (
    <form autoComplete="off" className={styles.editForm} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        defaultValue={label}
        autoFocus={true}
        inputProps={{ 'aria-label': 'description' }}
        fullWidth
        disableUnderline
        onBlur={onClickAway}
      />
    </form>
  );
}

export default EditTitleForm;
