import React from 'react';
import { TTask } from './Task.types';
import Box from '@mui/material/Box';
import yellow from '@mui/material/colors/yellow';
import styles from './Task.module.scss';

interface ITaskProps extends TTask {
  isDragging?: boolean;
}

function Task({ title, isDragging = false }: ITaskProps) {
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
