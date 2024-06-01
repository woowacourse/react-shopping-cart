export const MESSAGES = {
  cartNotification: '총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.',
  couponModalNotification: '쿠폰은 최대 2개까지 사용할 수 있습니다.',
  totalInfoLabel: '주문 금액',
  discountAmount: '쿠폰 할인 금액',
  deliveryFee: '배송비',
  totalAmountLabel: '총 결제 금액',
  allSelected: '전체 선택',
  delete: '삭제',
  confirm: '주문 확인',
  cart: '장바구니',
  noItemsInCart: '장바구니에 담은 상품이 없습니다.',
  goToOrder: '결제하기',
  goToCart: '장바구니로 돌아가기',
};

export const MESSAGES_PROPS = {
  includedItems: (length: number) => {
    return `현재 ${length}종류의 상품이 담겨있습니다.`;
  },
};
