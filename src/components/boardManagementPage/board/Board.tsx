import React, { useEffect, useState } from 'react';
import BoardColumn from '../boardColumn';
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { TTask } from '../taskList';
import Grid from '@mui/material/Grid';
import styles from './Board.module.scss';

const generateColumns = () => {
  return Array(5)
    .fill(1)
    .map((_, idx) => ({
      id: self.crypto.randomUUID(),
      label: `Column ${idx + 1}`,
      items: [
        {
          id: self.crypto.randomUUID(),
          title: `Column ${idx + 1}, item 1`,
          description: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали
          от всех живут они в`,
        },
        {
          id: self.crypto.randomUUID(),
          title: `Column ${idx + 1}, item 2`,
          description: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали
          от всех живут они в`,
        },
        {
          id: self.crypto.randomUUID(),
          title: `Column ${idx + 1}, item 3`,
          description: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали
          от всех живут они в`,
        },
      ],
    }));
};

const initColumns = generateColumns();

type TColumn = {
  id: string;
  label: string;
  items: TTask[];
};

const getColumnIndex = (id: UniqueIdentifier, columns: TColumn[]) => {
  return columns.findIndex((column) => column.id === id);
};

const getTaskIndex = (id: UniqueIdentifier, column: TColumn) => {
  return column.items.findIndex((task) => task.id === id);
};

function Board() {
  const [columns, setColumns] = useState(initColumns);
  const [activeItem, setActiveItem] = useState<{
    id: UniqueIdentifier;
    columnId: string;
    type: string;
  } | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!activeItem) return;

    const activeColumn = columns[getColumnIndex(activeItem?.columnId, columns)];

    const activeTask = activeColumn.items.find(
      (item: TTask) => item.id === activeItem.id.toString()
    );
    if (activeTask) {
      //setActiveTask(activeTask);
      return;
    }
  }, [activeItem, columns]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log(active);
    active && setActiveItem({ id: active.id, columnId: active.data.current?.columnId, type: '' });
  };

  const handlerDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string = over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID || activeContainerID === overContainerID) {
      return;
    }

    setColumns((prev) => {
      const activeColumn = prev.find(({ id }) => id === activeContainerID);
      const overColumn = prev.find(({ id }) => id === overContainerID);

      if (!activeColumn || !overColumn) return [...prev];

      const activeIndex = getTaskIndex(active.id, activeColumn);
      const overIndex = !overColumn.items.length ? 0 : getTaskIndex(over?.id, overColumn);

      prev[prev.indexOf(activeColumn)] = {
        ...activeColumn,
        items: [...activeColumn.items.filter((task) => task.id !== active.id.toString())],
      };

      const activeTaskItem = activeColumn.items[activeIndex];

      if (!activeTaskItem) return [...prev];

      if (overIndex === 0) {
        prev[prev.indexOf(overColumn)] = {
          ...overColumn,
          items: [activeTaskItem, ...overColumn.items],
        };
      } else {
        activeTaskItem &&
          (prev[prev.indexOf(overColumn)] = {
            ...overColumn,
            items: [
              ...overColumn.items.slice(0, overIndex),
              activeTaskItem,
              ...overColumn.items.slice(overIndex, overColumn.items.length),
            ],
          });
      }

      return [...prev];
    });
  };

  const handlerDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string = over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID) {
      return;
    }

    if (activeContainerID === overContainerID) {
      const currentColumn = columns.find(({ id }) => id === activeContainerID);

      if (!currentColumn) {
        if (active.id !== over?.id) {
          const activeIndex: number = getColumnIndex(active.id, columns);
          const overIndex: number = getColumnIndex(over?.id || 0, columns);

          setColumns(arrayMove(columns, activeIndex, overIndex));
        }
        return;
      }

      const activeIndex: number = getTaskIndex(active.id, currentColumn);
      const overIndex: number = getTaskIndex(over?.id || 0, currentColumn);

      if (activeIndex != overIndex) {
        setColumns((prev) => {
          prev[prev.indexOf(currentColumn)] = {
            ...currentColumn,
            items: arrayMove<TTask>(currentColumn.items, activeIndex, overIndex),
          };
          return [...prev];
        });
      }
      return;
    }
    //setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handlerDragOver}
      onDragEnd={handlerDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={columns.map((column) => column?.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className={styles.fixed}>
          <div className={styles.scrollable}>
            <Grid container spacing={2} wrap={'nowrap'} className={styles.columns}>
              {columns.map((column) => column?.id && <BoardColumn key={column?.id} {...column} />)}
            </Grid>
          </div>
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId && activeTask ? <Task {...activeTask} isDragging></Task> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
