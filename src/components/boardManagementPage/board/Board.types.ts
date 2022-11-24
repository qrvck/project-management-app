import { DataRef, UniqueIdentifier } from '@dnd-kit/core';
import { TTask } from '../taskList';

export type TColumn = {
  id: string;
  label: string;
  items: TTask[];
};

export type TDraggedItem = {
  id: UniqueIdentifier;
  data: DataRef;
};

export enum EDraggedItemType {
  COLUMN = 'column',
  TASK = 'task',
}
