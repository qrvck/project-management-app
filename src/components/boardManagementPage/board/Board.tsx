import React, { useEffect, useState } from 'react';
import BoardColumn from '../boardColumn';
import {
  DndContext,
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
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Task, TTask } from '../taskList';
import Grid from '@mui/material/Grid';
import styles from './Board.module.scss';
import { TColumn, TDraggedItem, EDraggedItemType } from './Board.types';
import BoardColumnOverlay from '../boardColumn/BoardColumnOverlay';

const generateColumns = () => {
  return Array(5)
    .fill(1)
    .map((_, idx) => ({
      id: self.crypto.randomUUID(),
      label: `Column ${idx + 1}`,
      //owner: 'userId of owner',
      //users: [34, 67, 45],
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

const getColumnIndex = (id: UniqueIdentifier, columns: TColumn[]) => {
  return columns.findIndex((column) => column.id === id);
};

const getTaskIndex = (id: UniqueIdentifier, column: TColumn) => {
  return column.items.findIndex((task) => task.id === id);
};

function Board() {
  const [columns, setColumns] = useState(initColumns);
  const [columnIds, setColumnIds] = useState<string[]>(() => columns.map((column) => column?.id));
  const [draggedItem, setDraggedItem] = useState<TDraggedItem | null>(null);
  const [activeItem, setActiveItem] = useState<TTask | TColumn | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const draggedItemType: EDraggedItemType = draggedItem?.data.current?.type;

  useEffect(() => {
    if (!draggedItem) return;

    const { id } = draggedItem;

    if (draggedItem.data.current?.type === EDraggedItemType.COLUMN) {
      const activeColumn = columns.find((column) => column.id === id);
      activeColumn && setActiveItem(activeColumn);
      return;
    }
    const columnId = draggedItem.data.current?.columnId;

    const activeColumn = columns[getColumnIndex(columnId, columns)];

    const activeTask =
      activeColumn && activeColumn.items.find((item: TTask) => item.id === id.toString());

    activeTask && setActiveItem(activeTask);
  }, [draggedItem, columns]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    active && setDraggedItem(active);
  };

  const handlerDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string =
      (activeType !== overType && over?.id) || over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID || activeContainerID === overContainerID) {
      return;
    }

    setColumns((prev) => {
      const activeColumn = prev.find(({ id }) => id === activeContainerID);
      const overColumn = prev.find(({ id }) => id === overContainerID);

      if (!activeColumn || !overColumn) return [...prev];

      const activeIndex = getTaskIndex(active.id, activeColumn);
      const overIndex = !overColumn.items.length
        ? 0
        : overType !== activeType && overType === EDraggedItemType.TASK
        ? overColumn.items.length
        : getTaskIndex(over?.id, overColumn);

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
      setDraggedItem(null);
      return;
    }

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string = over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID) {
      return;
    }

    if (activeContainerID === overContainerID || columnIds.includes(overContainerID)) {
      const currentColumn = columns.find(({ id }) => id === activeContainerID);

      if (!currentColumn) {
        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;

        if (active.id !== over?.id) {
          const activeIndex: number = getColumnIndex(active.id, columns);
          const overIndex: number =
            activeType !== overType && activeType === EDraggedItemType.COLUMN
              ? getColumnIndex(over?.data.current?.columnId, columns)
              : getColumnIndex(over?.id || 0, columns);

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

    setDraggedItem(null);
  };

  const DraggedComponent = draggedItemType === EDraggedItemType.COLUMN ? BoardColumnOverlay : Task;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
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
      <DragOverlay>{activeItem && <DraggedComponent item={activeItem} dragOverlay />}</DragOverlay>
    </DndContext>
  );
}

export default Board;
