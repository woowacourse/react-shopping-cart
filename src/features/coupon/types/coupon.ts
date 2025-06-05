export interface Coupon {
  code: string;
  description: string;
  discount?: number;
  discountType: string;
  expirationDate: string;
  id: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
}
