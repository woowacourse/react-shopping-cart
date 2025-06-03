export type GetAllCouponsResponse = Coupon[];

export type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
} & CouponDetail;

type CouponDetail = Fixed5000Coupon | BuyXGetYCoupon | FreeShippingCoupon | MiracleSaleCoupon;

type Fixed5000Coupon = {
  code: "FIXED5000";
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
};

type BuyXGetYCoupon = {
  code: "BOGO";
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
};

type FreeShippingCoupon = {
  code: "FREESHIPPING";
  discountType: "freeShipping";
  minimumAmount: number;
};

type MiracleSaleCoupon = {
  code: "MIRACLESALE";
  discountType: "percentage";
  availableTime: {
    start: string;
    end: string;
  };
  discount: number;
};
