export type CodeType = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

export type CouponResponse = {
  id: number;
  code: CodeType;
  description: string;
  expirationDate: string;
  discountType: string;
  discount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
};
