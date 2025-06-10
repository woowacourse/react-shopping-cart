import { CartItem } from "@/type/CartItem";

interface BOGOResult {
  item: CartItem;
  groups: number;
  totalDiscount: number;
}

/**
 * BOGO(Buy X Get Y) 쿠폰에 적용 가능한 가장 큰 할인을 제공하는 상품을 찾습니다.
 * 의미론적으로는, BNGN(Buy N Get N) 쿠폰에 이 더 적절하지만,
 * 실제 사용에서는 BOGO로 표현되는 경우가 많습니다. (구글 검색량 기준)
 *
 * 각 상품별로 적용 가능한 할인 금액을 계산하여 가장 큰 할인을 제공하는 상품을 선택합니다.
 * 예시:
 * - 상품A: 10,000원 x 3개
 * - 상품B: 8,000원 x 6개
 * - Buy 2 Get 1 쿠폰 적용 시
 * - 상품A → 10,000원 할인 (1회)
 * - 상품B → 16,000원 할인 (2회)
 * - 결과: 상품B 선택
 *
 * @param cartItems 장바구니 아이템 목록
 * @param buyQuantity 구매해야 하는 수량
 * @param getQuantity 무료로 받는 수량
 * @returns 최대 할인을 제공하는 상품과 그룹 정보 또는 null
 */
export const seekMostExpensiveBOGOItem = (
  cartItems: CartItem[],
  buyQuantity: number,
  getQuantity: number
): BOGOResult | null => {
  const groupSize = buyQuantity + getQuantity;

  const eligibleItems = cartItems.filter((item) => item.quantity >= groupSize);

  if (eligibleItems.length === 0) {
    return null;
  }

  const itemsWithDiscount = eligibleItems.map((item) => {
    const groups = Math.floor(item.quantity / groupSize);
    const totalDiscount = item.product.price * (groups * getQuantity);

    return {
      item,
      groups,
      totalDiscount,
    };
  });

  return itemsWithDiscount.reduce((max, curr) =>
    curr.totalDiscount > max.totalDiscount ? curr : max
  );
};
