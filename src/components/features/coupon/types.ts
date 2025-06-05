type CouponCodeType = 'FIXED' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

interface CouponBaseType {
  id: number;
  code: CouponCodeType;
  description: string;
  expirationDate: Date;
  discountType: string;
}

export interface FIXEDCouponType extends CouponBaseType {
  discount: number;
  minimumAmount: number;
}
export interface BOGOCouponType extends CouponBaseType {
  buyQuantity: number;
  getQuantity: number;
}
export interface FreeShippingCouponType extends CouponBaseType {
  minimumAmount: number;
}
export interface MiracleCouponType extends CouponBaseType {
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponType =
  | FIXEDCouponType
  | BOGOCouponType
  | FreeShippingCouponType
  | MiracleCouponType;
