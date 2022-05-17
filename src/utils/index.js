import axios from 'axios';
import {API_URL} from 'constants';

const appClient = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  responseType: 'json',
});

export default appClient;
