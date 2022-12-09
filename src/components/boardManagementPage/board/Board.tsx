import React, { useState } from 'react';
import useAuth from 'auth/useAuth';
import BoardColumn from '../boardColumn';
import FullScreenLoader from 'components/common/fullScreenLoader';
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
import { ColumnAPI } from 'api/column';
import { Task } from '../taskList';
import { TColumn, TTask, TTaskReOrder } from 'models/types';
import { SENSOR_OPTIONS } from 'constants/index';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import styles from './Board.module.scss';
import { TaskAPI } from 'api/task';

const getColumnIndex = (id: UniqueIdentifier, columns: TColumn[]) => {
  return columns.findIndex((column) => column._id === id);
};

const getTaskIndex = (id: UniqueIdentifier, column: TColumn) => {
  return column?.items?.findIndex((task) => task._id === id);
};

type TBoardProps = {
  boardId: string;
  columns: TColumn[];
  setSnackBar: React.Dispatch<React.SetStateAction<TSnackBarState>>;
  setColumns: React.Dispatch<React.SetStateAction<TColumn[]>>;
  openTaskForm: ({
    isOpen,
    columnId,
    order,
  }: {
    isOpen: boolean;
    columnId: string;
    order: number;
  }) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  updateTask: (
    columnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string
  ) => void;
};

function Board({
  boardId,
  columns,
  setColumns,
  setSnackBar,
  openTaskForm,
  deleteTask,
  updateTask,
}: TBoardProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [activeItem, setActiveItem] = useState<TTask | null>(null);
  const { user } = useAuth();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: SENSOR_OPTIONS,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      keyboardCodes: { start: ['KeyS'], end: [], cancel: [] },
    })
  );

  const saveTasksInColumnOrder = (sortedTasks: TTask[]) => {
    const formatedTasks = sortedTasks.map((task, idx) => ({
      _id: task._id,
      columnId: task.columnId,
      order: idx,
    }));

    TaskAPI.reOrder(user.token, formatedTasks).then((tasksData) => {
      if (!tasksData) return;
    });
  };

  const saveColumnOrder = (sortedColumns: TColumn[]) => {
    const formatedColumns = sortedColumns.map((column, idx) => ({
      _id: column._id,
      order: idx,
    }));

    ColumnAPI.reOrder(user.token, formatedColumns).then((columnsData) => {
      if (!columnsData) return;
    });
  };

  const saveTaskOrder = (columns: TColumn[]) => {
    const formatedTasks: TTaskReOrder[] = [];

    columns.forEach((column) => {
      return column.items.forEach((task, idx) => {
        formatedTasks.push({
          _id: task._id,
          columnId: task.columnId,
          order: idx,
        });
      });
    });

    TaskAPI.reOrder(user.token, formatedTasks).then((tasksData) => {
      if (!tasksData) return;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active.data.current?.type === 'task') {
      const activeColumn = columns.find(
        (column) => column._id === active.data.current?.columnId.toString()
      );

      if (!activeColumn) return;

      const task = activeColumn?.items?.find((task) => task._id === active.id.toString());
      task && setActiveItem({ ...task });
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

    setColumns((prev) => {
      const activeColumn = prev.find(({ _id }) => _id === activeContainerID);
      const overColumn = prev.find(({ _id }) => _id === overContainerID);

      if (!activeColumn || !overColumn) return [...prev];

      const activeIndex = getTaskIndex(active.id, activeColumn);
      const overIndex = !overColumn?.items?.length ? 0 : getTaskIndex(over?.id, overColumn);

      if (activeIndex < 0 || overIndex < 0) return [...prev];

      prev[prev.indexOf(activeColumn)] = {
        ...activeColumn,
        items: [...activeColumn.items.filter((task) => task._id !== active.id.toString())],
      };

      const activeTaskItem = activeColumn.items?.[activeIndex];

      if (!activeTaskItem) return [...prev];

      activeTaskItem.columnId = overColumn._id;

      if (overIndex === 0) {
        prev[prev.indexOf(overColumn)] = {
          ...overColumn,
          items: [activeTaskItem, ...overColumn?.items],
        };
      } else {
        prev[prev.indexOf(overColumn)] = {
          ...overColumn,
          items: [
            ...overColumn?.items?.slice(0, overIndex),
            activeTaskItem,
            ...overColumn?.items?.slice(overIndex, overColumn.items.length),
          ],
        };
      }
      saveTaskOrder([...prev]);
      return [...prev];
    });
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

          const sortedColumns = arrayMove(columns, activeIndex, overIndex);
          setColumns(sortedColumns);
          saveColumnOrder(sortedColumns);
        }
        return;
      }

      const activeIndex: number = getTaskIndex(active.id, currentColumn);
      const overIndex: number = getTaskIndex(over?.id || 0, currentColumn);

      if (activeIndex != overIndex) {
        const sortedTasks = arrayMove<TTask>(currentColumn.items, activeIndex, overIndex);
        setColumns((prev) => {
          prev[prev.indexOf(currentColumn)] = {
            ...currentColumn,
            items: sortedTasks,
          };
          return [...prev];
        });

        saveTasksInColumnOrder(sortedTasks);
      }
      return;
    }
    setActiveItem(null);
  };

  const deleteColumn = async (columnId: string) => {
    setShowLoader(true);

    const dataColumn = await ColumnAPI.delete(user.token, boardId, columnId);

    if (!dataColumn) {
      setShowLoader(false);
      setSnackBar((prev: TSnackBarState) => ({
        ...prev,
        isOpen: true,
        severity: 'error',
        message: 'columnNotDeleted',
      }));
      return;
    }

    setColumns((prev) => {
      const newState = prev.filter((column) => column._id !== columnId);
      return [...newState];
    });
    setShowLoader(false);
    setSnackBar((prev: TSnackBarState) => ({
      ...prev,
      isOpen: true,
      severity: 'success',
      message: 'columnDeleted',
    }));
  };

  const updateColumnTitle = async (columnId: string, title: string, order: number) => {
    setShowLoader(true);
    const columnTitle = await ColumnAPI.update(user.token, boardId, columnId, title, order);
    setShowLoader(false);

    if (!columnTitle) {
      setSnackBar({
        isOpen: true,
        type: 'error',
        message: 'titleNotUpdated',
      });
      return;
    }

    setSnackBar({
      isOpen: true,
      type: 'success',
      message: 'titleUpdated',
    });
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handlerDragOver}
        onDragEnd={handlerDragEnd}
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
                      <BoardColumn
                        key={column._id}
                        deleteColumn={deleteColumn}
                        updateColumnTitle={updateColumnTitle}
                        openTaskForm={openTaskForm}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        {...column}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </SortableContext>

        {activeItem && (
          <DragOverlay>
            <Task {...activeItem} isOverlay />
          </DragOverlay>
        )}
      </DndContext>

      {showLoader && <FullScreenLoader />}
    </>
  );
}

export default Board;
