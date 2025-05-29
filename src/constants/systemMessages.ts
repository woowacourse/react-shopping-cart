import { FREE_DELIVERY_STANDARD } from "./systemConstants";
import type { CartItemType } from "../types/response";

export const FREE_DELIVERY_MESSAGE = `총 주문 금액이 ${FREE_DELIVERY_STANDARD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`;
export const NO_ITEM_IN_CART = "장바구니에 담은 상품이 없습니다";

export const CART_ITEM_TYPE_COUNT = (cartData: CartItemType[]) =>
  `현재 ${cartData.length}종류의 상품이 담겨있습니다.`;
