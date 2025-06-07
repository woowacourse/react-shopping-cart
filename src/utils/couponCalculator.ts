import { Coupon } from "../api/couponApi";
import { ResponseCartItem } from "../types/types";

export interface CouponCalculationResult {
  totalDiscount: number;
  deliveryDiscount: number;
  appliedCoupons: Coupon[];
  finalOrderAmount: number;
  finalDeliveryFee: number;
}

export interface OrderInfo {
  cartItems: ResponseCartItem[];
  originalOrderAmount: number;
  originalDeliveryFee: number;
  isRemoteArea: boolean;
}

export const isTimeInRange = (availableTime?: {
  start: string;
  end: string;
}): boolean => {
  if (!availableTime) return true;

  const now = new Date();
  const currentHour = now.getHours();

  const startHour = parseInt(availableTime.start.split(":")[0]);
  const endHour = parseInt(availableTime.end.split(":")[0]);

  return currentHour >= startHour && currentHour < endHour;
};

export const calculateSingleCouponDiscount = (
  coupon: Coupon,
  orderInfo: OrderInfo,
  alreadyAppliedCoupons: Coupon[] = []
): number => {
  const { cartItems, originalOrderAmount, isRemoteArea } = orderInfo;

  switch (coupon.discountType) {
    case "fixed":
      if (coupon.minimumAmount && originalOrderAmount < coupon.minimumAmount) {
        return 0;
      }
      return coupon.discount || 0;

    case "percentage":
      if (!isTimeInRange(coupon.availableTime)) {
        return 0;
      }
      return Math.floor(originalOrderAmount * ((coupon.discount || 0) / 100));

    case "buyXgetY":
      return calculateBogoDiscount(cartItems, coupon);

    case "freeShipping": {
      if (coupon.minimumAmount && originalOrderAmount < coupon.minimumAmount) {
        return 0;
      }
      if (
        alreadyAppliedCoupons.some((c) => c.discountType === "freeShipping")
      ) {
        return 0;
      }
      const baseDeliveryFee = originalOrderAmount >= 100000 ? 0 : 3000;
      const remoteAreaFee = isRemoteArea ? 3000 : 0;
      return baseDeliveryFee + remoteAreaFee;
    }

    default:
      return 0;
  }
};

const calculateBogoDiscount = (
  cartItems: ResponseCartItem[],
  coupon: Coupon
): number => {
  const buyQuantity = coupon.buyQuantity || 2;
  const getQuantity = coupon.getQuantity || 1;

  let totalDiscount = 0;

  cartItems.forEach((item) => {
    if (item.quantity >= buyQuantity) {
      const benefitCount = Math.floor(item.quantity / buyQuantity);
      totalDiscount += item.product.price * getQuantity * benefitCount;
    }
  });

  return totalDiscount;
};

export const calculateDeliveryFee = (
  originalOrderAmount: number,
  isRemoteArea: boolean,
  appliedCoupons: Coupon[]
): number => {
  const hasFreeShippingCoupon = appliedCoupons.some(
    (coupon) => coupon.discountType === "freeShipping"
  );

  if (hasFreeShippingCoupon) {
    return 0;
  }

  const baseDeliveryFee = originalOrderAmount >= 100000 ? 0 : 3000;
  const remoteAreaFee = isRemoteArea ? 3000 : 0;

  return baseDeliveryFee + remoteAreaFee;
};

export const findOptimalCouponCombination = (
  availableCoupons: Coupon[],
  orderInfo: OrderInfo
): CouponCalculationResult => {
  let bestResult: CouponCalculationResult = {
    totalDiscount: 0,
    deliveryDiscount: 0,
    appliedCoupons: [],
    finalOrderAmount: orderInfo.originalOrderAmount,
    finalDeliveryFee: calculateDeliveryFee(
      orderInfo.originalOrderAmount,
      orderInfo.isRemoteArea,
      []
    ),
  };

  for (const coupon of availableCoupons) {
    const result = calculateCouponResult([coupon], orderInfo);
    if (getTotalBenefit(result) > getTotalBenefit(bestResult)) {
      bestResult = result;
    }
  }

  for (let i = 0; i < availableCoupons.length; i++) {
    for (let j = i + 1; j < availableCoupons.length; j++) {
      const result = calculateCouponResult(
        [availableCoupons[i], availableCoupons[j]],
        orderInfo
      );
      if (getTotalBenefit(result) > getTotalBenefit(bestResult)) {
        bestResult = result;
      }
    }
  }

  return bestResult;
};

const calculateCouponResult = (
  coupons: Coupon[],
  orderInfo: OrderInfo
): CouponCalculationResult => {
  let orderDiscount = 0;
  let deliveryDiscount = 0;
  const appliedCoupons: Coupon[] = [];

  for (const coupon of coupons) {
    const discount = calculateSingleCouponDiscount(
      coupon,
      orderInfo,
      appliedCoupons
    );

    if (discount > 0) {
      if (coupon.discountType === "freeShipping") {
        deliveryDiscount += discount;
      } else {
        orderDiscount += discount;
      }
      appliedCoupons.push(coupon);
    }
  }

  const finalOrderAmount = Math.max(
    0,
    orderInfo.originalOrderAmount - orderDiscount
  );
  const finalDeliveryFee = calculateDeliveryFee(
    orderInfo.originalOrderAmount,
    orderInfo.isRemoteArea,
    appliedCoupons
  );

  return {
    totalDiscount: orderDiscount,
    deliveryDiscount,
    appliedCoupons,
    finalOrderAmount,
    finalDeliveryFee,
  };
};

const getTotalBenefit = (result: CouponCalculationResult): number => {
  return result.totalDiscount + result.deliveryDiscount;
};

export const calculateSelectedCouponsDiscount = (
  selectedCoupons: Coupon[],
  orderInfo: OrderInfo
): CouponCalculationResult => {
  return calculateCouponResult(selectedCoupons, orderInfo);
};
