import productActionType from "redux/products/products.types";

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

export const fetchProductDetailStart = (id) => ({
  type: productActionType.fetchProductDetailStart,
  payload: id,
});

export const fetchProductDetailSucccess = (product) => ({
  type: productActionType.fetchProductDetailSuccess,
  payload: product,
});

export const fetchProductDetailError = (err) => ({
  type: productActionType.fetchProductDetailError,
  payload: err,
});
