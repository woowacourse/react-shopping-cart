export interface Coupon {
  id: string;
  name: string;
  minimumOrderAmount?: number;
  discountAmount?: number;
  discountRate?: number;
  description?: string;
  expirationDate: string;
}
