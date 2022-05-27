import axios from 'axios';

const LOCAL_BASE_URL = process.env.REACT_APP_LOCAL_BASE_URL;
const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;

export const BASE_URL = process.env.NODE_ENV === 'production' ? PRODUCT_BASE_URL : LOCAL_BASE_URL;

export const client = axios.create({
  baseURL: BASE_URL,
});
