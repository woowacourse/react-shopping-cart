import { ResponseCartItem } from "../types/types";
import { Coupon } from "../api/couponApi";
import {
  calculateSelectedCouponsDiscount,
  OrderInfo,
  CouponCalculationResult,
} from "./couponCalculator";

const FREE_DELIVERY_THRESHOLD = 100000;
const BASE_DELIVERY_FEE = 3000;
const REMOTE_AREA_FEE = 3000;

export const calculateOrderAmount = (cartItems: ResponseCartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const calculateItemCounts = (cartItems: ResponseCartItem[]) => {
  return {
    totalCount: cartItems.reduce((count, cart) => count + cart.quantity, 0),
    itemTypeCount: cartItems.length,
  };
};

export const calculateBaseDeliveryFee = (
  orderAmount: number,
  isRemoteArea: boolean = false
): number => {
  if (orderAmount >= FREE_DELIVERY_THRESHOLD || orderAmount === 0) {
    return isRemoteArea ? REMOTE_AREA_FEE : 0;
  }
  return BASE_DELIVERY_FEE + (isRemoteArea ? REMOTE_AREA_FEE : 0);
};

export interface OrderSummary {
  totalCount: number;
  itemTypeCount: number;
  summaryText: string;
}

export interface PriceInfo {
  orderPrice: number;
  deliveryPrice: number;
  couponDiscount: number;
  totalPrice: number;
}

export interface OrderBreakdown {
  orderAmount: number;
  deliveryFee: number;
  couponDiscount: number;
  totalPrice: number;
  orderSummary: OrderSummary;
}

export const calculateOrderSummary = (
  cartItems: ResponseCartItem[]
): OrderSummary => {
  const { totalCount, itemTypeCount } = calculateItemCounts(cartItems);

  return {
    totalCount,
    itemTypeCount,
    summaryText: `총 ${itemTypeCount}종류의 상품 ${totalCount}개`,
  };
};

export const calculatePriceInfo = (
  orderPrice: number,
  deliveryPrice: number,
  couponDiscount: number = 0
): PriceInfo => {
  return {
    orderPrice,
    deliveryPrice,
    couponDiscount,
    totalPrice: orderPrice + deliveryPrice - couponDiscount,
  };
};

export const calculateOrderBreakdown = (
  cartItems: ResponseCartItem[],
  isRemoteArea: boolean = false,
  couponDiscount: number = 0
): OrderBreakdown => {
  const orderAmount = calculateOrderAmount(cartItems);
  const deliveryFee = calculateBaseDeliveryFee(orderAmount, isRemoteArea);
  const totalPrice = orderAmount + deliveryFee - couponDiscount;
  const orderSummary = calculateOrderSummary(cartItems);

  return {
    orderAmount,
    deliveryFee,
    couponDiscount,
    totalPrice,
    orderSummary,
  };
};

export const calculateOrderBreakdownWithCoupons = (
  cartItems: ResponseCartItem[],
  isRemoteArea: boolean,
  appliedCoupons: Coupon[] = []
): OrderBreakdown => {
  const orderAmount = calculateOrderAmount(cartItems);
  const baseDeliveryFee = calculateBaseDeliveryFee(orderAmount, isRemoteArea);

  const orderInfo: OrderInfo = {
    cartItems,
    originalOrderAmount: orderAmount,
    originalDeliveryFee: baseDeliveryFee,
    isRemoteArea,
  };

  const couponResult: CouponCalculationResult =
    calculateSelectedCouponsDiscount(appliedCoupons, orderInfo);

  const orderSummary = calculateOrderSummary(cartItems);

  return {
    orderAmount: couponResult.finalOrderAmount,
    deliveryFee: couponResult.finalDeliveryFee,
    couponDiscount: couponResult.totalDiscount,
    totalPrice: couponResult.finalOrderAmount + couponResult.finalDeliveryFee,
    orderSummary,
  };
};

export const convertCouponResultToOrderBreakdown = (
  cartItems: ResponseCartItem[],
  couponResult: CouponCalculationResult
): OrderBreakdown => {
  const orderSummary = calculateOrderSummary(cartItems);

  return {
    orderAmount: couponResult.finalOrderAmount,
    deliveryFee: couponResult.finalDeliveryFee,
    couponDiscount: couponResult.totalDiscount,
    totalPrice: couponResult.finalOrderAmount + couponResult.finalDeliveryFee,
    orderSummary,
  };
};

export const calculateTotalPrice = calculateOrderAmount;
export const calculateShippingFee = (totalPrice: number) =>
  calculateBaseDeliveryFee(totalPrice, false);
export const calculateDeliveryPrice = calculateBaseDeliveryFee;
