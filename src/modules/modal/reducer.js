import {
  OPEN_ALREADY_IN_CART_MODAL,
  OPEN_ADD_CART_MODAL,
  OPEN_ADD_CART_ERROR_MODAL,
  CLOSE_MODAL,
} from './action';

const initialState = {
  openAlreadyInCartModal: false,
  openAddCartModal: false,
  openAddCartErrorModal: false,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ALREADY_IN_CART_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: true,
        openAddCartModal: false,
        openAddCartErrorModal: false,
      };
    case OPEN_ADD_CART_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: false,
        openAddCartModal: true,
        openAddCartErrorModal: false,
      };
    case OPEN_ADD_CART_ERROR_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: false,
        openAddCartModal: false,
        openAddCartErrorModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        openAlreadyInCartModal: false,
        openAddCartModal: false,
        openAddCartErrorModal: false,
      };
    default:
      return state;
  }
};

export default modal;
