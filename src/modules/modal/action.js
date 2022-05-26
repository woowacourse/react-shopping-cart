export const OPEN_ALREADY_IN_CART_MODAL = 'OPEN_ALREADY_IN_CART_MODAL';
export const OPEN_ADD_CART_MODAL = 'OPEN_ADD_CART_MODAL';
export const OPEN_ADD_CART_ERROR_MODAL = 'OPEN_ADD_CART_ERROR_MODAL';
export const OPEN_DELETE_PRODUCT_CART_ERROR_MODAL = 'OPEN_DELETE_PRODUCT_CART_ERROR_MODAL';
export const OPEN_PRODUCT_COUNT_UP_ERROR_MODAL = 'OPEN_PRODUCT_COUNT_UP_ERROR_MODAL';
export const OPEN_CART_PRODUCT_MAX_COUNT_MODAL = 'OPEN_CART_PRODUCT_MAX_COUNT_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openAlreadyInCartModal = () => ({ type: OPEN_ALREADY_IN_CART_MODAL });
export const openAddCartModal = () => ({ type: OPEN_ADD_CART_MODAL });
export const openAddCartErrorModal = () => ({ type: OPEN_ADD_CART_ERROR_MODAL });
export const openDeleteProductCartErrorModal = () => ({
  type: OPEN_DELETE_PRODUCT_CART_ERROR_MODAL,
});
export const openProductCountUpErrorModal = () => ({ type: OPEN_PRODUCT_COUNT_UP_ERROR_MODAL });
export const openCartProductMaxCountModal = () => ({ type: OPEN_CART_PRODUCT_MAX_COUNT_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
