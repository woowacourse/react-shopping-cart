export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export interface CouponCalculationResult {
  totalDiscount: number;
  deliveryDiscount: number;
  appliedCoupons: Coupon[];
  finalOrderAmount: number;
  finalDeliveryFee: number;
}
