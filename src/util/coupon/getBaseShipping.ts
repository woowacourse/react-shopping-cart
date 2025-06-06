import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "@/constants/priceSetting";

export const getBaseShipping = (
  subtotal: number,
  isIsland: boolean
): number => {
  // 1) 기본 무료 기준 (subtotal >= FREE_SHIPPING_OVER)인 경우
  if (subtotal >= FREE_SHIPPING_OVER) {
    // → 섬이라면 “섬 추가 3,000원”만, 비섬이면 0원
    return isIsland ? 3000 : 0;
  }

  // 2) subtotal < 무료 기준인 경우
  // → 기본 배송비 + (섬이면 +3,000원, 아니면 +0원)
  return SHIPPING_FEE + (isIsland ? 3000 : 0);
};
