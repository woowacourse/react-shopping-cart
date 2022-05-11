import cartsActionTypes from "./carts.types";

export const fetchCartsStart = () => ({
  type: cartsActionTypes.fetchCartsStart,
});

export const fetchCartsSuccess = (carts) => ({
  type: cartsActionTypes.fetchCartsSuccess,
  payload: carts,
});

export const fetchCartsError = (error) => ({
  type: cartsActionTypes.fetchCartsError,
  payload: error,
});

export const addProductToCartStart = (product) => ({
  type: cartsActionTypes.addProductToCartStart,
  payload: product,
});

export const addProductToCartSuccess = (product) => ({
  type: cartsActionTypes.addProductToCartSuccess,
  payload: product,
});

export const addProductToCartError = (error) => ({
  type: cartsActionTypes.addProductToCartError,
  payload: error,
});

export const deleteProductToCartStart = (id) => ({
  type: cartsActionTypes.deleteProductToCartStart,
  payload: id,
});

export const deleteProductToCartSuccess = (id) => ({
  type: cartsActionTypes.deleteProductToCartSuccess,
  payload: id,
});

export const deleteProductToCartError = (error) => ({
  type: cartsActionTypes.deleteProductToCartError,
  payload: error,
});

export const toggleIsChecked = (id) => ({
  type: cartsActionTypes.toggleIsChecked,
  payload: id,
});

export const increaseProductQuantity = (id) => ({
  type: cartsActionTypes.increaseProductQuantity,
  payload: id,
});

export const decreaseProductQuantity = (id) => ({
  type: cartsActionTypes.decreaseProductQuantity,
  payload: id,
});
