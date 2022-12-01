import { API_BASE_URL } from './constants';

interface IUser {
  name: string;
  login: string;
  _id: string;
}

async function signUp(name: string, login: string, password: string): Promise<IUser> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, login, password }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

async function signIn(login: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

export { signUp, signIn };
