const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const fetchOption = (method, { payload, token } = {}) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: payload ? JSON.stringify(payload) : null,
  Authorization: token ? `Bearer ${token}` : null,
});

const APIClient = {
  get(path, token) {
    return fetch(BASE_URL + path, fetchOption('GET', { token }));
  },
  post(path, payload, token) {
    return fetch(BASE_URL + path, fetchOption('POST', { payload, token }));
  },
  delete(path, token) {
    return fetch(BASE_URL + path, fetchOption('DELETE', { token }));
  },
  put(path, payload, token) {
    return fetch(BASE_URL + path, fetchOption('PUT', { payload, token }));
  },
  patch(path, payload, token) {
    return fetch(BASE_URL + path, fetchOption('PATCH', { payload, token }));
  },
};

export default APIClient;
