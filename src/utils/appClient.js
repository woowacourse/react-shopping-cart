import axios from 'axios';
import {API_URL} from 'constants/path';

const appClient = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export default appClient;
