import { ACTION_TYPE } from '../constants';

const initialState = {
  productList: [],
};

export const setProductList = data => {
  return {
    type: ACTION_TYPE.SET_ITEM_LIST,
    payload: data,
  };
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ITEM_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};
