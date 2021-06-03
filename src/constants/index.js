import noImage from '../assets/image/noImage.jpeg';
import loading from '../assets/image/loading.gif';

export const ACTION_TYPE = {
  PRODUCTS: {
    ADD_INITIAL_PRODUCT: 'product/addInitialProductToCart',
    ADD_TO_CART: 'products/addToCart',
    INCREASE_QUANTITY: 'products/increaseQuantity',
    DECREASE_QUANTITY: 'products/decreaseQuantity',
    TOGGLE_CHECKED: 'products/toggleChecked',
    TOGGLE_ENTIRE_CHECKED: 'products/toggleEntireChecked',
    DELETE_CHECKED: 'products/deleteCheckedProducts',
    DELETE: 'products/deleteProduct',
    SET_PRODUCTS: 'products/setProducts',
    GET_PRODUCT_DETAIL: 'products/getProductDetail',
    RESET_PRODUCT_DETAIL: 'products/resetProductDetail',
    SET_CARTS: 'products/setCarts',
    RESET_CARTS: 'products/resetCarts',
  },

  URL: {
    GET_URL: 'url/restrictDirectAccess',
  },

  ORDERS: {
    SET_COMPLETED_ORDERS: 'orders/completed',
  },
};

export const FALLBACK = {
  PRODUCT: {
    IMG_URL: noImage,
    NAME: '상품명 없음',
    PRICE: -1,
    QUANTITY: 1,
    CHECKED: true,
    LOADING: loading,
  },
};

export const ROUTE = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  ORDER_PAYMENT: '/order-payment',
  COMPLETED_ORDER: '/completed-order',
  ORDER_DETAILS: '/order-details',
  PRODUCT_DETAILS: '/product-details',
};

export const PRODUCT = {
  QUANTITY: {
    MIN: 1,
    MAX: 100,
  },
};
