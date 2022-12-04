import { API_BASE_URL } from './constants';
import { IUser, IResponseError } from './types';

async function editUserCall(
  token: string,
  id: string,
  name: string,
  login: string,
  password: string
): Promise<IUser> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, login, password }),
  });

  const data: IUser | IResponseError = await response.json();

  if (!response.ok) throw new Error((data as IResponseError).message);

  return data as IUser;
}

async function deleteUserCall(token: string, id: string): Promise<IUser> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IUser | IResponseError = await response.json();

  if (!response.ok) throw new Error((data as IResponseError).message);

  return data as IUser;
}

export { editUserCall, deleteUserCall };
