import React from 'react';
import Task from './Task';
import { TTask } from './Task.types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { EDraggedItemType } from 'components/boardManagementPage';

type TTaskContainerProps = {
  item: TTask;
  columnId: string;
  dragOverlay?: boolean;
};

function TaskContainer({ item, columnId, dragOverlay = false }: TTaskContainerProps) {
  const { id } = item;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: EDraggedItemType.TASK,
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
      <Task item={item} dragOverlay={dragOverlay} />
    </li>
  );
}

export default TaskContainer;
