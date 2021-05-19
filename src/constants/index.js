import noImage from '../assets/image/noImage.jpeg';

export const ACTION_TYPE = {
  PRODUCTS: {
    ADD_TO_CART: 'products/addToCart',
    INCREASE_QUANTITY: 'products/increaseQuantity',
    DECREASE_QUANTITY: 'products/decreaseQuantity',
    TOGGLE_CHECKED: 'products/toggleChecked',
    TOGGLE_ENTIRE_CHECKED: 'products/toggleEntireChecked',
    DELETE_CHECKED: 'products/deleteCheckedProducts',
    DELETE: 'products/deleteProduct',
  },
};

export const FALLBACK = {
  PRODUCT: {
    IMG_URL: noImage,
    NAME: '상품명 없음',
    PRICE: -1,
    QUANTITY: 1,
    CHECKED: true,
  },
};

export const ROUTE = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  ORDER_PAYMENT: '/order-payment',
  COMPLETED_ORDER: '/completed-order',
};

export const PRODUCT = {
  QUANTITY: {
    MIN: 1,
    MAX: 100,
  },
};
