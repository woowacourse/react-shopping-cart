import axios from 'axios';

const api = axios.create({
  baseURL: 'https://react-shopping-cart-zig.herokuapp.com/',
});

export default api;
