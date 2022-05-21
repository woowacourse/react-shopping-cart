import productActionType from 'redux/products/products.types';

export const fetchProductsStart = (id) => ({
  type: productActionType.fetchProductsStart,
  payload: id,
});

export const fetchProductsSuccess = (products) => ({
  type: productActionType.fetchProductsSuccess,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: productActionType.fetchProductsError,
  payload: error,
});

export const fetchProductStart = (id) => ({
  type: productActionType.fetchProductStart,
  payload: id,
});

export const fetchProductSuccess = (product) => ({
  type: productActionType.fetchProductSuccess,
  payload: product,
});

export const fetchProductError = (err) => ({
  type: productActionType.fetchProductError,
  payload: err,
});
