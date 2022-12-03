import { TColumn } from 'models/types';
import { API_BASE_URL } from './constants';

type TResponseError = {
  statusCode: number;
  message: string;
};

export const ColumnAPI = {
  create: async (
    token: string,
    boardId: string,
    title: string,
    order: number
  ): Promise<TColumn> => {
    console.log(token);
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, order }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  },

  update: async (
    token: string,
    boardId: string,
    columnId: string,
    title: string,
    order: number
  ): Promise<TColumn> => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, order }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  },

  delete: async (boardId: string, columnId: string): Promise<TColumn> => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  },

  getAll: async (token: string, boardId: string): Promise<TColumn[] | null> => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: TColumn[] = await response.json();
    console.log(data);

    return data;
  },
};
