export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount: number;

  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export interface AvailableCoupon extends Coupon {
  isExpired: boolean;
}
