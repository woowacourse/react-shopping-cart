import { FEE } from '../constants/systemConstants';
import { Coupon, FreeShippingCoupon } from '../types/coupon';

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

export interface CalculationResult {
  originalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  appliedCoupons: Coupon[];
  discountBreakdown: Array<{
    coupon: Coupon;
    discountAmount: number;
  }>;
}

// 시간 유틸리티 함수들
const parseTimeString = (timeString: string): number => {
  return parseInt(timeString.replace(':', ''));
};

const getCurrentTimeAsNumber = (): number => {
  const now = new Date();
  return now.getHours() * 100 + now.getMinutes();
};

const isCurrentTimeInRange = (
  startTime: number,
  endTime: number,
  currentTime: number
): boolean => {
  return isCrossingMidnight(startTime, endTime)
    ? isTimeInCrossingMidnightRange(startTime, endTime, currentTime)
    : isTimeInNormalRange(startTime, endTime, currentTime);
};

const isCrossingMidnight = (startTime: number, endTime: number): boolean => {
  return startTime > endTime;
};

//  22:00 ~ 04:00
const isTimeInCrossingMidnightRange = (
  startTime: number,
  endTime: number,
  currentTime: number
): boolean => {
  return currentTime >= startTime || currentTime <= endTime;
};

const isTimeInNormalRange = (
  startTime: number,
  endTime: number,
  currentTime: number
): boolean => {
  return currentTime >= startTime && currentTime <= endTime;
};

// 시간대 체크 함수
const isTimeInRange = (availableTime: {
  start: string;
  end: string;
}): boolean => {
  const currentTime = getCurrentTimeAsNumber();
  const startTime = parseTimeString(availableTime.start);
  const endTime = parseTimeString(availableTime.end);

  return isCurrentTimeInRange(startTime, endTime, currentTime);
};

// 단일 쿠폰 적용 함수
const applySingleCoupon = (
  amount: number,
  coupon: Coupon,
  cartItems: CartItem[]
): number => {
  switch (coupon.discountType) {
    case 'fixed': {
      if (amount >= coupon.minimumAmount) {
        return Math.min(coupon.discount, amount);
      }
      return 0;
    }

    case 'percentage': {
      if (coupon.availableTime && !isTimeInRange(coupon.availableTime)) {
        return 0;
      }

      const discountAmount = Math.floor(amount * (coupon.discount / 100));
      return discountAmount;
    }

    case 'buyXgetY': {
      // 간단화: 가장 비싼 상품에 대해 적용
      const sortedItems = [...cartItems].sort((a, b) => b.price - a.price);
      const applicableItem = sortedItems[0];
      if (!applicableItem) return 0;

      const eligibleSets = Math.floor(
        applicableItem.quantity / coupon.buyQuantity
      );
      const freeItems = eligibleSets * coupon.getQuantity;
      return freeItems * applicableItem.price;
    }

    case 'freeShipping': {
      return 0;
    }

    default:
      return 0;
  }
};

// 두 쿠폰 조합 적용 함수
const applyTwoCoupons = (
  originalAmount: number,
  coupon1: Coupon,
  coupon2: Coupon,
  cartItems: CartItem[]
): {
  discountAmount: number;
  breakdown: Array<{ coupon: Coupon; discountAmount: number }>;
} => {
  // 순서1: coupon1 먼저, coupon2 나중에
  const discount1 = applySingleCoupon(originalAmount, coupon1, cartItems);
  const remainingAmount1 = originalAmount - discount1;
  const discount2_afterFirst = applySingleCoupon(
    remainingAmount1,
    coupon2,
    cartItems
  );
  const totalDiscount1 = discount1 + discount2_afterFirst;

  // 순서2: coupon2 먼저, coupon1 나중에
  const discount2 = applySingleCoupon(originalAmount, coupon2, cartItems);
  const remainingAmount2 = originalAmount - discount2;
  const discount1_afterSecond = applySingleCoupon(
    remainingAmount2,
    coupon1,
    cartItems
  );
  const totalDiscount2 = discount2 + discount1_afterSecond;

  // 더 할인이 큰 조합 선택
  if (totalDiscount1 >= totalDiscount2) {
    return {
      discountAmount: totalDiscount1,
      breakdown: [
        { coupon: coupon1, discountAmount: discount1 },
        { coupon: coupon2, discountAmount: discount2_afterFirst },
      ].filter((item) => item.discountAmount > 0),
    };
  } else {
    return {
      discountAmount: totalDiscount2,
      breakdown: [
        { coupon: coupon2, discountAmount: discount2 },
        { coupon: coupon1, discountAmount: discount1_afterSecond },
      ].filter((item) => item.discountAmount > 0),
    };
  }
};

const calculateShippingFee = (
  originalAmount: number,
  appliedCoupons: Coupon[],
  isRemoteArea: boolean
): number => {
  const hasFreeShippingCoupon = appliedCoupons.some(
    (coupon) =>
      coupon.discountType === 'freeShipping' &&
      originalAmount >= (coupon as FreeShippingCoupon).minimumAmount
  );

  // FREESHIPPING 쿠폰이 있으면 모든 배송비 무료
  if (hasFreeShippingCoupon) {
    return 0;
  }

  // 주문 금액 100,000원 이상이면 기본 배송비 무료
  let shippingFee =
    originalAmount >= FEE.DELIVERY_FEE_STANDARD
      ? FEE.DELIVERY_FEE_FREE
      : FEE.DELIVERY_FEE;

  // 도서 산간 지역 추가 배송비
  if (isRemoteArea) {
    shippingFee += FEE.DELIVERY_FEE;
  }

  return shippingFee;
};

const createInitialBestResult = (
  originalAmount: number,
  isRemoteArea: boolean
): CalculationResult => {
  const shippingFee = calculateShippingFee(originalAmount, [], isRemoteArea);
  return {
    originalAmount,
    discountAmount: 0,
    shippingFee,
    finalAmount: originalAmount + shippingFee,
    appliedCoupons: [],
    discountBreakdown: [],
  };
};

const evaluateSingleCoupon = (
  originalAmount: number,
  coupon: Coupon,
  cartItems: CartItem[],
  isRemoteArea: boolean
): CalculationResult => {
  const discountAmount = applySingleCoupon(originalAmount, coupon, cartItems);
  const appliedCoupons = discountAmount > 0 ? [coupon] : [];
  const shippingFee = calculateShippingFee(
    originalAmount,
    appliedCoupons,
    isRemoteArea
  );
  const finalAmount = originalAmount - discountAmount + shippingFee;

  return {
    originalAmount,
    discountAmount,
    shippingFee,
    finalAmount,
    appliedCoupons,
    discountBreakdown: discountAmount > 0 ? [{ coupon, discountAmount }] : [],
  };
};

const evaluateTwoCoupons = (
  originalAmount: number,
  coupon1: Coupon,
  coupon2: Coupon,
  cartItems: CartItem[],
  isRemoteArea: boolean
): CalculationResult => {
  const { discountAmount, breakdown } = applyTwoCoupons(
    originalAmount,
    coupon1,
    coupon2,
    cartItems
  );

  const appliedCoupons = breakdown.map((item) => item.coupon);
  const shippingFee = calculateShippingFee(
    originalAmount,
    appliedCoupons,
    isRemoteArea
  );
  const finalAmount = originalAmount - discountAmount + shippingFee;

  return {
    originalAmount,
    discountAmount,
    shippingFee,
    finalAmount,
    appliedCoupons,
    discountBreakdown: breakdown,
  };
};

const isBetterResult = (
  candidate: CalculationResult,
  current: CalculationResult
): boolean => {
  return candidate.finalAmount < current.finalAmount;
};

export const calculateOptimalCouponCombination = (
  cartItems: CartItem[],
  availableCoupons: Coupon[],
  isRemoteArea: boolean = false
): CalculationResult => {
  const originalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let bestResult = createInitialBestResult(originalAmount, isRemoteArea);

  // 단일 쿠폰 최적화
  for (const coupon of availableCoupons) {
    const singleCouponResult = evaluateSingleCoupon(
      originalAmount,
      coupon,
      cartItems,
      isRemoteArea
    );

    if (isBetterResult(singleCouponResult, bestResult)) {
      bestResult = singleCouponResult;
    }
  }

  // 두 쿠폰 조합 최적화
  for (let i = 0; i < availableCoupons.length; i++) {
    for (let j = i + 1; j < availableCoupons.length; j++) {
      const twoCouponsResult = evaluateTwoCoupons(
        originalAmount,
        availableCoupons[i],
        availableCoupons[j],
        cartItems,
        isRemoteArea
      );

      if (isBetterResult(twoCouponsResult, bestResult)) {
        bestResult = twoCouponsResult;
      }
    }
  }

  return bestResult;
};

export const calculateSelectedCoupons = (
  cartItems: CartItem[],
  selectedCoupons: Coupon[],
  isRemoteArea: boolean = false
): CalculationResult => {
  const originalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (selectedCoupons.length === 0) {
    const shippingFee = calculateShippingFee(originalAmount, [], isRemoteArea);
    return {
      originalAmount,
      discountAmount: 0,
      shippingFee,
      finalAmount: originalAmount + shippingFee,
      appliedCoupons: [],
      discountBreakdown: [],
    };
  }

  let totalDiscountAmount = 0;
  const discountBreakdown: Array<{ coupon: Coupon; discountAmount: number }> =
    [];
  let currentAmount = originalAmount;

  for (const coupon of selectedCoupons) {
    const discountAmount = applySingleCoupon(currentAmount, coupon, cartItems);

    if (discountAmount > 0) {
      totalDiscountAmount += discountAmount;
      currentAmount -= discountAmount;
      discountBreakdown.push({ coupon, discountAmount });
    }

    if (coupon.discountType === 'freeShipping') {
      discountBreakdown.push({ coupon, discountAmount: 0 });
    }
  }

  const shippingFee = calculateShippingFee(
    originalAmount,
    selectedCoupons,
    isRemoteArea
  );

  const result = {
    originalAmount,
    discountAmount: totalDiscountAmount,
    shippingFee,
    finalAmount: originalAmount - totalDiscountAmount + shippingFee,
    appliedCoupons: selectedCoupons,
    discountBreakdown,
  };

  return result;
};
