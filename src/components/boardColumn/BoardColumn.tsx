import React from 'react';
import { Grid, Paper, styled, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  minWidth: '20rem',
}));

type TProps = {
  id: string;
  label: string;
};

function BoardColumn(props: TProps) {
  const { id, label } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid item xs={4}>
      <Item elevation={2} ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
      </Item>
    </Grid>
  );
}

export default BoardColumn;
