import cartsActionTypes from 'redux/carts/carts.types';

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

export const addProductToCartSuccess = () => ({
  type: cartsActionTypes.addProductToCartSuccess,
});

export const addProductToCartError = (error) => ({
  type: cartsActionTypes.addProductToCartError,
  payload: error,
});

export const deleteProductFromCartStart = (id) => ({
  type: cartsActionTypes.deleteProductFromCartStart,
  payload: id,
});

export const deleteProductFromCartSuccess = () => ({
  type: cartsActionTypes.deleteProductFromCartSuccess,
});

export const deleteProductFromCartError = (error) => ({
  type: cartsActionTypes.deleteProductFromCartError,
  payload: error,
});

export const deleteCheckedProductsStart = (checkedIdList) => ({
  type: cartsActionTypes.deleteCheckedProductsStart,
  payload: checkedIdList,
});

export const deleteCheckedProductsSuccess = () => ({
  type: cartsActionTypes.deleteCheckedProductsSuccess,
});

export const deleteCheckedProductsError = (err) => ({
  type: cartsActionTypes.deleteCheckedProductsError,
  payload: err,
});

export const toggleIsChecked = (id) => ({
  type: cartsActionTypes.toggleIsChecked,
  payload: id,
});

export const allToggleIsChecked = (isAllChecked) => ({
  type: cartsActionTypes.allToggleIsChecked,
  payload: isAllChecked,
});

export const increaseProductQuantity = (id) => ({
  type: cartsActionTypes.increaseProductQuantity,
  payload: id,
});

export const decreaseProductQuantity = (id) => ({
  type: cartsActionTypes.decreaseProductQuantity,
  payload: id,
});
