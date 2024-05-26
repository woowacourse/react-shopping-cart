import ORDER from "./order";

export const SHOPPING_MESSAGE = {
  shop: "SHOP",
  basket: "장바구니",
  cartAdd: "장바구니에 상품을 추가해주세요",
  confirmOrder: "주문 확인",
  aboutShipping: "배송 정보",
  sigol: "제주도 및 도서 산간 지역",
  selectAll: "전체선택",
  confirmDelete: "정말로 삭제하시겠습니까?",
  confirmPaying: "정말로 결제하겠습니까?",
  emptyBasket: "장바구니가 비었어요 ㅠㅠ",
  orderAmount: "주문 금액",
  shippingFee: "배송비",
  totalPayAmount: "총 결제 금액",
  makePayment: "결제하기",
  goBackToBasket: "장바구니로 돌아가기",
  couponInfo: `쿠폰은 최대 ${ORDER.maxCouponCount}개까지 사용할 수 있습니다.`,

  freeShippingFeeInfo(price: string) {
    return `총 주문 금액이 ${price}원 이상일 경우 무료 배송됩니다.`;
  },
  currentBasket(cartItemsLength: number) {
    return `현재 ${cartItemsLength}종류의 상품이 담겨있습니다.`;
  },
  orderDescription(kind: number, total: number) {
    return `총 ${kind}종류의 상품 ${total}개를 주문합니다. \n최종 결제 금액을 확인해 주세요.`;
  },
  couponDiscountAmount(discountAmount: number) {
    return `총 ${discountAmount.toLocaleString()}원 할인 쿠폰 사용하기`;
  },
};

export const ERROR_MESSAGE = {
  failAccess: "페이지 접속 실패",
  networkError: "네트워크 에러가 발생했어요..",
  retry: "다시 시도",
  paymentError: "에러가 발생했습니다. 다시 결제를 진행해주세요!",
};
