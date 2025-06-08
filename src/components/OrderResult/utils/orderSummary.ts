import { ResponseCartItem } from "../../../types/types";

export interface OrderSummary {
  totalCount: number;
  itemTypeCount: number;
  summaryText: string;
}

export const calculateOrderSummary = (
  cartItems: ResponseCartItem[]
): OrderSummary => {
  const totalCount = cartItems.reduce(
    (count, cart) => count + cart.quantity,
    0
  );
  const itemTypeCount = cartItems.length;
  const summaryText = `총 ${itemTypeCount}종류의 상품 ${totalCount}개`;

  return {
    totalCount,
    itemTypeCount,
    summaryText,
  };
};
