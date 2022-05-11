const initialState = {
  productList: [],
  isLoading: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_FETCH_START': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'PRODUCT_LIST_FETCH_SUCCESS': {
      const {
        payload: { productList },
      } = action;
      return {
        ...state,
        productList,
        isLoading: false,
      };
    }
    case 'PRODUCT_LIST_FETCH_FAILURE': {
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
