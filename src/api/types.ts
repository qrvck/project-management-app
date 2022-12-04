interface IUser {
  name: string;
  login: string;
  _id: string;
}

interface IResponseError {
  statusCode: number;
  message: string;
}

interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

type TBoards = IBoard[];

export { IUser, IResponseError, IBoard, TBoards };
