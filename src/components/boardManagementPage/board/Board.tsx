import React, { useState } from 'react';
import BoardColumn from '../boardColumn';
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { TTask } from '../taskList';
import styles from './Board.module.scss';
import SnackbarMessage, { TSnackbarMessage } from 'components/common/snackbar';

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

const getColumnIndex = (id: UniqueIdentifier, columns: TColumn[]) => {
  return columns.findIndex((column) => column.id === id);
};

const getTaskIndex = (id: UniqueIdentifier, column: TColumn) => {
  return column.items.findIndex((task) => task.id === id);
};

type TBoardProps = {
  boardId: number;
};

type TColumn = {
  id: string;
  label: string;
  items: TTask[];
};

function Board({ boardId }: TBoardProps) {
  const [columns, setColumns] = useState(initColumns);
  const [snackState, setSnackState] = useState<TSnackbarMessage>({
    isOpen: false,
    severity: 'success',
    message: '',
  });
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 0,
      },
    }),
    useSensor(TouchSensor)
  );

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
  };

  function handleClose() {
    setSnackState((prev) => ({ ...prev, isOpen: false }));
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handlerDragOver}
        onDragEnd={handlerDragEnd}
      >
        <SortableContext
          items={columns.map((column) => column?.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className={styles.fixed}>
            <div className={styles.scrollable}>
              <div className={styles.columns}>
                {columns.map(
                  (column) =>
                    column?.id && (
                      <BoardColumn
                        key={column?.id}
                        boardId={boardId}
                        {...column}
                        showSnackMessage={setSnackState}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </SortableContext>
      </DndContext>

      <SnackbarMessage {...snackState} onClose={handleClose} />
    </>
  );
}

export default Board;
