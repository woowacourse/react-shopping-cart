import axios from 'axios';

const api = axios.create({
  baseURL: 'https://react-shopping-cart-cheffe.herokuapp.com',
});

export default api;
