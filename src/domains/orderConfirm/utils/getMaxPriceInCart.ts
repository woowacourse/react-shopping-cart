import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface GetMaxPriceInSelectedCartParams {
  selectedCartItems: CartItemTypes[];
}

// ================== 최개 가격 계산 함수 ==================

/**
 * 주어진 장바구니 아이템들 중에서 최대 가격을 반환합니다.
 * @param {CartItemTypes[]} selectedCartItems - 선택된 장바구니 아이템들
 * @returns {number} - 선택된 장바구니 아이템들 중 최대 가격
 */
export function getMaxPriceInCart({
  selectedCartItems,
}: GetMaxPriceInSelectedCartParams) {
  if (selectedCartItems.length === 0) return 0;

  return Math.max(...selectedCartItems.map((item) => item.product.price));
}
