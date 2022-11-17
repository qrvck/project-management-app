import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import Delete from '@mui/icons-material/Delete';
import styles from './BoardCard.module.scss';

interface IBoardCardProps {
  to: string;
  tittle: string;
  owner: string;
}

function BoardCard({ to, tittle, owner }: IBoardCardProps) {
  const { t } = useTranslation('boards-list-page');

  return (
    <NavLink className={styles.link} to={to}>
      <Paper className={styles.paper} elevation={4}>
        <p className={styles.title}>{tittle}</p>
        <p className={styles.owner}>
          {t('owner')}: {owner}
        </p>
        <IconButton className={styles.deleteBtn}>
          <Delete />
        </IconButton>
      </Paper>
    </NavLink>
  );
}

export default BoardCard;
