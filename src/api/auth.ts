import API_BASE_URL from './constants';

interface ISignUpParams {
  name: string;
  login: string;
  password: string;
}

interface INewUser {
  name: string;
  login: string;
  _id: string;
}

interface ISignInParams {
  login: string;
  password: string;
}

async function signUp(params: ISignUpParams): Promise<INewUser> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
}

async function signIn(params: ISignInParams): Promise<{ token: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
}

export { signUp, signIn };
