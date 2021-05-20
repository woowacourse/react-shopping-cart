import { API_END_POINT, API_METHOD } from '../constants/api';
import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const api = axios.create({ baseURL: API_END_POINT });

api.interceptors.request.use((req) => {
  const copiedReq = { ...req };

  if (copiedReq.data) {
    copiedReq.data = decamelizeKeys(copiedReq.data);
  }

  return copiedReq;
});

api.interceptors.response.use((res) => {
  const copiedRes = { ...res };

  if (copiedRes.data) {
    copiedRes.data = camelizeKeys(copiedRes.data);
  }

  return copiedRes;
});

const request = async ({ path, data, method }) => {
  try {
    const response = await api(path, { method, data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data);
  }
};

export const httpClient = {
  get: ({ path }) => request({ path, method: API_METHOD.GET }),
  post: ({ path, data }) => request({ path, data, method: API_METHOD.POST }),
  delete: ({ path, data }) => request({ path, data, method: API_METHOD.DELETE }),
};
