import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

export const apiClient = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: 'json',
});

export const parsePrice = (price) => price.toLocaleString('ko-KR');

export const isInList = (list, item) => list.indexOf(item) !== -1;
