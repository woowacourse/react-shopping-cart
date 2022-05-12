const LOCAL_BASE_URL = 'http://localhost:4000';
const PRODUCT_BASE_URL = 'https://sisyphe-shopping-cart-server.herokuapp.com';

export const BASE_URL = process.env.NODE_ENV === 'production' ? PRODUCT_BASE_URL : LOCAL_BASE_URL;
