import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import EditTitleForm from './editTitle';
import DeleteColumn from './deleteColumn';
import { TSnackbarMessage } from 'components/common/snackbar';
import { TOOLTIP_DELAY } from 'constants/index';
import { useTranslation } from 'react-i18next';

import styles from './ColumnHeader.module.scss';

type TColumnHeaderProps = {
  boardId: number;
  columnId: string;
  label: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
};

function ColumnHeader({ label, boardId, columnId, showSnackMessage }: TColumnHeaderProps) {
  const { t } = useTranslation('board-management-page');
  const [openEditForm, setOpenEditForm] = useState(false);
  const columnName = useRef(label);

  const handleEdit = () => {
    setOpenEditForm(true);
  };

  const handleClose = () => {
    setOpenEditForm(false);
  };

  return (
    <Box className={styles.header}>
      {openEditForm && (
        <EditTitleForm
          label={label}
          close={handleClose}
          columnName={columnName}
          showSnackMessage={showSnackMessage}
        />
      )}
      {!openEditForm && (
        <Tooltip title={t('editTitleTooltip')} enterNextDelay={TOOLTIP_DELAY} arrow>
          <h3 className={styles.title} onClick={handleEdit}>
            {columnName.current}
          </h3>
        </Tooltip>
      )}

      {!openEditForm && <DeleteColumn columnName={label} showSnackMessage={showSnackMessage} />}
    </Box>
  );
}

export default ColumnHeader;
