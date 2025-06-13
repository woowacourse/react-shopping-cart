export type Coupon = {
  id: number;
  code: 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';
  description: string;
  expirationDate: string;
  discount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: string;
};
