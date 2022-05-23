import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://heroku-shopping-cart-lv2.herokuapp.com',
});

export default axios;
