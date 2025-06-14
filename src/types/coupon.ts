export interface Coupon {
  id: string;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount?: number;
  minimumAmount?: number;
  butQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
