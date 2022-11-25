import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { ModalForm } from '../../common/modalForm';
// import { useTranslation } from 'react-i18next';

import styles from './AddColumnForm.module.scss';

type TAddColumnFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddColumnForm({ isOpen, onClose }: TAddColumnFormProps) {
  // const { t } = useTranslation('add-column-form');

  const handlerChange = (event: React.ChangeEvent) => {};

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Create column">
      <TextField
        focused
        autoComplete="off"
        autoFocus={true}
        margin="dense"
        id="name"
        // label={t('inputLabel')}
        label="Column name"
        type="text"
        fullWidth
        variant="outlined"
        required
        helperText="Column name must be at least 2 symbols and maximum 50"
        onChange={handlerChange}
      />
      <Stack
        spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'center'}
        mt={4}
        mb={2}
      >
        <Button onClick={onClose} variant="contained" disabled>
          {/* {t('addButton')} */} add column
        </Button>
        <Button onClick={onClose}>
          {/* {t('cancelButton')} */}
          cancel
        </Button>
      </Stack>
    </ModalForm>
  );
}
