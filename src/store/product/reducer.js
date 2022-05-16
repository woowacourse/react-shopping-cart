import { START_PRODUCT, SET_PRODUCT, RESET_PRODUCT } from 'store/product/actionTypes';

const initialState = {
  currentProduct: {
    name: '',
    price: 0,
    thumbnail: '',
  },
  isLoading: false,
};

const productReducer = (state = initialState, action) => {
  if (action.type === START_PRODUCT) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_PRODUCT) {
    return {
      ...state,
      currentProduct: action.payload.product,
      isLoading: false,
    };
  }

  if (action.type === RESET_PRODUCT) {
    return initialState;
  }

  return state;
};

export default productReducer;
