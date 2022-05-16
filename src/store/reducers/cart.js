const initialState = {
  cart: {},
  checkedProductList: [],
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

    case 'CART_FETCH_START': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'CART_FETCH_SUCCESS': {
      const {
        payload: { cart },
      } = action;
      return {
        ...state,
        cart,
        isLoading: false,
      };
    }

    case 'CART_FETCH_FAILURE': {
      const {
        payload: { message },
      } = action;

      alert(message);

      return {
        ...state,
        isLoading: false,
      };
    }

    case 'CART_UPDATE_START': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'CART_UPDATE_SUCCESS': {
      const {
        payload: { cart },
      } = action;
      return {
        ...state,
        cart,
        isLoading: false,
      };
    }

    case 'CART_UPDATE_FAILURE': {
      const {
        payload: { message },
      } = action;

      alert(message);

      return {
        ...state,
        isLoading: false,
      };
    }

    case 'UPDATE_CHECKED_LIST': {
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
