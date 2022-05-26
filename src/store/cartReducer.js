export const ACTIONS = {
  SET_CART_ITEM_LIST: "SET_CART_ITEM_LIST",
};

const initialState = {
  cart: {
    data: [],
  },
};

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ACTIONS.SET_CART_ITEM_LIST:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
