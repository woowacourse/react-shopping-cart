type CouponCodeType = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';
type AvailableTime = {
  start: string;
  end: string;
};

export interface CouponBaseType {
  id: number;
  code: CouponCodeType;
  description: string;
  expirationDate: Date;
}

export interface FIXEDCouponType extends CouponBaseType {
  discountType: 'fixed';
  discount: number;
  minimumAmount: number;
}
export interface BOGOCouponType extends CouponBaseType {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}
export interface FreeShippingCouponType extends CouponBaseType {
  discountType: 'freeShipping';
  minimumAmount: number;
}
export interface MiracleCouponType extends CouponBaseType {
  discountType: 'percentage';
  discount: number;
  availableTime: AvailableTime;
}

export type CouponType =
  | FIXEDCouponType
  | BOGOCouponType
  | FreeShippingCouponType
  | MiracleCouponType;
