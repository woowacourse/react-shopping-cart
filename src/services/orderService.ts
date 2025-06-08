import { ResponseCartItem, OrderInfo, OrderBreakdown } from "../types/order";
import { Coupon, CouponCalculationResult } from "../types/coupon";
import { OrderCalculator } from "../utils/orderCalculator";
import { CouponCalculator } from "../utils/couponCalculator";

export class OrderService {
  /**
   * 쿠폰 없이 기본 주문 정보를 계산합니다.
   */
  static calculateBasicOrderBreakdown(
    cartItems: ResponseCartItem[],
    isRemoteArea: boolean = false
  ): OrderBreakdown {
    const orderAmount = OrderCalculator.calculateOrderAmount(cartItems);
    const deliveryFee = OrderCalculator.calculateBaseDeliveryFee(
      orderAmount,
      isRemoteArea
    );
    const orderSummary = OrderCalculator.calculateOrderSummary(cartItems);

    return {
      orderAmount,
      deliveryFee,
      couponDiscount: 0,
      totalPrice: orderAmount + deliveryFee,
      orderSummary,
    };
  }

  /**
   * 쿠폰이 적용된 주문 정보를 계산합니다.
   */
  static calculateOrderBreakdownWithCoupons(
    cartItems: ResponseCartItem[],
    isRemoteArea: boolean,
    appliedCoupons: Coupon[] = []
  ): OrderBreakdown {
    const orderAmount = OrderCalculator.calculateOrderAmount(cartItems);
    const baseDeliveryFee = OrderCalculator.calculateBaseDeliveryFee(
      orderAmount,
      isRemoteArea
    );

    const orderInfo: OrderInfo = {
      cartItems,
      originalOrderAmount: orderAmount,
      originalDeliveryFee: baseDeliveryFee,
      isRemoteArea,
    };

    const couponResult = CouponCalculator.calculateSelectedCouponsDiscount(
      appliedCoupons,
      orderInfo
    );

    return this.convertCouponResultToOrderBreakdown(cartItems, couponResult);
  }

  /**
   * 쿠폰 계산 결과를 주문 정보로 변환합니다.
   */
  static convertCouponResultToOrderBreakdown(
    cartItems: ResponseCartItem[],
    couponResult: CouponCalculationResult
  ): OrderBreakdown {
    const orderSummary = OrderCalculator.calculateOrderSummary(cartItems);

    return {
      orderAmount: couponResult.finalOrderAmount,
      deliveryFee: couponResult.finalDeliveryFee,
      couponDiscount: couponResult.totalDiscount,
      totalPrice: couponResult.finalOrderAmount + couponResult.finalDeliveryFee,
      orderSummary,
    };
  }

  /**
   * OrderInfo 객체를 생성합니다.
   */
  static createOrderInfo(
    cartItems: ResponseCartItem[],
    isRemoteArea: boolean
  ): OrderInfo {
    const originalOrderAmount = OrderCalculator.calculateOrderAmount(cartItems);
    const originalDeliveryFee = OrderCalculator.calculateBaseDeliveryFee(
      originalOrderAmount,
      isRemoteArea
    );

    return {
      cartItems,
      originalOrderAmount,
      originalDeliveryFee,
      isRemoteArea,
    };
  }
}
