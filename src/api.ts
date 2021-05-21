import axios from 'axios';

const api = axios.create({
  baseURL: 'https://react-shopping-cart-yujo.herokuapp.com/',
});

export default api;
