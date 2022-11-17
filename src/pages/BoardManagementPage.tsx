import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { TTask } from 'components/taskList/task/Task.types';
import BoardColumn from 'components/boardColumn/BoardColumn';

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

function BoardManagementPage() {
  const [columns, setColumns] = useState(initColumns);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStartHandler = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const onDragOverHandler = (event: DragOverEvent) => {
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

      const activeTask = activeColumn.items[activeIndex];

      prev[prev.indexOf(activeColumn)] = {
        ...activeColumn,
        items: [...activeColumn.items.filter((task) => task.id !== active.id.toString())],
      };

      if (overIndex === 0 && activeTask) {
        prev[prev.indexOf(overColumn)] = {
          ...overColumn,
          items: [activeTask, ...overColumn.items],
        };
      }

      if (overIndex > 0) {
        activeTask &&
          (prev[prev.indexOf(overColumn)] = {
            ...overColumn,
            items: [
              ...overColumn.items.slice(0, overIndex),
              activeTask,
              ...overColumn.items.slice(overIndex, overColumn.items.length),
            ],
          });
      }

      return [...prev];
    });
  };

  const onDragEndHandler = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string = over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID) return;

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
    setActiveId(null);
  };

  return (
    <div>
      <h2>Board Management Page</h2>
      <Button variant="contained">+ create column</Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStartHandler}
        onDragOver={onDragOverHandler}
        onDragEnd={onDragEndHandler}
      >
        <SortableContext
          items={columns.map((column) => column?.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Grid container spacing={2} mt={3} wrap={'nowrap'}>
            {columns.map(
              (column) =>
                column?.id && <BoardColumn key={column?.id} {...column} activeId={activeId} />
            )}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default BoardManagementPage;
