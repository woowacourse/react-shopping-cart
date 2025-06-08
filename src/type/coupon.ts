export type CouponType = {
  id: number;
  code: CouponCode;
  description: string;
  expirationDate: string;
  discount: number;
  minimumAmount: number;
  discountType: string;
  availableTime: {
    start: string;
    end: string;
  };
};

export type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';
