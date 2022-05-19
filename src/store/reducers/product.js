import { actionTypes } from '../actionTypes';

const initialState = {
  productList: [],
};

function productReducer(state = initialState, action) {
  if (action.type === actionTypes.SET_PRODUCT_LIST) {
    return { ...state, productList: [...action.payload] };
  }
  return state;
}

export default productReducer;
