import {
  GET_PRODUCT_CART_LOADING,
  GET_PRODUCT_CART_SUCCESS,
  GET_PRODUCT_CART_FAIL,
  ADD_PRODUCT_CART_FAIL,
} from './action';

const initialState = {
  cartProducts: [],
  getProductCartLoading: false,
  getProductCartSuccess: false,
  getProductCartFail: '',
  addProductCartFail: '',
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_CART_LOADING:
      return {
        ...state,
        getProductCartLoading: true,
        getProductCartSuccess: false,
        getProductCartFail: '',
        addProductCartFail: '',
      };
    case GET_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        getProductCartLoading: false,
        getProductCartSuccess: true,
        getProductCartFail: '',
        addProductCartFail: '',
        cartProducts: [...action.cartProducts],
      };
    case GET_PRODUCT_CART_FAIL:
      return {
        ...state,
        getProductCartLoading: false,
        getProductCartSuccess: false,
        getProductCartFail: action.type,
        addProductCartFail: '',
      };
    case ADD_PRODUCT_CART_FAIL:
      return {
        ...state,
        getProductCartLoading: false,
        getProductCartSuccess: false,
        getProductCartFail: '',
        addProductCartFail: action.type,
      };
    default:
      return state;
  }
};

export default cart;
