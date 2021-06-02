const FETCH_URL = {
  GET_PRODUCTS: '/api/products',
  GET_PRODUCT_DETAIL: productId => `/api/products/${productId}`,
  GET_CART_ITEMS: userName => `/api/customers/${userName}/carts`,
};

export default FETCH_URL;
