export type CouponType = {
  id: number;
  code: string;
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
