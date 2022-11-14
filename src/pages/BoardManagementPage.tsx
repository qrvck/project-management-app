import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { DndContext, closestCenter, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import BoardColumn from 'components/boardColumn/BoardColumn';

const generateColumns = () => {
  return Array(5)
    .fill(1)
    .map((_, idx) => ({
      id: self.crypto.randomUUID(),
      label: `Column ${idx + 1}`,
    }));
};

const initColumns = generateColumns();

type TColumn = {
  id: string;
  label: string;
};

const getColumnIndexById = (id: UniqueIdentifier, columns: TColumn[]) => {
  let currentIndex = 0;
  columns.find((column, idx) => {
    if (column.id === id) currentIndex = idx;
  });
  return currentIndex;
};

function BoardManagementPage() {
  const [columns, setColumns] = useState(initColumns);

  const onDragEndHandler = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setColumns((columns) => {
        const activeIndex: number = getColumnIndexById(active.id, columns);
        const overIndex: number = getColumnIndexById(over?.id || 0, columns);

        return arrayMove(columns, activeIndex, overIndex);
      });
    }
  };

  return (
    <div>
      <h1>Board Management Page</h1>
      <Button variant="contained">+ create column</Button>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEndHandler}>
        <SortableContext
          items={columns.map((column) => column?.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Grid container spacing={2} mt={3} wrap={'nowrap'}>
            {columns.map((column) => column?.id && <BoardColumn key={column?.id} {...column} />)}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default BoardManagementPage;
