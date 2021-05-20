const ROUTE = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  GET_PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  SHOPPING_CART: '/shopping-cart',
  ORDER_LIST: '/order/list',
  ORDER_DETAIL: '/order/:id',
  GET_ORDER_DETAIL: (id: string) => `/order/${id}`,
  ORDER_CHECKOUT: '/order/checkout',
};

export { ROUTE };
