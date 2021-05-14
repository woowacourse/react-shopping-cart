const INCREASE_QUANTITY = 'counter/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'counter/DECREASE_QUANTITY';
const ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART';
const DELETE_ITEM_FROM_CART = 'cart/DELETE_ITEM_FROM_CART';
const TOGGLE_CHECKBOX = 'cart/TOGGLE_CHECKBOX';
const ALL_UNCHECK = 'cart/ALL_UNCHECK';
const ALL_CHECK = 'cart/ALL_CHECK';

export const increaseQuantity = (cartItemId) => ({ type: INCREASE_QUANTITY, payload: cartItemId });
export const decreaseQuantity = (cartItemId) => ({ type: DECREASE_QUANTITY, payload: cartItemId });
export const addItemToCart = (item) => ({ type: ADD_ITEM_TO_CART, payload: item });
export const deleteItemFromCart = (cartItemId) => ({ type: DELETE_ITEM_FROM_CART, payload: cartItemId });
export const toggleCheckbox = (cartItemId) => ({ type: TOGGLE_CHECKBOX, payload: cartItemId });
export const allCheck = () => ({ type: ALL_CHECK });
export const allUnCheck = () => ({ type: ALL_UNCHECK });

const initialState = [];

const changeCount = (state, id, mode) => {
  const targetIndex = state.findIndex((value) => value.id === id);
  if (targetIndex === -1) {
    return state;
  }
  const cartItem = state[targetIndex];

  if (mode === 'decrease') {
    if (cartItem.quantity <= 1) {
      //TODO : custom Alert 할수있으면 해보자
      alert('수량은 1개 이상이어야 합니다.');
      return state;
    }
  }

  return [
    ...state.slice(0, targetIndex),
    { ...cartItem, quantity: `${mode === 'increase' ? Number(cartItem.quantity) + 1 : cartItem.quantity - 1}` },
    ...state.slice(targetIndex + 1),
  ];
};

const toggleCheck = (state, id) => {
  const targetIndex = state.findIndex((value) => value.id === id);
  if (targetIndex === -1) {
    return state;
  }
  const targetItem = state[targetIndex];

  return [
    ...state.slice(0, targetIndex),
    { ...targetItem, checked: !targetItem.checked },
    ...state.slice(targetIndex + 1),
  ];
};

const addItem = (state, newItem) => {
  const targetIndex = state.findIndex((value) => value.id === newItem.id);
  if (targetIndex === -1) {
    return [...state, { ...newItem, quantity: 1, checked: true }];
  }

  const targetItem = state[targetIndex];

  return [
    ...state.slice(0, targetIndex),
    { ...targetItem, quantity: targetItem.quantity + 1 },
    ...state.slice(targetIndex + 1),
  ];
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_QUANTITY:
      return changeCount(state, action.payload, 'increase');
    case DECREASE_QUANTITY:
      return changeCount(state, action.payload, 'decrease');
    case ADD_ITEM_TO_CART:
      return addItem(state, action.payload);
    case DELETE_ITEM_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case TOGGLE_CHECKBOX:
      return toggleCheck(state, action.payload);
    case ALL_CHECK:
      return state.map((item) => ({ ...item, checked: true }));
    case ALL_UNCHECK:
      return state.map((item) => ({ ...item, checked: false }));
    default:
      return state;
  }
};

export default cartReducer;
