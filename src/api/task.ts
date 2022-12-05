import { TNewTask, TTask, TTaskReOrder } from 'models/types';
import { API_BASE_URL } from './constants';

export const TaskAPI = {
  create: async (token: string, boardId: string, columnId: string, taskParams: TNewTask) => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskParams),
    });

    if (!response.ok) {
      return null;
    }
    const data: TTask = await response.json();
    return data;
  },

  delete: async (token: string, boardId: string, columnId: string, taskId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) return null;

    const data: TTask = await response.json();
    return data;
  },

  getAll: async (token: string, boardId: string, columnId: string) => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return [];
    }
    const data: TTask[] = await response.json();
    return data;
  },

  reOrder: async (token: string, tasks: TTaskReOrder[]): Promise<TTask[] | null> => {
    const response = await fetch(`${API_BASE_URL}/tasksSet`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks),
    });

    if (!response.ok) {
      return null;
    }
    const data: TTask[] = await response.json();
    return data;
  },
};
