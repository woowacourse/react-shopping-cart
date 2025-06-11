import { useMemo } from "react";
import type { Coupon, BuyXGetYCoupon } from "@/type/Coupon";
import { isBogo } from "@/util/type/isBogo";

export default function useBogoBanner(
  quantity: number,
  coupons?: Coupon[] | null
) {
  const bogo = useMemo<BuyXGetYCoupon | undefined>(() => {
    if (!coupons) return;
    return coupons.find(isBogo);
  }, [coupons]);

  if (!bogo) return null;

  const group = bogo.buyQuantity + bogo.getQuantity;
  const remainder = quantity % group;
  const need = (group - remainder) % group;

  if (quantity < bogo.buyQuantity) {
    return `${bogo.buyQuantity}개 구매 시 ${bogo.getQuantity}개 무료!`;
  }
  if (need > 0) {
    return `${need}개만 더 담으면 ${bogo.getQuantity}개 무료!`;
  }
  return null; // 이미 혜택 적용
}
