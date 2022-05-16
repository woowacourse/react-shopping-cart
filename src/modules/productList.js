const START_PRODUCT_LIST = 'productList/START_PRODUCT_LIST';
const SET_PRODUCT_LIST = 'productList/SET_PRODUCT_LIST';

export const startProductList = () => ({
  type: START_PRODUCT_LIST,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: { productList },
});

const initialState = {
  productList: [],
  isLoading: false,
  isLoaded: false,
};

const productListReducer = (state = initialState, action) => {
  if (action.type === START_PRODUCT_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_PRODUCT_LIST) {
    return {
      ...state,
      productList: action.payload.productList,
      isLoading: false,
      isLoaded: true,
    };
  }
  return state;
};

export default productListReducer;
