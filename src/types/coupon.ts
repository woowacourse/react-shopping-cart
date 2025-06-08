export interface Coupon {
  id?: string;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  discount?: number;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  buyQuantity?: number;
  getQuantity?: number;
}

export interface CouponCalculationResult {
  totalDiscount: number;
  deliveryDiscount: number;
  appliedCoupons: Coupon[];
  finalOrderAmount: number;
  finalDeliveryFee: number;
}
