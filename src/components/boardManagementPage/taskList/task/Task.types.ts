import { TColumn } from 'components/boardManagementPage/board';

type TTask = {
  id: string;
  title: string;
  description: string;
};

export interface ITaskProps {
  item: TTask;
  dragOverlay?: boolean;
}

export interface IColumnDraggedProps extends TColumn {
  dragOverlay?: boolean;
}

export type { TTask };
