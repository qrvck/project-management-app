export type TColumn = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  items: TTask[];
};

export type TTask = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

export type TNewTask = {
  title: string;
  description: string;
};

export type TColumnReOrder = {
  _id: string;
  order: number;
};

export type TTaskReOrder = {
  _id: string;
  order: number;
  columnId: string;
};
