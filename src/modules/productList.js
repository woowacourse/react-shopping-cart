const SET_PRODUCT_LIST = 'productList/SET_PRODUCT_LIST';

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: { productList },
});

const initialState = {
  productList: [],
};

const productListReducer = (state = initialState, action) => {
  if (action.type === SET_PRODUCT_LIST) {
    return {
      ...state,
      productList: action.payload.productList,
    };
  }
  return state;
};

export default productListReducer;
