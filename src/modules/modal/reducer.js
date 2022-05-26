import {
  OPEN_ALREADY_IN_CART_MODAL,
  OPEN_ADD_CART_MODAL,
  OPEN_ADD_CART_ERROR_MODAL,
  OPEN_DELETE_PRODUCT_CART_ERROR_MODAL,
  OPEN_PRODUCT_COUNT_UP_ERROR_MODAL,
  OPEN_CART_PRODUCT_MAX_COUNT_MODAL,
  CLOSE_MODAL,
} from './action';

const initialState = {
  openAlreadyInCartModal: false,
  openAddCartModal: false,
  openAddCartErrorModal: false,
  openDeleteProductCartErrorModal: false,
  openProductCountUpErrorModal: false,
  openCartProductMaxCountModal: false,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ALREADY_IN_CART_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: true,
      };
    case OPEN_ADD_CART_MODAL:
      return {
        ...state,
        openAddCartModal: true,
      };
    case OPEN_ADD_CART_ERROR_MODAL:
      return {
        ...state,
        openAddCartErrorModal: true,
      };
    case OPEN_DELETE_PRODUCT_CART_ERROR_MODAL:
      return {
        ...state,
        openDeleteProductCartErrorModal: true,
      };
    case OPEN_PRODUCT_COUNT_UP_ERROR_MODAL:
      return {
        ...state,
        openProductCountUpErrorModal: true,
      };
    case OPEN_CART_PRODUCT_MAX_COUNT_MODAL:
      return {
        ...state,
        openCartProductMaxCountModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: false,
        openAddCartModal: false,
        openAddCartErrorModal: false,
        openDeleteProductCartErrorModal: false,
        openProductCountUpErrorModal: false,
        openCartProductMaxCountModal: false,
      };
    default:
      return state;
  }
};

export default modal;
