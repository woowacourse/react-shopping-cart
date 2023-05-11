export const PAGE_ROUTES = {
  HOME: '/',
  CART: '/cart',
} as const;

export const PAGE_TITLE = {
  [PAGE_ROUTES.HOME]: '상품 목록',
  [PAGE_ROUTES.CART]: '장바구니',
} as const;
