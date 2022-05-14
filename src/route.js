export const ROUTE = {
  home: { pageTitle: '홈', path: '/' },
  shoppingCart: { pageTitle: '장바구니', path: '/shopping-cart' },
  orderList: { pageTitle: '주문목록', path: '/order-list' },
  productDetail: { pageTitle: '상품상세', path: '/products/:productId' },
};

export const PAGE_TITLE = Object.values(ROUTE).reduce((prev, { pageTitle, path }) => {
  return {
    ...prev,
    [path]: pageTitle,
  };
}, {});
