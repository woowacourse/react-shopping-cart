import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";
import { calculateCouponDiscount } from "./couponCalculator";
import { CouponCombinationState } from "./couponCombinationGenerator";
import { getAvailableCoupons } from "./couponFilter";
import { sortCouponsByPriority } from "./couponSorter";
import { generateCouponCombinations } from "./generateCouponCombinations";

export interface OptimizedCouponResult {
  selectedCoupons: Coupon[];
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
  finalDiscount: number;
}

// LRU 캐시 구현
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }
}

function findBestCouponCombination(
  couponCombinations: Coupon[][],
  totalCartPrice: number,
  shippingFee: number,
  selectedCartItems: Cart[] | undefined
): OptimizedCouponResult {
  const memo = new LRUCache<string, CouponCombinationState>(100);

  function calculateBestCombination(
    combination: Coupon[]
  ): CouponCombinationState {
    const key = combination
      .map((c) => c.id)
      .sort()
      .join(",");
    const cached = memo.get(key);
    if (cached) return cached;

    const result = calculateCouponDiscount(
      combination,
      totalCartPrice,
      shippingFee,
      selectedCartItems
    );

    const state: CouponCombinationState = {
      selectedCoupons: combination,
      totalDiscount: result.totalDiscount,
      finalShippingFee: result.finalShippingFee,
      hasFreeShipping: result.hasFreeShipping,
      finalDiscount: result.finalDiscount,
      remainingCoupons: [],
    };

    memo.set(key, state);
    return state;
  }

  return couponCombinations.reduce(
    (bestResult, combination) => {
      try {
        const currentResult = calculateBestCombination(combination);
        return currentResult.finalDiscount > bestResult.finalDiscount
          ? {
            selectedCoupons: currentResult.selectedCoupons,
            totalDiscount: currentResult.totalDiscount,
            finalShippingFee: currentResult.finalShippingFee,
            hasFreeShipping: currentResult.hasFreeShipping,
            finalDiscount: currentResult.finalDiscount,
          }
          : bestResult;
      } catch (error) {
        console.error("combination 도중 오류:", error);
        return bestResult;
      }
    },
    {
      selectedCoupons: [],
      totalDiscount: 0,
      finalShippingFee: shippingFee,
      hasFreeShipping: false,
      finalDiscount: 0,
    } as OptimizedCouponResult
  );
}

export function optimizeCouponSelection(
  coupons: Coupon[],
  totalCartPrice: number,
  shippingFee: number,
  selectedCartItems: Cart[] | undefined,
  maxCombinations: number = 2
): OptimizedCouponResult {
  try {
    // 1. 사용 가능한 쿠폰 필터링
    const availableCoupons = getAvailableCoupons(
      coupons,
      totalCartPrice,
      selectedCartItems
    );

    // 2. 쿠폰 우선순위 정렬
    const sortedCoupons = sortCouponsByPriority(availableCoupons);

    // 3. 가능한 모든 쿠폰 조합 생성
    const combinations = generateCouponCombinations(
      sortedCoupons,
      maxCombinations
    );

    // 4. 최적의 조합 탐색
    return findBestCouponCombination(
      combinations,
      totalCartPrice,
      shippingFee,
      selectedCartItems
    );
  } catch (error) {
    console.error("coupon optimization 도중 오류:", error);
    return {
      selectedCoupons: [],
      totalDiscount: 0,
      finalShippingFee: shippingFee,
      hasFreeShipping: false,
      finalDiscount: 0,
    };
  }
}
