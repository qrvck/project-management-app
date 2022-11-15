import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import { ReactComponent as DeleteIcon } from 'assets/icons/delete-icon.svg';
import styles from './BoardCard.module.scss';

interface IBoardCardProps {
  to: string;
  tittle: string;
  owner: string;
}

function BoardCard({ to, tittle, owner }: IBoardCardProps) {
  return (
    <NavLink className={styles.link} to={to}>
      <Paper className={styles.paper} elevation={4}>
        <p className={styles.title}>{tittle}</p>
        <p className={styles.owner}>owner: {owner}</p>
        <IconButton className={styles.deleteBtn}>
          <DeleteIcon className={styles.deleteIcon} />
        </IconButton>
      </Paper>
    </NavLink>
  );
}

export default BoardCard;
