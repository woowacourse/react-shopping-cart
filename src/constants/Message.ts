const MESSAGE = {
  alertingError: '오류가 발생하였습니다!',
  selected: '선택됨',
  unSelected: '선택되지 않음',
  removeButton: '삭제 버튼',
  minusButton: '마이너스 버튼',
  plusButton: '플러스 버튼',
  remove: '삭제',
  koreanCurrencyUnit: '원',
  fetchError: '장바구니 정보 불러오기를 실패했습니다.',
  removalError: '장바구니 아이템 삭제를 실패했습니다.',
  quantityAdjustmentError: '장바구니 아이템 수령 변경을 실패했습니다.',
  allSelected: '전체 선택',
  notAllSelected: '전체 선택 해제',
  orderConfirmation: '주문 확인',
  totalPaymentAmount: '총 결제 금액',
  paymentAmount: '주문 금액',
  shippingFee: '배송비',
  shop: 'shop',
  backSpace: '⬅',
  pay: '결제하기',
  shoppingCart: '장바구니',
  emptyCart: '장바구니에 담은 상품이 없습니다.',
  paymentCaption: '총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.',
  paymentAmountConfirmation: '최종 결제 금액을 확인해 주세요.',
  orderSuccess: (
    selectedCartItemCount: number,
    totalCartItemQuantity: number,
  ) => `총 ${selectedCartItemCount}종류의 상품 ${totalCartItemQuantity}개를
    주문합니다.`,
  titleCaption: (cartItemCount: number) =>
    `현재 ${cartItemCount}종류의 상품이 담겨있습니다.`,
};

export default MESSAGE;
