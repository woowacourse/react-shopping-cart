export type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';

export type AvailableType = {
  start: string;
  end: string;
};
export interface CouponType {
  code: string;
  description: string;
  discount?: number;
  discountType: DiscountType;
  expirationDate: string;
  id: number;
  minimumAmount?: number;
  availableTime?: AvailableType;
  buyQuantity?: number;
  getQuantity?: number;
}
