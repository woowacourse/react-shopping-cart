export const GET_CART_ITEMS_LOADING = 'GET_CART_ITEMS_LOADING';
export const GET_CART_ITEMS_SUCCESS = 'GET_CART_ITEMS_SUCCESS';
export const GET_CART_ITEMS_FAILURE = 'GET_CART_ITEMS_FAILURE';

export const ADD_CART_ITEM_LOADING = 'ADD_CART_ITEM_LOADING';
export const ADD_CART_ITEM_SUCCESS = 'ADD_CART_ITEM_SUCCESS';
export const ADD_CART_ITEM_FAILURE = 'ADD_CART_ITEM_FAILURE';

export const DELETE_CART_ITEM_LOADING = 'DELETE_CART_ITEM_LOADING';
export const DELETE_CART_ITEM_SUCCESS = 'DELETE_CART_ITEM_SUCCESS';
export const DELETE_CART_ITEM_FAILURE = 'DELETE_CART_ITEM_FAILURE';

export const DELETE_CART_ITEMS_LOADING = 'DELETE_CART_ITEMS_LOADING';
export const DELETE_CART_ITEMS_SUCCESS = 'DELETE_CART_ITEMS_SUCCESS';
export const DELETE_CART_ITEMS_FAILURE = 'DELETE_CART_ITEMS_FAILURE';

export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';
export const TOGGLE_ALL_CART_ITEM = 'TOGGLE_ALL_CART_ITEM';
export const CHANGE_CART_ITEM_QUANTITY = 'CHANGE_CART_ITEM_QUANTITY';

export const toggleCartItemAction = id => {
  return {
    type: TOGGLE_CART_ITEM,
    payload: id,
  };
};

export const toggleAllCartItemAction = isAllChecked => {
  return {
    type: TOGGLE_ALL_CART_ITEM,
    payload: isAllChecked,
  };
};

export const changeCartItemQuantityAction = ({ id, quantity }) => {
  return {
    type: CHANGE_CART_ITEM_QUANTITY,
    payload: { id, quantity },
  };
};
