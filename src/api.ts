import axios from 'axios';
import API from './constants/api';

const api = axios.create({
  baseURL: API.BASE_URL,
});

export default api;
