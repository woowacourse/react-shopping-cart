export const CART_MESSAGE = {
  totalProducts: (itemQuantity: number) =>
    `현재 ${itemQuantity}종류의 상품이 담겨있습니다`,
  freeShipping: (price: number) =>
    `총 주문 금액이 ${price.toLocaleString(
      'ko-KR'
    )}원 이상일 경우 무료 배송됩니다`,
  emptyCart: `장바구니에 담은 상품이 없습니다.`,
  confirmOrder: (itemQuantity: number, count: number) =>
    `총 ${itemQuantity}종류의 상품 ${count}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`,
} as const;
