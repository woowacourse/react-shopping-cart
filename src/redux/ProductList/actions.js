export const GET_PRODUCTS_SUCCESS = 'product_list/get_products/success';
export const GET_PRODUCTS_ERROR = 'product_list/get_products/error';
export const RESET_PRODUCTS = 'product_list/reset_products';

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const resetProducts = () => {
  return {
    type: RESET_PRODUCTS,
  };
};
