export type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';

type TimeString = `${number}:${number}:${number}`;

export type AvailableTime = {
  start: TimeString;
  end: TimeString;
};

/**
 * 쿠폰 체크 상태를 관리하는 객체입니다.
 * 실제 서버 요청 시에는 couponKeyToCode를 통해 변환합니다.
 */
export type CouponKey =
  | 'discount5000'
  | 'buy2get1'
  | 'freeShipping'
  | 'miracleSale';

export type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

export type CouponType = {
  id: number;
  code: CouponCode;
  description: string;
  expirationDate: string; // 'YYYY-MM-DD'
  discountType: DiscountType;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
};
