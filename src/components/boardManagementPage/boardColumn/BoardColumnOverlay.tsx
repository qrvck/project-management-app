import React from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from '../taskList';
import { TColumn } from '../board';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styles from './BoardColumn.module.scss';

type TBoardColumnProps = {
  item: TColumn;
};

function BoardColumnOverlay({ item }: TBoardColumnProps) {
  const { t } = useTranslation('board-management-page');
  const { label, items } = item;

  return (
    <Grid item xs={4}>
      <Paper elevation={3} className={styles.column}>
        <h3 className={styles.title}>{label}</h3>
        <Box className={styles.scrollable}>
          <ul>
            {items &&
              items.map((item) => (
                <li key={item.id}>
                  <Task item={item} dragOverlay />
                </li>
              ))}
          </ul>
        </Box>
        <Box p={1}>
          <Button size="small" color="secondary" variant="contained">
            + {t('addTask')}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default BoardColumnOverlay;
