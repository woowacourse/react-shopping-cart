import { HTTPError } from './../utils/error';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { API_BASE_URL } from '../constants/API';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const fetchOption = (method: HTTPMethod, data?: object) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  ...(data && { body: JSON.stringify(data) }),
});

const isContentTypeJSON = (response: Response) =>
  response.headers.get('Content-Type') === 'application/json';

const request = async (method: HTTPMethod, path: string, data?: object) => {
  const response = await fetch(API_BASE_URL + path, fetchOption(method, data));

  if (!response.ok) {
    const responseMessage = isContentTypeJSON(response) ? 'json' : await response.text();

    throw new HTTPError(response.status, responseMessage);
  }

  return response;
};

const APIClient = {
  async get<T>(path: string) {
    const response = await request('GET', path);
    const responseData = await response.json();

    return camelizeKeys(responseData) as T & object;
  },

  post<T>(path: string, data: T & object) {
    return request('POST', path, decamelizeKeys(data));
  },

  async put<T>(path: string, data: T & object) {
    const response = await request('PUT', path, decamelizeKeys(data));
    const responseData = await response.json();

    return camelizeKeys(responseData as object);
  },

  delete(path: string) {
    return request('DELETE', path);
  },

  patch<T>(path: string, data: Partial<T>) {
    return request('PATCH', path, decamelizeKeys(data));
  },
};

export default APIClient;
