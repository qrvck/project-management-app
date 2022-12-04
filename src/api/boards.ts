import { API_BASE_URL } from './constants';
import { IResponseError, IBoard, TBoards } from './types';

export async function createBoardCall(
  token: string,
  owner: string,
  title: string
): Promise<IBoard> {
  const response = await fetch(`${API_BASE_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, owner, users: [] }),
  });

  const data: IBoard | IResponseError = await response.json();

  if (!response.ok) throw new Error((data as IResponseError).message);

  return data as IBoard;
}

export async function getAllBoardsCall(token: string): Promise<TBoards> {
  const response = await fetch(`${API_BASE_URL}/boards`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data: TBoards | IResponseError = await response.json();

  if (!response.ok) throw new Error((data as IResponseError).message);

  return data as TBoards;
}
