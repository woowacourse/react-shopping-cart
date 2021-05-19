import axios from 'axios';
import API from './constants/api';
import { keysToCamel } from './utils';

const api = axios.create({
  baseURL: API.BASE_URL,
});

api.interceptors.response.use((response) => {
  if (response.data instanceof Array) {
    const newResponse = { ...response, data: keysToCamel(response.data) };

    return newResponse;
  }

  return response;
});

export default api;
