import { CartItem } from "@/type/CartItem";

/**
 * 장바구니 아이템들의 총 주문 금액을 계산합니다.
 */
export const calculateOrderTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
};
