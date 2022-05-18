import { actionTypes } from './actionTypes';

const initialState = {
  productList: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: [...action.payload],
      };
    default:
      return state;
  }
}

export default reducer;
