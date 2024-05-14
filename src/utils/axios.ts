import axios from 'axios';
import { generateBasicToken } from './auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const userId = import.meta.env.VITE_USER_ID;
  const password = import.meta.env.VITE_PASSWORD;
  const token = generateBasicToken(userId, password);

  config.headers.Authorization = token;
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  error => {
    return Promise.reject(error);
  },
);
