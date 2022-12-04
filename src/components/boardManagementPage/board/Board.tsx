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
import { useTranslation } from 'react-i18next';
import { ColumnAPI } from 'api/column';
import { Task } from '../taskList';
import { TColumn, TTask } from 'models/types';
import { SENSOR_OPTIONS } from 'constants/index';
import { TSnackBarState } from 'components/common/customSnackbar/types';
import styles from './Board.module.scss';

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
};

function Board({ boardId, columns, setColumns, setSnackBar }: TBoardProps) {
  const { t } = useTranslation('board-management-page');
  const [showLoader, setShowLoader] = useState(false);
  const [activeItem, setActiveItem] = useState<TTask | null>(null);
  const { user } = useAuth();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: SENSOR_OPTIONS,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

      if (!activeIndex || !overIndex) return [...prev];

      prev[prev.indexOf(activeColumn)] = {
        ...activeColumn,
        items: [...activeColumn.items.filter((task) => task._id !== active.id.toString())],
      };

      const activeTaskItem = activeColumn.items?.[activeIndex];

      if (!activeTaskItem) return [...prev];

      if (overIndex === 0) {
        prev[prev.indexOf(overColumn)] = {
          ...overColumn,
          items: [activeTaskItem, ...overColumn?.items],
        };
      } else {
        activeTaskItem &&
          (prev[prev.indexOf(overColumn)] = {
            ...overColumn,
            items: [
              ...overColumn?.items?.slice(0, overIndex),
              activeTaskItem,
              ...overColumn?.items?.slice(overIndex, overColumn.items.length),
            ],
          });
      }

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
    setActiveItem(null);
  };

  const deleteColumn = (columnId: string) => {
    setShowLoader(true);

    const dataColumn = ColumnAPI.delete(user.token, boardId, columnId);
    console.log(dataColumn);

    if (!dataColumn) {
      setShowLoader(false);
      setSnackBar((prev) => ({
        ...prev,
        isOpen: true,
        severity: 'error',
        message: t('columnNotDeleted'),
      }));
      return;
    }

    setColumns((prev) => {
      const newState = prev.filter((column) => column._id !== columnId);
      console.log(newState);
      return [...newState];
    });
    setShowLoader(false);
    setSnackBar((prev) => ({
      ...prev,
      isOpen: true,
      severity: 'success',
      message: t('columnDeleted'),
    }));
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
                        showSnackMessage={setSnackBar}
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
            <Task {...activeItem} />
          </DragOverlay>
        )}
      </DndContext>
      {showLoader && <FullScreenLoader />}
    </>
  );
}

export default Board;
