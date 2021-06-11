import { CartItemOnServer } from './../types';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { API_BASE_URL } from '../constants/API';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const fetchOption = (method: HTTPMethod, data?: any) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const request = async (path: string, option?: RequestInit) => {
  const response = await fetch(API_BASE_URL + path, option);
  const responseData = await response.json();

  if (!response.ok) throw Error(responseData.error);

  return responseData;
};

const APIClient = {
  async get<T>(path: string) {
    const responseData = await request(path);

    return camelizeKeys(responseData as object) as T & object;
  },

  post<T>(path: string, data: T & object) {
    return request(API_BASE_URL + path, fetchOption('POST', decamelizeKeys(data)));
  },

  async put<T>(path: string, data: T & object) {
    const responseData = await request(
      API_BASE_URL + path,
      fetchOption('PUT', decamelizeKeys(data))
    );

    return camelizeKeys(responseData);
  },

  delete(path: string) {
    return request(API_BASE_URL + path, fetchOption('DELETE'));
  },

  patch<T>(path: string, data: Partial<T>) {
    return request(API_BASE_URL + path, fetchOption('PATCH', decamelizeKeys(data)));
  },
};

export default APIClient;
