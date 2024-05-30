export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  expirationDate: string;
}

export interface CouponDetailState {
  isChecked: boolean;
}
