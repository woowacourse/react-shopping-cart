import axios from 'axios';
import {API_URL} from 'constant';

const appClient = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  responseType: 'json',
});

export default appClient;
