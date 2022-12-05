import React from 'react';
import Task from './Task';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { TTask } from 'models/types';

interface TTaskContainerProps extends TTask {
  columnId: string;
}

function TaskContainer({ _id: id, title, columnId }: TTaskContainerProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Task title={title} isDragging={isDragging} />
    </li>
  );
}

export default TaskContainer;
