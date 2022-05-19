export const actionTypes = {
  GET_CART_REQUEST: 'GET_CART_REQUEST',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',

  ADD_CART_ITEM_REQUEST: 'ADD_CART_ITEM',
  ADD_CART_ITEM_SUCCESS: 'ADD_CART_ITEM_SUCCESS',
  ADD_CART_ITEM_ERROR: 'ADD_CART_ITEM_ERROR',

  UPDATE_CART_ITEM_QUANTITY_REQUEST: 'UPDATE_CART_ITEM_QUANTITY',
  UPDATE_CART_ITEM_QUANTITY_SUCCESS: 'UPDATE_CART_ITEM_QUANTITY_SUCCESS',
  UPDATE_CART_ITEM_QUANTITY_ERROR: 'UPDATE_CART_ITEM_QUANTITY_ERROR',

  DELETE_CART_ITEM_REQUEST: 'DELETE_CART_ITEM_REQUEST',
  DELETE_CART_ITEM_SUCCESS: 'DELETE_CART_ITEM_SUCCESS',
  DELETE_CART_ITEM_ERROR: 'DELETE_CART_ITEM_ERROR',
};

export const getCartRequest = () => ({
  type: actionTypes.GET_CART_REQUEST,
});

export const getCartSuccess = (data) => ({
  type: actionTypes.GET_CART_SUCCESS,
  data,
});

export const getCartError = () => ({
  type: actionTypes.GET_CART_ERROR,
});

export const addCartItemRequest = (data) => ({
  type: actionTypes.ADD_CART_ITEM_REQUEST,
  data,
});

export const addCartItemSuccess = () => ({
  type: actionTypes.ADD_CART_ITEM_SUCCESS,
});

export const addCartItemError = () => ({
  type: actionTypes.ADD_CART_ITEM_ERROR,
});

export const updateCartItemQuantityRequest = () => ({
  type: actionTypes.UPDATE_CART_ITEM_QUANTITY_REQUEST,
});

export const updateCartItemQuantitySuccess = (data) => ({
  type: actionTypes.UPDATE_CART_ITEM_QUANTITY_SUCCESS,
  data,
});

export const updateCartItemQuantityError = () => ({
  type: actionTypes.UPDATE_CART_ITEM_QUANTITY_ERROR,
});

export const deleteCartItemRequest = () => ({
  type: actionTypes.DELETE_CART_ITEM_REQUEST,
});

export const deleteCartItemSuccess = (data) => ({
  type: actionTypes.DELETE_CART_ITEM_SUCCESS,
  data,
});

export const deleteCartItemError = () => ({
  type: actionTypes.DELETE_CART_ITEM_ERROR,
});
