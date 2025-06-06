export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount: number;
  minimumAmount: number;
}
