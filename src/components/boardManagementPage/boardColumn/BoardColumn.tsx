import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';
import { TaskList, TTask } from '../taskList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import grey from '@mui/material/colors/grey';
import styles from './BoardColumn.module.scss';

type TBoardColumnProps = {
  id: string;
  label: string;
  items: TTask[];
};

function BoardColumn({ id, label, items }: TBoardColumnProps) {
  const { t } = useTranslation('board-management-page');
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'column',
      columnId: 'root',
    },
  });

  return (
    <Paper
      elevation={3}
      ref={setNodeRef}
      className={styles.column}
      sx={{
        flexShrink: 0,
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: isDragging ? grey[300] : grey[200],
      }}
      {...listeners}
      {...attributes}
    >
      <h3 className={styles.title}>{label}</h3>

      <TaskList items={items} columnId={id} />
      <Box p={1}>
        <Button size="small" color="secondary" variant="contained">
          + {t('addTask')}
        </Button>
      </Box>
    </Paper>
  );
}

export default BoardColumn;
