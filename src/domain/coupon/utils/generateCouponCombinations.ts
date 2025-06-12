import { Coupon } from "../../../api/coupon";

type CouponCombination = Coupon[];
type CouponCombinations = CouponCombination[];

export function generateCouponCombinations(
  coupons: Coupon[],
  maxCombinations: number = 2
): CouponCombinations {
  const combinations: CouponCombinations = [];
  const memo = new Set<string>();

  function isUniqueCombination(combination: CouponCombination): boolean {
    const key = combination.map((c) => c.id).sort().join(",");
    if (memo.has(key)) return false;
    memo.add(key);
    return true;
  }

  function addCombination(combination: CouponCombination) {
    if (isUniqueCombination(combination)) {
      combinations.push([...combination]);
    }
  }

  function generateCombinations(
    current: CouponCombination,
    start: number,
    depth: number
  ) {
    // 현재 조합이 유효하면 추가
    if (current.length > 0) {
      addCombination(current);
    }

    // 최대 조합 개수에 도달하면 중단
    if (depth >= maxCombinations) return;

    // 다음 쿠폰을 추가하여 새로운 조합 생성
    for (let i = start; i < coupons.length; i++) {
      current.push(coupons[i]);
      generateCombinations(current, i + 1, depth + 1);
      current.pop();
    }
  }

  generateCombinations([], 0, 0);
  return combinations;
}
