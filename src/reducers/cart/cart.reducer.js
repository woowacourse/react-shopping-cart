import actionTypes from 'reducers/cart/cart.actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const addCart = (cartList, newCartItem) => {
  const isExisted =
    cartList.findIndex(({ id }) => id === newCartItem.id) !== -1;

  if (isExisted) {
    return cartList.map((item) => {
      if (item.id === newCartItem.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  }
  return [...cartList, newCartItem];
};

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART) {
    return { ...state, isLoading: true };
  }

  if (action.type === actionTypes.GET_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_CART_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  if (action.type === actionTypes.ADD_CART_ITEM) {
    return {
      ...state,
      data: addCart(state.data, action.item),
    };
  }
  return state;
};

export default cartReducer;
