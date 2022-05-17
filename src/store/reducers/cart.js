const initialState = {
  cart: {},
  checkedProductList: [],
  isLoading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_ADD_START':
    case 'CART_FETCH_START':
    case 'CART_UPDATE_START':
    case 'CART_PRODUCT_DELETE_START': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'CART_ADD_SUCCESS':
    case 'CART_FETCH_SUCCESS':
    case 'CART_UPDATE_SUCCESS':
    case 'CART_PRODUCT_DELETE_SUCCESS': {
      const {
        payload: { cart },
      } = action;

      return {
        ...state,
        cart,
        isLoading: false,
      };
    }

    case 'CART_ADD_FAILURE':
    case 'CART_FETCH_FAILURE':
    case 'CART_UPDATE_FAILURE':
    case 'CART_PRODUCT_DELETE_FAILURE': {
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
