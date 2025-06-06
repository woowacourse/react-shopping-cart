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

export const FORMATTED_DUE_DATE = (dueDate: string) => {
  const parsedDueDate = new Date(dueDate);
  return `만료일: ${parsedDueDate.getFullYear()}년 ${
    parsedDueDate.getMonth() + 1
  }월 ${parsedDueDate.getDate()}일`;
};

export const FORMATTED_MINIMUM_AMOUNT = (minimumAmount: number) =>
  `최소주문금액:  ${minimumAmount.toLocaleString()}원`;
