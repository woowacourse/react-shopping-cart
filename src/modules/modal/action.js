export const OPEN_ALREADY_IN_CART_MODAL = 'OPEN_ALREADY_IN_CART_MODAL';
export const OPEN_ADD_CART_MODAL = 'OPEN_ADD_CART_MODAL';
export const OPEN_ADD_CART_ERROR_MODAL = 'OPEN_ADD_CART_ERROR_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openAlreadyInCartModal = () => ({ type: OPEN_ALREADY_IN_CART_MODAL });
export const openAddCartModal = () => ({ type: OPEN_ADD_CART_MODAL });
export const openAddCartErrorModal = () => ({ type: OPEN_ADD_CART_ERROR_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
