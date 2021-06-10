import { camelizeKeys, decamelizeKeys } from 'humps';
import { API_BASE_URL } from '../constants/API';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const fetchOption = (method: HTTPMethod, data?: any) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const APIClient = {
  async get(path: string) {
    const response = await fetch(API_BASE_URL + path);
    const responseData = await response.json();

    return camelizeKeys(responseData as object);
  },

  post<T>(path: string, data: T & object) {
    return fetch(API_BASE_URL + path, fetchOption('POST', decamelizeKeys(data)));
  },

  async put<T>(path: string, data: T & object) {
    const response = await fetch(API_BASE_URL + path, fetchOption('PUT', decamelizeKeys(data)));
    const responseData = await response.json();

    return camelizeKeys(responseData);
  },

  delete(path: string) {
    return fetch(API_BASE_URL + path, fetchOption('DELETE'));
  },

  patch<T>(path: string, data: Partial<T>) {
    return fetch(API_BASE_URL + path, fetchOption('PATCH', decamelizeKeys(data)));
  },
};

export default APIClient;
