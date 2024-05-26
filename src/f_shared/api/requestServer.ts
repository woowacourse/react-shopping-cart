import { api } from '../config/api';

const generateBasicToken = (userId: string, userPassword: string) => {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
};

export const requestServer = async <T = void>(
  path: string,
  method: string,
  bodyData?: Record<string, any>
): Promise<T> => {
  const token = generateBasicToken(api.userId, api.userPassword);
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  };

  const options: RequestInit = { method, headers, ...(bodyData && { body: JSON.stringify(bodyData) }) };

  const response = await fetch(`${api.domain}${path}`, options);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return method === 'GET' ? response.json() : null;
};
