const initialState = {
  cart: {},
  isLoading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_ADD_START': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'CART_ADD_SUCCESS': {
      const {
        payload: { cart },
      } = action;
      return {
        ...state,
        cart,
        isLoading: false,
      };
    }

    case 'CART_ADD_FAILURE': {
      const {
        payload: { message },
      } = action;

      alert(message);

      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
