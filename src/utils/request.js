import axios from 'axios';

const baseUrl = 'https://shopping-cart.techcourse.co.kr';

const request = {
  get: async path => await axios.get(baseUrl + path),
  post: async (path, data) => await axios.post(baseUrl + path, data),
};

export default request;
