import { ProductAction, ProductStoreState } from 'types/index';

import CONDITION from 'constants/condition';
import { productTypes } from 'redux/actions';

const initialState: ProductStoreState = {
  condition: CONDITION.NONE,
  productList: [],
  productDetail: null,
};

function product(state = initialState, action: ProductAction) {
  switch (action.type) {
    case productTypes.GET_PRODUCT_LIST: {
      return { ...state, condition: CONDITION.LOADING };
    }
    case productTypes.GET_PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        condition: CONDITION.COMPLETE,
        productList: action.payload,
      };
    }
    case productTypes.GET_PRODUCT_LIST_ERROR: {
      return { ...state, condition: CONDITION.ERROR, productList: [] };
    }
    case productTypes.GET_PRODUCT_DETAIL: {
      return { ...state, condition: CONDITION.LOADING };
    }
    case productTypes.GET_PRODUCT_DETAIL_SUCCESS: {
      return {
        ...state,
        condition: CONDITION.COMPLETE,
        productDetail: action.payload,
      };
    }
    case productTypes.GET_PRODUCT_DETAIL_ERROR: {
      return { ...state, condition: CONDITION.ERROR, productDetail: null };
    }
    default:
      return state;
  }
}

export default product;
