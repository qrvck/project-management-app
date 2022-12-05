import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import { TaskList } from '../taskList';
import { TColumn } from 'models/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ColumnHeader from './header/ColumnHeader';
import grey from '@mui/material/colors/grey';
import styles from './BoardColumn.module.scss';

type TBoardColumnProps = TColumn & {
  deleteColumn: (columnId: string) => void;
  updateColumnTitle: (columnId: string, title: string, order: number) => void;
  addTask: (columnId: string) => void;
};

function BoardColumn({
  _id: id,
  title,
  order,
  items,
  updateColumnTitle,
  deleteColumn,
  addTask,
}: TBoardColumnProps) {
  const { t } = useTranslation('board-management-page');

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'column',
      columnId: 'root',
    },
  });

  const handleDeleteColumn = () => {
    deleteColumn(id);
  };

  const handleUpdateTitle = (title: string) => {
    updateColumnTitle(id, title, order);
  };

  const handleAddTaskClick = () => {
    addTask(id);
  };

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
          deleteColumn={handleDeleteColumn}
          updateColumnTitle={handleUpdateTitle}
        />
        order = {order}
        {!!items?.length && <TaskList items={items} columnId={id} />}
        <Box p={1}>
          <Button size="small" color="secondary" variant="contained" onClick={handleAddTaskClick}>
            + {t('addTask')}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default BoardColumn;
