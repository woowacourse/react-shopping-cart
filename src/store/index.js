import { createStore } from 'redux';

const initialState = {
  itemList: [],
  cart: [],
  orderList: [],
};

const ACTION = {
  SET_ITEM_LIST: 'SET_ITEM_LIST',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
};

export const setItemList = data => {
  return {
    type: ACTION.SET_ITEM_LIST,
    payload: data,
  };
};

export const addItemToCart = data => {
  return {
    type: ACTION.ADD_ITEM_TO_CART,
    payload: data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload,
      };
    case ACTION.ADD_ITEM_TO_CART:
      const newCartItemList = state.cart.filter(({ id }) => id !== action.payload.id);

      return {
        ...state,
        cart: [...newCartItemList, action.payload],
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
