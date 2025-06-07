import { CartItemWithSelection } from "../../cart/types/response";

/**
 * 선택된 상품만 필터링
 */
export const filterSelectedItems = (
  items: CartItemWithSelection[]
): CartItemWithSelection[] => {
  return items.filter((item) => item.selected);
};

/**
 * 상품 수량 계산
 */
export const calculateOrderQuantity = (
  items: CartItemWithSelection[]
): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};
