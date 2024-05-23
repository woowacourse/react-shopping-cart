export interface Coupon {
  id: number;
  description: string;
  code: string;
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
