import React from 'react';
import { Box, Typography } from '@mui/material';
import { TTask } from './Task.types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { yellow } from '@mui/material/colors';

interface TProps extends TTask {
  columnId: string;
}

function Task(props: TProps) {
  const { id, title, description, columnId } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'task',
      columnId,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <>
      <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
        <Box
          sx={{
            p: 1,
            m: 1,
            bgcolor: isDragging ? yellow[100] : yellow[50],
            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
            border: '1px solid',
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
            borderRadius: 1,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {title}
          <Typography paragraph variant="body2" sx={{ fontSize: '0.75rem' }}>
            {description}
          </Typography>
        </Box>
      </li>
    </>
  );
}

export default Task;
