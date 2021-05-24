const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const requestTable = {
  GET: async url => await fetch(`${BASE_URL}${url}`),
  POST: async (url, option) => await fetch(`${BASE_URL}${url}`, option),
  DELETE: async (url, option) => await fetch(`${BASE_URL}${url}`, option),
};

export { requestTable };
