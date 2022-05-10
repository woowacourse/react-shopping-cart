import productActionType from "./products.types";

export const fetchProductsStart = () => ({
  type: productActionType.fetchProductsStart,
});

export const fetchProductsSuccess = (products) => ({
  type: productActionType.fetchProductsSuccess,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: productActionType.fetchProductsError,
  payload: error,
});
