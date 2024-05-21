import { formatToWon } from "@/utils/stringHelper";

export const CART_PAGE_TITLES = {
  shop: "SHOP",
  cart: "장바구니",
};

export const CART_PAGE_CAPTION = {
  orderConfirm: "주문 확인",
  payConfirm: "결제 확인",
  totalPaymentAmount: "총 결제 금액",
  allItemSelected: "전체선택",
  selectAll: "전체선택",
  pay: "결제하기",
  moveToCartPage: "장바구니로 돌아가기",
};

export const SHIPPING_INFO = {
  FREE_SHIPPING_THRESHOLD: 100000,
  SHIPPING_FEE: 3000,
};

export const CART_PAGE_MESSAGES = {
  freeShippingInfo: `총 주문 금액이 ${formatToWon(
    SHIPPING_INFO.FREE_SHIPPING_THRESHOLD
  )}원 이상일 경우 무료 배송됩니다.`,
  askOrderConfirm: `최종 결제 금액을 확인해 주세요.`,
  itemCount: (count: number) => `현재 ${count}종류의 상품이 담겨있습니다.`,
  orderInfo: (typeLength: number, totalCount: number) =>
    `총 ${typeLength}종류의 상품 ${totalCount}개를 주문합니다.`,
};
