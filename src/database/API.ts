import axios from 'axios';
import { API_BASE_URL } from '../appConfig';

const customAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-Type': 'application/json',
  },
});

export default customAxios;
