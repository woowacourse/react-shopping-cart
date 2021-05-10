import { createStore } from 'redux';

const initialState = {
  itemList: [],
  cart: [],
  orderList: [],
};

const ACTION_TYPE = {
  SET_ITEM_LIST: 'SET_ITEM_LIST',
  SET_CART_ITEM_LIST: 'SET_CART_ITEM_LIST',

  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  TOGGLE_CART_ITEM_CHECKBOX: 'TOGGLE_CART_ITEM_CHECKBOX',
  SET_ALL_CART_ITEM_CHECKBOX: 'SET_ALL_CART_ITEM_CHECKBOX',
  SET_CART_ITEM_QUANTITY: 'SET_CART_ITEM_QUANTITY',
  DELETE_CART_ITEMS: 'DELETE_CART_ITEMS',

  ADD_ORDER_DETAIL: 'ADD_ORDER_DETAIL',
};

export const setItemList = data => {
  return {
    type: ACTION_TYPE.SET_ITEM_LIST,
    payload: data,
  };
};

export const addItemToCart = data => {
  return {
    type: ACTION_TYPE.ADD_ITEM_TO_CART,
    payload: data,
  };
};

export const setCartItemList = data => {
  return {
    type: ACTION_TYPE.SET_CART_ITEM_LIST,
    payload: data,
  };
};

export const toggleCartItemCheckbox = id => {
  return {
    type: ACTION_TYPE.TOGGLE_CART_ITEM_CHECKBOX,
    payload: { id },
  };
};

export const setAllCartItemCheckbox = isChecked => {
  return {
    type: ACTION_TYPE.SET_ALL_CART_ITEM_CHECKBOX,
    payload: { isChecked },
  };
};

export const setCartItemQuantity = ({ id, quantity }) => {
  return {
    type: ACTION_TYPE.SET_CART_ITEM_QUANTITY,
    payload: { id, quantity },
  };
};

export const deleteCartItems = idList => {
  return {
    type: ACTION_TYPE.DELETE_CART_ITEMS,
    payload: { idList },
  };
};

export const addOrderDetail = data => {
  return {
    type: ACTION_TYPE.ADD_ORDER_DETAIL,
    payload: data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload,
      };
    case ACTION_TYPE.ADD_ITEM_TO_CART:
      const newCartItemList = state.cart.filter(({ id }) => id !== action.payload.id);

      return {
        ...state,
        cart: [...newCartItemList, action.payload],
      };
    case ACTION_TYPE.SET_CART_ITEM_LIST:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTION_TYPE.TOGGLE_CART_ITEM_CHECKBOX:
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
    case ACTION_TYPE.SET_ALL_CART_ITEM_CHECKBOX:
      return {
        ...state,
        cart: state.cart.map(item => ({
          ...item,
          checked: !action.payload.isChecked,
        })),
      };
    case ACTION_TYPE.SET_CART_ITEM_QUANTITY:
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
    case ACTION_TYPE.DELETE_CART_ITEMS:
      return {
        ...state,
        cart: state.cart.filter(item => !action.payload.idList.includes(item.id)),
      };
    case ACTION_TYPE.ADD_ORDER_DETAIL:
      return {
        ...state,
        orderList: state.orderList.concat(action.payload),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
