import { Coupon, CouponCalculationResult } from "../types/coupon";
import { OrderInfo, ResponseCartItem } from "../types/order";
import { ORDER_CONSTANTS } from "../constants/order";

export class CouponCalculator {
  /**
   * 시간 범위 내에 있는지 확인합니다.
   */
  private static isTimeInRange(availableTime?: {
    start: string;
    end: string;
  }): boolean {
    if (!availableTime) return true;

    const now = new Date();
    const currentHour = now.getHours();

    const startHour = parseInt(availableTime.start.split(":")[0]);
    const endHour = parseInt(availableTime.end.split(":")[0]);

    return currentHour >= startHour && currentHour < endHour;
  }

  /**
   * BOGO (Buy X Get Y) 할인을 계산합니다.
   */
  private static calculateBogoDiscount(
    cartItems: ResponseCartItem[],
    coupon: Coupon
  ): number {
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
  }

  /**
   * 단일 쿠폰의 할인 금액을 계산합니다.
   */
  static calculateSingleCouponDiscount(
    coupon: Coupon,
    orderInfo: OrderInfo,
    alreadyAppliedCoupons: Coupon[] = []
  ): number {
    const { cartItems, originalOrderAmount, isRemoteArea } = orderInfo;

    switch (coupon.discountType) {
      case "fixed":
        if (
          coupon.minimumAmount &&
          originalOrderAmount < coupon.minimumAmount
        ) {
          return 0;
        }
        return coupon.discount || 0;

      case "percentage":
        if (!this.isTimeInRange(coupon.availableTime)) {
          return 0;
        }
        return Math.floor(originalOrderAmount * ((coupon.discount || 0) / 100));

      case "buyXgetY":
        return this.calculateBogoDiscount(cartItems, coupon);

      case "freeShipping": {
        if (
          coupon.minimumAmount &&
          originalOrderAmount < coupon.minimumAmount
        ) {
          return 0;
        }

        if (
          alreadyAppliedCoupons.some((c) => c.discountType === "freeShipping")
        ) {
          return 0;
        }

        const baseDeliveryFee =
          originalOrderAmount >= ORDER_CONSTANTS.FREE_DELIVERY_THRESHOLD
            ? 0
            : ORDER_CONSTANTS.BASE_DELIVERY_FEE;
        const remoteAreaFee = isRemoteArea
          ? ORDER_CONSTANTS.REMOTE_AREA_FEE
          : 0;

        return baseDeliveryFee + remoteAreaFee;
      }

      default:
        return 0;
    }
  }

  /**
   * 쿠폰이 적용된 후의 배송비를 계산합니다.
   */
  static calculateDeliveryFeeWithCoupons(
    originalOrderAmount: number,
    isRemoteArea: boolean,
    appliedCoupons: Coupon[]
  ): number {
    const hasFreeShippingCoupon = appliedCoupons.some(
      (coupon) => coupon.discountType === "freeShipping"
    );

    if (hasFreeShippingCoupon) {
      return 0;
    }

    const baseDeliveryFee =
      originalOrderAmount >= ORDER_CONSTANTS.FREE_DELIVERY_THRESHOLD
        ? 0
        : ORDER_CONSTANTS.BASE_DELIVERY_FEE;
    const remoteAreaFee = isRemoteArea ? ORDER_CONSTANTS.REMOTE_AREA_FEE : 0;

    return baseDeliveryFee + remoteAreaFee;
  }

  /**
   * 선택된 쿠폰들의 할인 결과를 계산합니다.
   */
  static calculateSelectedCouponsDiscount(
    selectedCoupons: Coupon[],
    orderInfo: OrderInfo
  ): CouponCalculationResult {
    let orderDiscount = 0;
    let deliveryDiscount = 0;
    const appliedCoupons: Coupon[] = [];

    for (const coupon of selectedCoupons) {
      const discount = this.calculateSingleCouponDiscount(
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
    const finalDeliveryFee = this.calculateDeliveryFeeWithCoupons(
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
  }

  /**
   * 최적의 쿠폰 조합을 찾습니다.
   */
  static findOptimalCouponCombination(
    availableCoupons: Coupon[],
    orderInfo: OrderInfo
  ): CouponCalculationResult {
    let bestResult: CouponCalculationResult = {
      totalDiscount: 0,
      deliveryDiscount: 0,
      appliedCoupons: [],
      finalOrderAmount: orderInfo.originalOrderAmount,
      finalDeliveryFee: this.calculateDeliveryFeeWithCoupons(
        orderInfo.originalOrderAmount,
        orderInfo.isRemoteArea,
        []
      ),
    };

    for (const coupon of availableCoupons) {
      const result = this.calculateSelectedCouponsDiscount([coupon], orderInfo);
      if (this.getTotalBenefit(result) > this.getTotalBenefit(bestResult)) {
        bestResult = result;
      }
    }

    for (let i = 0; i < availableCoupons.length; i++) {
      for (let j = i + 1; j < availableCoupons.length; j++) {
        const result = this.calculateSelectedCouponsDiscount(
          [availableCoupons[i], availableCoupons[j]],
          orderInfo
        );
        if (this.getTotalBenefit(result) > this.getTotalBenefit(bestResult)) {
          bestResult = result;
        }
      }
    }

    return bestResult;
  }

  /**
   * 쿠폰 결과의 총 혜택을 계산합니다.
   */
  private static getTotalBenefit(result: CouponCalculationResult): number {
    return result.totalDiscount + result.deliveryDiscount;
  }
}
