const FETCH_PRODUCT_LIST = 'product/FETCH_PRODUCT_LIST';

export const fetchProductList = (productList) => {
  return {
    type: FETCH_PRODUCT_LIST,
    payload: productList,
  };
};

const initialState = {
  productList: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export default product;
