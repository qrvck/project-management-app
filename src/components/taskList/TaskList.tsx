import React from 'react';
import Task from 'components/taskList/task/Task';
import { SortableContext } from '@dnd-kit/sortable';
import { TTask } from 'components/taskList/task/Task.types';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { indigo, orange } from '@mui/material/colors';

type TProps = {
  items: TTask[];
  columnId: string;
  activeId: UniqueIdentifier | null;
};

function TaskList(props: TProps) {
  const { columnId, items } = props;
  const { over, setNodeRef } = useDroppable({
    id: `${columnId}drop`,
    data: {
      accepts: ['task'],
      columnId: columnId,
    },
  });

  return (
    <>
      <SortableContext items={items.map((task) => task.id)}>
        <div
          ref={setNodeRef}
          style={{
            backgroundColor: over?.data.current?.columnId === columnId ? orange[200] : indigo[50],
            // minHeight: '10rem',
            // overflowY: 'auto',
          }}
        >
          <ul>
            {items.map((item) => (
              <Task key={item.id} {...item} columnId={columnId} />
            ))}
          </ul>
        </div>
      </SortableContext>
    </>
  );
}

export default TaskList;
