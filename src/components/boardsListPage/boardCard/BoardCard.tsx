import React from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import Delete from '@mui/icons-material/Delete';
import styles from './BoardCard.module.scss';

interface IBoardCardProps {
  title: string;
  owner: string;
}

function BoardCard({ title, owner }: IBoardCardProps) {
  const { t } = useTranslation('boards-list-page');

  return (
    <Paper className={styles.paper} elevation={4}>
      <p className={styles.title}>{title}</p>
      <p className={styles.owner}>
        {t('owner')}: {owner}
      </p>
      <IconButton className={styles.deleteBtn}>
        <Delete />
      </IconButton>
    </Paper>
  );
}

export default BoardCard;
