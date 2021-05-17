import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopping-cart.techcourse.co.kr/api/',
});

export default api;
