import { API_BASE_URL, HTTPMethod } from '../constants/API';

const fetchOption = (method: HTTPMethod, data?: unknown) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const APIClient = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(API_BASE_URL + path);

    return response.json();
  },

  async post<T>(path: string, data: T) {
    const response = await fetch(API_BASE_URL + path, fetchOption('POST', data as T));

    return response.json();
  },

  async put<T>(path: string, data: T) {
    const response = await fetch(API_BASE_URL + path, fetchOption('PUT', data as T));

    return response.json();
  },

  delete(path: string) {
    fetch(API_BASE_URL + path, fetchOption('DELETE'));
  },

  patch<T>(path: string, data: Partial<T>) {
    fetch(API_BASE_URL + path, fetchOption('PATCH', data as Partial<T>));
  },
};

export default APIClient;
