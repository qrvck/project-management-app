import { TColumn, TColumnReOrder } from 'models/types';
import { API_BASE_URL } from './constants';

export const ColumnAPI = {
  create: async (
    token: string,
    boardId: string,
    title: string,
    order: number
  ): Promise<TColumn> => {
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
  ): Promise<TColumn | null> => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, order }),
    });

    if (!response.ok) return null;

    return await response.json();
  },

  delete: async (token: string, boardId: string, columnId: string): Promise<TColumn> => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
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

    return await response.json();
  },

  reOrder: async (token: string, columns: TColumnReOrder[]): Promise<TColumn[] | null> => {
    const response = await fetch(`${API_BASE_URL}/columnsSet`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(columns),
    });

    if (!response.ok) {
      return null;
    }
    const data: TColumn[] = await response.json();
    return data;
  },
};
