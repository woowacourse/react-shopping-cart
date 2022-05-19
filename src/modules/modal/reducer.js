import {
  OPEN_ALREADY_IN_CART_MODAL,
  OPEN_ADD_CART_MODAL,
  OPEN_ADD_CART_ERROR_MODAL,
  CLOSE_MODAL,
  OPEN_DELETE_PRODUCT_CART_ERROR_MODAL,
} from './action';

const initialState = {
  openAlreadyInCartModal: false,
  openAddCartModal: false,
  openAddCartErrorModal: false,
  openDeleteProductCartErrorModal: false,
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
    case CLOSE_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: false,
        openAddCartModal: false,
        openAddCartErrorModal: false,
        openDeleteProductCartErrorModal: false,
      };
    default:
      return state;
  }
};

export default modal;
