const initialState = {
  cart: {},
  checkedProductList: [],
  isLoading: false,
};

export const cartActionType = {
  START: 'cart/ACTION_START',
  FAIL: 'cart/ACTION_FAIL',
  FETCH: 'cart/FETCH',
  UPDATE: 'cart/UPDATE',
  UPDATE_CHECKED_LIST: 'cart/UPDATE_CHECKED_LIST',
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionType.START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case cartActionType.UPDATE: {
      const {
        payload: { cart },
      } = action;

      return {
        ...state,
        cart,
        checkedProductList: Object.keys(cart),
        isLoading: false,
      };
    }

    case cartActionType.FAIL: {
      const {
        payload: { message },
      } = action;

      alert(message);

      return {
        ...state,
        isLoading: false,
      };
    }

    case cartActionType.UPDATE_CHECKED_LIST: {
      const {
        payload: { checkedProductList },
      } = action;

      return {
        ...state,
        checkedProductList,
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
