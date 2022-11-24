import React from 'react';
import { ITaskProps } from './Task.types';
import Box from '@mui/material/Box';
import yellow from '@mui/material/colors/yellow';
import styles from './Task.module.scss';

function Task({ item, dragOverlay = false }: ITaskProps) {
  const { title } = item;
  return (
    <Box
      className={styles.task}
      p={1}
      m={1}
      sx={{
        bgcolor: dragOverlay ? yellow[100] : yellow[50],
        cursor: dragOverlay ? 'grabbing' : 'grab',
      }}
    >
      {title}
    </Box>
  );
}

export default Task;
