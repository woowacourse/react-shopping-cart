import { PRODUCT_LIST_PAGE_LIMIT } from 'api/constants';

const initialState = {
  productList: [],
  pageCount: null,
  isLoading: false,
};

export const productActionTypes = {
  START: 'product/ACTION_START',
  FAIL: 'cart/ACTION_FAIL',
  LIST_FETCH: 'product/LIST_FETCH',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productActionTypes.START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case productActionTypes.LIST_FETCH: {
      const {
        payload: { productList, totalProductCount },
      } = action;

      return {
        ...state,
        productList,
        pageCount: Math.ceil(totalProductCount / PRODUCT_LIST_PAGE_LIMIT),
        isLoading: false,
      };
    }

    case productActionTypes.FAIL: {
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

export default productReducer;
