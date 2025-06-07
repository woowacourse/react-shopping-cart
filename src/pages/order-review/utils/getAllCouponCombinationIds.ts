import { CouponContent } from '@/api/type';

export const getAllCouponCombinationIds = (
  availableCoupons: CouponContent[]
): number[][] => {
  const result: number[][] = [];

  // 쿠폰이 1개일 때는 해당 쿠폰 id만 담긴 배열 반환
  if (availableCoupons.length === 1) {
    return [[availableCoupons[0].id]];
  }

  // 2개 이상일 때는 모든 2개 조합(순서까지)
  for (let i = 0; i < availableCoupons.length; i++) {
    for (let j = 0; j < availableCoupons.length; j++) {
      if (i === j) continue; // 같은 쿠폰 중복 방지
      result.push([availableCoupons[i].id, availableCoupons[j].id]);
    }
  }

  return result;
};
