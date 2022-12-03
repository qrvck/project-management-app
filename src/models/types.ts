export type TColumn = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
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
