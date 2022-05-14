export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const REQUEST_PRODUCTS_DONE = 'REQUEST_PRODUCTS_DONE';
export const REQUEST_PRODUCTS_ERROR = 'REQUEST_PRODUCTS_ERROR';

export const requestProducts = () => ({ type: REQUEST_PRODUCTS });
export const requestProductsDone = (products) => ({ type: REQUEST_PRODUCTS_DONE, products });
export const requestProductsError = () => ({ type: REQUEST_PRODUCTS_ERROR });
