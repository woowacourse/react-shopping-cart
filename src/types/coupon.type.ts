type discountType = 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  minimumAmount?: number;
  discountType: discountType;
}
