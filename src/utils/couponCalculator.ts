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

const SHIPPING_POLICIES = {
  FREE_SHIPPING_THRESHOLD: 100000, // 무료 배송 기준 금액
  BASIC_SHIPPING_FEE: 0, // 기본 배송비 (무료)
  REMOTE_AREA_FEE: 3000, // 도서 산간 추가 배송비
};

// 시간대 체크 함수
const isTimeInRange = (availableTime: {
  start: string;
  end: string;
}): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  const startTime = parseInt(availableTime.start.replace(':', ''));
  const endTime = parseInt(availableTime.end.replace(':', ''));

  return currentTime >= startTime && currentTime <= endTime;
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
      return Math.floor(amount * (coupon.discount / 100));
    }

    case 'buyXgetY': {
      // 간단화: 가장 비싼 상품에 대해 적용
      const sortedItems = cartItems.sort((a, b) => b.price - a.price);
      const applicableItem = sortedItems[0];
      if (!applicableItem) return 0;

      const eligibleSets = Math.floor(
        applicableItem.quantity / coupon.buyQuantity
      );
      const freeItems = eligibleSets * coupon.getQuantity;
      return freeItems * applicableItem.price;
    }

    case 'freeShipping': {
      // 배송비 쿠폰은 여기서는 0을 반환 (배송비 계산에서 처리)
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
    originalAmount >= SHIPPING_POLICIES.FREE_SHIPPING_THRESHOLD
      ? SHIPPING_POLICIES.BASIC_SHIPPING_FEE
      : SHIPPING_POLICIES.BASIC_SHIPPING_FEE;

  // 도서 산간 지역 추가 배송비
  if (isRemoteArea) {
    shippingFee += SHIPPING_POLICIES.REMOTE_AREA_FEE;
  }

  return shippingFee;
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

  let bestResult: CalculationResult = {
    originalAmount,
    discountAmount: 0,
    shippingFee: calculateShippingFee(originalAmount, [], isRemoteArea),
    finalAmount:
      originalAmount + calculateShippingFee(originalAmount, [], isRemoteArea),
    appliedCoupons: [],
    discountBreakdown: [],
  };

  // 단일 쿠폰 적용 테스트
  for (const coupon of availableCoupons) {
    const discountAmount = applySingleCoupon(originalAmount, coupon, cartItems);
    const appliedCoupons = discountAmount > 0 ? [coupon] : [];
    const shippingFee = calculateShippingFee(
      originalAmount,
      appliedCoupons,
      isRemoteArea
    );
    const finalAmount = originalAmount - discountAmount + shippingFee;

    if (finalAmount < bestResult.finalAmount) {
      bestResult = {
        originalAmount,
        discountAmount,
        shippingFee,
        finalAmount,
        appliedCoupons,
        discountBreakdown:
          discountAmount > 0 ? [{ coupon, discountAmount }] : [],
      };
    }
  }

  // 두 쿠폰 조합 테스트
  for (let i = 0; i < availableCoupons.length; i++) {
    for (let j = i + 1; j < availableCoupons.length; j++) {
      const coupon1 = availableCoupons[i];
      const coupon2 = availableCoupons[j];

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

      if (finalAmount < bestResult.finalAmount) {
        bestResult = {
          originalAmount,
          discountAmount,
          shippingFee,
          finalAmount,
          appliedCoupons,
          discountBreakdown: breakdown,
        };
      }
    }
  }

  return bestResult;
};
