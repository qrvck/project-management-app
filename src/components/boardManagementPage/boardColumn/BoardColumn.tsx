import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';
import { TaskList, TTask } from '../taskList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ColumnHeader from './header/ColumnHeader';

import grey from '@mui/material/colors/grey';
import styles from './BoardColumn.module.scss';
import { TSnackbarMessage } from 'components/common/snackbar';

type TBoardColumnProps = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  showSnackMessage: (props: TSnackbarMessage) => void;
};

function BoardColumn({ _id: id, boardId, title, order, showSnackMessage }: TBoardColumnProps) {
  const [items, setItems] = useState(null);
  const { t } = useTranslation('board-management-page');
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'column',
      columnId: 'root',
    },
  });

  return (
    <Grid item xs={4}>
      <Paper
        elevation={3}
        ref={setNodeRef}
        className={styles.column}
        sx={{
          transform: CSS.Transform.toString(transform),
          transition,
          cursor: isDragging ? 'grabbing' : 'grab',
          backgroundColor: isDragging ? grey[300] : grey[200],
        }}
        {...listeners}
        {...attributes}
      >
        <ColumnHeader
          label={title}
          boardId={boardId}
          columnId={id}
          showSnackMessage={showSnackMessage}
        />
        order = {order}
        {items ? <TaskList items={items} columnId={id} /> : 'Loading...'}
        <Box p={1}>
          <Button size="small" color="secondary" variant="contained">
            + {t('addTask')}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default BoardColumn;
