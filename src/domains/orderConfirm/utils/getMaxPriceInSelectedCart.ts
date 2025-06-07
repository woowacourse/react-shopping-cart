import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface getMaxPriceInSelectedCartProps {
  cartItems: CartItemTypes[];
  selectedCartIds: string[];
}

// ================== 최개 가격 계산 함수 ==================

/**
 * 주어진 장바구니 아이템들 중에서 선택된 아이템들의 최대 가격을 계산합니다.
 * @param {CartItemTypes[]} cartItems - 장바구니 아이템들의 배열
 * @param {string[]} selectedCartIds - 선택된 장바구니 아이템들의 ID 배열
 * @returns {number} - 선택된 아이템들 중 최대 가격
 */
export function getMaxPriceInSelectedCart({
  cartItems,
  selectedCartIds,
}: getMaxPriceInSelectedCartProps) {
  const selectedCartItems = cartItems.filter(
    (item) => selectedCartIds.includes(item.id.toString()) && item.quantity >= 3
  );

  if (selectedCartItems.length === 0) return 0;

  return Math.max(...selectedCartItems.map((item) => item.product.price));
}
