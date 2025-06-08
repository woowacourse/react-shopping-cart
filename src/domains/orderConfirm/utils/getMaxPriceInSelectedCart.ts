import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface getMaxPriceInSelectedCartProps {
  selectedCartItems: CartItemTypes[];
}

// ================== 최개 가격 계산 함수 ==================

/**
 * 2+1 적용이 가능한 아이템들 중에서 최대 가격을 계산하는 함수입니다.
 * @parm {cartItems} - 장바구니 아이템들의 배열
 * @parm {selectedCartIds} - 선택된 아이템들의 ID 배열
 * @returns {number} - 선택된 아이템들의 최대 가격. 선택된 아이템이 없으면 0을 반환합니다.
 */
export function getMaxPriceInSelectedCart({
  selectedCartItems,
}: getMaxPriceInSelectedCartProps) {
  if (selectedCartItems.length === 0) return 0;

  return Math.max(...selectedCartItems.map((item) => item.product.price));
}
