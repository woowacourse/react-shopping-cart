import axios from 'axios';
import { API_BASE_URL } from '../constants/API';

const customAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    post: {
      'content-Type': 'application/json',
    },
  },
});

export default customAxios;
