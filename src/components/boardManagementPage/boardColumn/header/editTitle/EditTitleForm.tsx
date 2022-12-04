import React from 'react';
import Input from '@mui/material/Input';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import styles from './EditTitleForm.module.scss';

type TEditTitleForm = {
  label: string;
  columnName: React.MutableRefObject<string>;
  close: () => void;
  showSnackMessage: React.Dispatch<React.SetStateAction<TSnackBarState>>;
};

function EditTitleForm({ label, close, columnName, showSnackMessage }: TEditTitleForm) {
  const { t } = useTranslation('board-management-page');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      editColumnName: label,
    },
  });

  const changeName: SubmitHandler<{ editColumnName: string }> = (data, event) => {
    event?.preventDefault();

    showSnackMessage({
      isOpen: true,
      type: 'success',
      message: t('titleUpdated'),
    });

    columnName.current = data.editColumnName;

    close();
  };

  const handlerClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    showSnackMessage({
      isOpen: true,
      type: 'error',
      message: t('titleNotUpdated'),
    });

    close();
  };

  return (
    <>
      <form
        name="editColumnTitleForm"
        autoComplete="off"
        className={styles.editForm}
        onSubmit={handleSubmit(changeName)}
      >
        <Tooltip
          arrow
          open={!!errors.editColumnName}
          title={errors.editColumnName?.message}
          classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
        >
          <Input
            className={!!errors.editColumnName ? styles.error : styles.input}
            autoFocus={true}
            fullWidth
            disableUnderline
            {...register('editColumnName', {
              required: t('emptyName') || '',
              minLength: {
                value: 2,
                message: t('minSymbols') || '',
              },
              maxLength: {
                value: 50,
                message: t('maxSymbols'),
              },
            })}
          />
        </Tooltip>
        <IconButton aria-label="save" className={styles.save} onClick={handleSubmit(changeName)}>
          <CheckOutlinedIcon className={styles.iconSave} />
        </IconButton>
        <IconButton aria-label="cancel" className={styles.cancel} onClick={handlerClose}>
          <CloseOutlinedIcon className={styles.iconCancel} />
        </IconButton>
      </form>
    </>
  );
}

export default EditTitleForm;
