import { createStore } from 'redux';

const initialState = {
  itemList: [],
  cart: [],
  orderList: [],
};

const ACTION = {
  SET_ITEM_LIST: 'SET_ITEM_LIST',
  SET_CART_ITEM_LIST: 'SET_CART_ITEM_LIST',

  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  TOGGLE_CART_ITEM_CHECKBOX: 'TOGGLE_CART_ITEM_CHECKBOX',
  SET_ALL_CART_ITEM_CHECKBOX: 'SET_ALL_CART_ITEM_CHECKBOX',
  SET_CART_ITEM_QUANTITY: 'SET_CART_ITEM_QUANTITY',
  DELETE_CART_ITEMS: 'DELETE_CART_ITEMS',
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

export const setCartItemList = data => {
  return {
    type: ACTION.SET_CART_ITEM_LIST,
    payload: data,
  };
};

export const toggleCartItemCheckbox = id => {
  return {
    type: ACTION.TOGGLE_CART_ITEM_CHECKBOX,
    payload: { id },
  };
};

export const setAllCartItemCheckbox = isChecked => {
  return {
    type: ACTION.SET_ALL_CART_ITEM_CHECKBOX,
    payload: { isChecked },
  };
};

export const setCartItemQuantity = ({ id, quantity }) => {
  return {
    type: ACTION.SET_CART_ITEM_QUANTITY,
    payload: { id, quantity },
  };
};

export const deleteCartItems = idList => {
  return {
    type: ACTION.DELETE_CART_ITEMS,
    payload: { idList },
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
    case ACTION.SET_CART_ITEM_LIST:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTION.TOGGLE_CART_ITEM_CHECKBOX:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                checked: !item.checked,
              }
            : item,
        ),
      };
    case ACTION.SET_ALL_CART_ITEM_CHECKBOX:
      return {
        ...state,
        cart: state.cart.map(item => ({
          ...item,
          checked: !action.payload.isChecked,
        })),
      };
    case ACTION.SET_CART_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item,
        ),
      };
    case ACTION.DELETE_CART_ITEMS:
      return {
        ...state,
        cart: state.cart.filter(item => !action.payload.idList.includes(item.id)),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
