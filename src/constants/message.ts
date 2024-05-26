export const CART_MESSAGE = {
  totalProducts: (itemQuantity: number) =>
    `현재 ${itemQuantity}종류의 상품이 담겨있습니다`,
  freeShipping: (price: number) =>
    `총 주문 금액이 ${price.toLocaleString(
      "ko-KR"
    )}원 이상일 경우 무료 배송됩니다`,
  emptyCart: `장바구니에 담은 상품이 없습니다.`,
  confirmOrder: (itemCount: number, totalQuantity: number) =>
    `총 ${itemCount}종류의 상품 ${totalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`,
} as const;

export const ORDER_CONFIRM_MESSAGE = {
  confirmOrder: (itemCount: number, totalQuantity: number) =>
    `총 ${itemCount}종류의 상품 ${totalQuantity}개를 주문합니다.`,
  confirmPrice: `최종 결제 금액을 확인해 주세요.`,
};

export const COUPON_MESSAGE = {
  maxApplicableCoupon: (number: number) =>
    `쿠폰은 최대 ${number}개까지 사용할 수 있습니다.`,
  chooseCoupon: "쿠폰을 선택해 주세요",
  applyCoupon: (amount: number) =>
    `총 ${amount.toLocaleString("ko-KR")}원 할인 쿠폰 사용하기`,

  expirationDate: (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
  },

  minimumAmount: (amount: number) => `${amount.toLocaleString("ko-KR")}원`,

  availableTime: ({ start, end }: { start: string; end: string }) => {
    const startTime = Number(start.slice(0, 2));
    const endTime = Number(end.slice(0, 2));
    const startSlot = startTime < 12 ? "오전" : "오후";
    const endSlot = endTime < 12 ? "오전" : "오후";

    return `${startSlot} ${startTime}시부터 ${
      startSlot === endSlot ? "" : endSlot
    } ${endTime}까지`;
  },
};
