import React, { useEffect, useState } from 'react';
import BoardColumn from '../boardColumn';
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Task, TTask } from '../taskList';
import { SENSOR_OPTIONS } from 'constants/index';
import SnackbarMessage, { TSnackbarMessage } from 'components/common/snackbar';
import { TColumn } from 'models/types';
import { taskAPI } from 'api/task';
import useAuth from 'auth/useAuth';

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

const getColumnIndex = (id: UniqueIdentifier, columns: TColumn[]) => {
  return columns.findIndex((column) => column._id === id);
};

// const getTaskIndex = (id: UniqueIdentifier, column: TColumn) => {
//   return column.items.findIndex((task) => task.id === id);
// };

type TBoardProps = {
  boardId: string;
  columns: TColumn[];
};

function Board({ boardId, columns }: TBoardProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeItem, setActiveItem] = useState<TTask | null>(null);
  const [snackState, setSnackState] = useState<TSnackbarMessage>({
    isOpen: false,
    severity: 'success',
    message: '',
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: SENSOR_OPTIONS,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const promises = columns.map((column) => taskAPI.getAll(user.token, boardId, column._id));
    console.log(promises);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active.data.current?.type === 'task') {
      const activeColumn = columns.find(
        (column) => column._id === active.data.current?.columnId.toString()
      );
      //const task = activeColumn?.items.find((task) => task.id === active.id.toString());
      //task && setActiveItem({ ...task });
    }
  };

  const handlerDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string = over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID || activeContainerID === overContainerID) {
      return;
    }

    // setColumns((prev) => {
    //   const activeColumn = prev.find(({ id }) => id === activeContainerID);
    //   const overColumn = prev.find(({ id }) => id === overContainerID);

    //   if (!activeColumn || !overColumn) return [...prev];

    //   const activeIndex = getTaskIndex(active.id, activeColumn);
    //   const overIndex = !overColumn.items.length ? 0 : getTaskIndex(over?.id, overColumn);

    //   prev[prev.indexOf(activeColumn)] = {
    //     ...activeColumn,
    //     items: [...activeColumn.items.filter((task) => task.id !== active.id.toString())],
    //   };

    //   const activeTaskItem = activeColumn.items[activeIndex];

    //   if (!activeTaskItem) return [...prev];

    //   if (overIndex === 0) {
    //     prev[prev.indexOf(overColumn)] = {
    //       ...overColumn,
    //       items: [activeTaskItem, ...overColumn.items],
    //     };
    //   } else {
    //     activeTaskItem &&
    //       (prev[prev.indexOf(overColumn)] = {
    //         ...overColumn,
    //         items: [
    //           ...overColumn.items.slice(0, overIndex),
    //           activeTaskItem,
    //           ...overColumn.items.slice(overIndex, overColumn.items.length),
    //         ],
    //       });
    //   }

    //   return [...prev];
    // });
  };

  const handlerDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    const activeContainerID: string = active.data.current?.columnId || null;
    const overContainerID: string = over?.data.current?.columnId || null;

    if (!activeContainerID || !overContainerID) {
      return;
    }

    if (activeContainerID === overContainerID) {
      const currentColumn = columns.find(({ _id }) => _id === activeContainerID);

      if (!currentColumn) {
        if (active.id !== over?.id) {
          const activeIndex: number = getColumnIndex(active.id, columns);
          const overIndex: number = getColumnIndex(over?.id || 0, columns);

          //setColumns(arrayMove(columns, activeIndex, overIndex));
        }
        return;
      }

      // const activeIndex: number = getTaskIndex(active.id, currentColumn);
      // const overIndex: number = getTaskIndex(over?.id || 0, currentColumn);

      // if (activeIndex != overIndex) {
      //   setColumns((prev) => {
      //     prev[prev.indexOf(currentColumn)] = {
      //       ...currentColumn,
      //       items: arrayMove<TTask>(currentColumn.items, activeIndex, overIndex),
      //     };
      //     return [...prev];
      //   });
      // }
      return;
    }
    setActiveItem(null);
  };

  function handleClose() {
    setSnackState((prev) => ({ ...prev, isOpen: false }));
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        //onDragStart={handleDragStart}
        //onDragOver={handlerDragOver}
        //onDragEnd={handlerDragEnd}
      >
        <SortableContext
          items={columns.map((column) => column?._id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className={styles.fixed}>
            <div className={styles.scrollable}>
              <div className={styles.columns}>
                {columns.map(
                  (column) =>
                    column._id && (
                      <BoardColumn key={column._id} {...column} showSnackMessage={setSnackState} />
                    )
                )}
              </div>
            </div>
          </div>
        </SortableContext>

        {activeItem && (
          <DragOverlay>
            <Task {...activeItem} />
          </DragOverlay>
        )}
      </DndContext>

      <SnackbarMessage {...snackState} onClose={handleClose} />
    </>
  );
}

export default Board;
