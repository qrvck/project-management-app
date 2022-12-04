import { API_BASE_URL } from './constants';
import { IResponseError } from './types';

interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

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
