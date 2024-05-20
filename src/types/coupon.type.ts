export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount: number;
  minimumAmount: number;
  discountType: string;
}
