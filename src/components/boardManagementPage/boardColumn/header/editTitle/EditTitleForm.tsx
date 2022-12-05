import React from 'react';
import Input from '@mui/material/Input';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './EditTitleForm.module.scss';

type TEditTitleForm = {
  columnNameRef: React.MutableRefObject<string>;
  close: () => void;
  updateColumnTitle: (title: string) => void;
};

function EditTitleForm({ close, columnNameRef, updateColumnTitle }: TEditTitleForm) {
  const { t } = useTranslation('board-management-page');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      columnName: columnNameRef.current,
    },
  });

  const changeName: SubmitHandler<{ columnName: string }> = (data) => {
    updateColumnTitle(data.columnName);

    columnNameRef.current = data.columnName;

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
          open={!!errors.columnName}
          title={errors.columnName?.message}
          classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
        >
          <Input
            className={!!errors.columnName ? styles.error : styles.input}
            autoFocus={true}
            fullWidth
            disableUnderline
            {...register('columnName', {
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
        <IconButton aria-label="cancel" className={styles.cancel} onClick={close}>
          <CloseOutlinedIcon className={styles.iconCancel} />
        </IconButton>
      </form>
    </>
  );
}

export default EditTitleForm;
