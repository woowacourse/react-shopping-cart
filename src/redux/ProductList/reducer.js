import { GET_PRODUCTS_SUCCESS, RESET_PRODUCTS } from './actions';

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return [...state, ...action.payload];

    case RESET_PRODUCTS:
      return [];

    default:
      return state;
  }
};

export default productListReducer;
