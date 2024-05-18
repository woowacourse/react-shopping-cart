export const TITLES = {
  shop: "SHOP",
  cart: "장바구니",
  selectAll: "전체선택",
  orderConfirm: "주문 확인",
};

const FREE_SHIPPING_THRESHOLD = 100000;

export const MESSAGES = {
  itemCount: (count: number) => `현재 ${count}종류의 상품이 담겨있습니다.`,
  freeShippingInfo: `총 주문 금액이 ${FREE_SHIPPING_THRESHOLD}원 이상일 경우 무료 배송됩니다.`,
};
