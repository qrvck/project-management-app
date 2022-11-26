import React from 'react';
import Task from './Task';
import { TTask } from './Task.types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface TTaskContainerProps extends TTask {
  columnId: string;
}

function TaskContainer({ id, title, description, columnId }: TTaskContainerProps) {
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
      <Task id={id} title={title} description={description} isDragging={isDragging} />
    </li>
  );
}

export default TaskContainer;
