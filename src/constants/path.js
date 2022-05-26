const PATH = {
  HOME: '/',
  CART: '/cart',
  DETAIL: '/detail',
};

const API_URL = process.env.NODE_ENV === 'production' ? 'https://dory-server.herokuapp.com' : '/';

export {PATH, API_URL};
