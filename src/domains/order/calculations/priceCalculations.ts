import { CartItemWithSelection } from "../../cart/types/response";

/**
 * 선택된 상품의 총 가격 계산
 */
export const calculateOrderPrice = (items: CartItemWithSelection[]): number => {
  return items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
};

/**
 * 상품 가격과 배송비를 합한 총 금액 계산
 */
export const calculateTotalPrice = (
  orderPrice: number,
  shippingFee: number
): number => {
  return orderPrice + shippingFee;
};
