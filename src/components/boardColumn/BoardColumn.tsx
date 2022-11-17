import React from 'react';
import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TTask } from 'components/taskList/task/Task.types';
import TaskList from 'components/taskList/TaskList';
import { UniqueIdentifier } from '@dnd-kit/core';
import { grey } from '@mui/material/colors';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? grey[800] : grey[200],
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  minWidth: '17rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

type TProps = {
  id: string;
  label: string;
  items: TTask[];
  activeId: UniqueIdentifier | null;
};

function BoardColumn(props: TProps) {
  const { id, label, items, activeId } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: {
      type: 'column',
      columnId: 'root',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid item xs={4}>
      <Item elevation={2} ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <Typography variant="h3" p={1} borderBottom={1} borderColor={grey[50]} gutterBottom>
          {label}
        </Typography>
        <TaskList items={items} columnId={id} activeId={activeId} />
        <Box>
          <Button size="small" color="secondary" variant="contained">
            + add task
          </Button>
        </Box>
      </Item>
    </Grid>
  );
}

export default BoardColumn;
