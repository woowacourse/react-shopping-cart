import { actionTypes } from './actionTypes';

const initialState = {
  products: [],
  count: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: state.products.concat(action.payload),
        count: state.count + 1,
      };
    case actionTypes.REMOVE_PRODUCT_TO_CART:
      return {
        ...state,
        products: state.products.filter(({ id }) => id !== action.payload),
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export default reducer;
