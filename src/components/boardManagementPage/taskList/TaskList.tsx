import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { TaskContainer, TTask } from './task';
import Box from '@mui/material/Box';
import orange from '@mui/material/colors/orange';
import styles from './TaskList.module.scss';

type TTaskListProps = {
  items: TTask[];
  columnId: string;
};

function TaskList({ columnId, items }: TTaskListProps) {
  const { over, setNodeRef } = useDroppable({
    id: `${columnId}drop`,
    data: {
      accepts: ['task'],
      columnId: columnId,
    },
  });

  return (
    <SortableContext items={items.map((task) => task.id)}>
      <Box
        ref={setNodeRef}
        className={styles.scrollable}
        sx={{
          backgroundColor: over?.data.current?.columnId === columnId ? orange[100] : undefined,
        }}
      >
        <ul>
          {items.map((item) => (
            <TaskContainer key={item.id} {...item} columnId={columnId} />
          ))}
        </ul>
      </Box>
    </SortableContext>
  );
}

export default TaskList;
