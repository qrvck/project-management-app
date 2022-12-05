import React from 'react';
import Box from '@mui/material/Box';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { TaskContainer } from './task';
import { TTask } from 'models/types';

import styles from './TaskList.module.scss';

type TTaskListProps = {
  items: TTask[];
  columnId: string;
};

function TaskList({ columnId, items }: TTaskListProps) {
  const { setNodeRef } = useDroppable({
    id: `${columnId}drop`,
    data: {
      accepts: ['task'],
      columnId: columnId,
    },
  });

  return (
    <SortableContext items={items.map((task) => task._id)}>
      <Box ref={setNodeRef} className={styles.scrollable}>
        <ul>
          {items.map((item) => (
            <TaskContainer key={item._id} {...item} columnId={columnId} />
          ))}
        </ul>
      </Box>
    </SortableContext>
  );
}

export default TaskList;
