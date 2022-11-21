import React from 'react';
import { Box } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { TTask } from './Task.types';
import styles from './Task.module.scss';

interface TTaskProps extends TTask {
  isDragging?: boolean;
}

function Task({ title, isDragging = false }: TTaskProps) {
  return (
    <Box
      className={styles.task}
      p={1}
      m={1}
      sx={{
        bgcolor: isDragging ? yellow[100] : yellow[50],
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {title}
    </Box>
  );
}

export default Task;
