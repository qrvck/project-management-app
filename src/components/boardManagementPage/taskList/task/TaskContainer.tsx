import React from 'react';
import Task from './Task';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { TTask } from 'models/types';

interface TTaskContainerProps extends TTask {
  columnId: string;
  deleteTask: (columnId: string, taskId: string) => void;
  openEditForm: (
    columnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string
  ) => void;
}

function TaskContainer({
  _id: id,
  title,
  description,
  columnId,
  order,
  deleteTask,
  openEditForm,
}: TTaskContainerProps) {
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

  const handleDeleteTask = () => {
    deleteTask(columnId, id);
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Task
        title={title}
        description={description}
        order={order}
        columnId={columnId}
        _id={id}
        isDragging={isDragging}
        deleteTask={handleDeleteTask}
        openEditForm={openEditForm}
      />
    </li>
  );
}

export default TaskContainer;
