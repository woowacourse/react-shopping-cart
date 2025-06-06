import { FEE } from "./systemConstants";
import type { CartItemType } from "../types/response";

export const FREE_DELIVERY_MESSAGE = `총 주문 금액이 ${FEE.DELIVERY_FEE_STANDARD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`;
export const NO_ITEM_IN_CART = "장바구니에 담은 상품이 없습니다";

export const ORDER_CONFIRMATION_MESSAGE = (
  productTypeCount: number,
  totalProductCount: number
) =>
  `총 ${productTypeCount}종류의 상품 ${totalProductCount}개를 주문합니다. 최종 결제 금액을 확인해 주세요.`;

export const CART_ITEM_TYPE_COUNT = (cartData: CartItemType[]) =>
  `현재 ${cartData.length}종류의 상품이 담겨있습니다.`;

export const FORMATTED_DUE_DATE = (
  year: string,
  month: string,
  day: string
) => {
  return `만료일: ${year}년 ${month}월 ${day}일`;
};

export const FORMATTED_MINIMUM_AMOUNT = (minimumAmount: number) =>
  `최소 주문 금액:  ${minimumAmount.toLocaleString()}원`;

export const FORMATTED_AVAILABLE_TIME = (start: string, end: string) => {
  return `사용 가능 시간 : ${start}부터 ${end}까지`;
};
