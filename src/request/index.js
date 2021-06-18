export const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

export const PATH = {
  PRODUCT: '/api/products',
  CART: '/api/customers/0imbean0/carts',
  ORDER: '/api/customers/0imbean0/orders',
};

export const request = {
  get: ({ url, options }) => {
    return fetch(url, { ...options });
  },

  post: ({ url, options }) => {
    return fetch(url, { method: 'POST', ...options });
  },

  put: ({ url, options }) => {
    return fetch(url, { method: 'PUT', ...options });
  },

  delete: ({ url, options }) => {
    return fetch(url, { method: 'DELETE', ...options });
  },
};

export const getFetchParams = ({ path, body }) => {
  return {
    url: BASE_URL + path,
    options: {
      body: body ? JSON.stringify(body) : null,
      headers: { 'Content-Type': 'application/json' },
    },
  };
};
