import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "@/constants/priceSetting";

export const getBaseShipping = (
  subtotal: number,
  isIsland: boolean
): number => {
  if (subtotal >= FREE_SHIPPING_OVER) return 0;
  return SHIPPING_FEE + (isIsland ? 3000 : 0);
};
