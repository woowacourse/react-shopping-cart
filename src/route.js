export const ROUTE = {
  home: { pageTitle: '홈', route: '/' },
  shoppingCart: { pageTitle: '장바구니', route: '/shopping-cart' },
  orderList: { pageTitle: '주문목록', route: '/order-list' },
  productDetail: { pageTitle: '상품상세', route: '/products/:productId' },
};

export const PAGE_TITLE = {
  [ROUTE.home.route]: ROUTE.home.pageTitle,
  [ROUTE.shoppingCart.route]: ROUTE.shoppingCart.pageTitle,
  [ROUTE.orderList.route]: ROUTE.orderList.pageTitle,
  [ROUTE.productDetail.route]: ROUTE.productDetail.pageTitle,
};
