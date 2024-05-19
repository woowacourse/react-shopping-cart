export const CART_MESSAGES = {
  EMPTY: '장바구니에 담은 상품이 없습니다.',
  ITEMS_PRESENT: (categoryCount: number) =>
    `현재 ${categoryCount}종류의 상품이 담겨있습니다.`,
  ORDER_FAIL: '주문 확인을 불러오는 데 실패했습니다.',
  DELETE_ITEM_FAIL: '아이템을 삭제하는데 실패했습니다.',
  INCREASE_QUANTITY_FAIL: '수량을 늘리는데 실패했습니다.',
  DECREASE_QUANTITY_FAIL: '수량을 줄이는데 실패했습니다.',
  TRY_AGAIN: '잠시 후 다시 시도해주세요.',
};

export const DELIVERY_INFO = {
  DELIVERY_AMOUT: 3000,
  FREE_DELIVERY_THRESHOLD: 100000,
  FREE_DELIVERY_MESSAGE:
    '총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.',
};

export const ORDER_MESSAGES = {
  ORDER_SUMMARY: (categoryCount: number, cartItemsCount: number) =>
    `총 ${categoryCount}종류의 상품 ${cartItemsCount}개를 주문합니다.`,
  FINAL_AMOUNT_CONFIRM: '최종 결제 금액을 확인해 주세요.',
  FINAL_AMOUNT: '총 결제 금액',
};
