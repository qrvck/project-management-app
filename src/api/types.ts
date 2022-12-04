interface IUser {
  name: string;
  login: string;
  _id: string;
}

interface IResponseError {
  statusCode: number;
  message: string;
}

export { IUser, IResponseError };
