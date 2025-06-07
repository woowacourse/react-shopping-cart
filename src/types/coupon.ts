// 공통 속성
interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string; // YYYY-MM-DD 형식
  discountType: string;
}

// 고정 금액 할인 쿠폰 (FIXED5000)
export interface FixedCoupon extends BaseCoupon {
  discountType: 'fixed';
  discount: number; // 할인 금액 (원)
  minimumAmount: number; // 최소 주문 금액 (원)
}

// Buy X Get Y 쿠폰 (BOGO)
export interface BuyXGetYCoupon extends BaseCoupon {
  discountType: 'buyXgetY';
  buyQuantity: number; // 구매 수량 X
  getQuantity: number; // 무료 증정 수량 Y
}

// 무료 배송 쿠폰 (FREESHIPPING)
export interface FreeShippingCoupon extends BaseCoupon {
  discountType: 'freeShipping';
  minimumAmount: number; // 무료 배송 적용 최소 주문 금액 (원)
}

// 시간대별 % 할인 쿠폰 (MIRACLESALE)
export interface PercentageCoupon extends BaseCoupon {
  discountType: 'percentage';
  discount: number; // 할인율 (%)
  availableTime: {
    start: string; // HH:mm:ss
    end: string; // HH:mm:ss
  };
}

// 모든 쿠폰 타입의 합집합
export type Coupon = FixedCoupon | BuyXGetYCoupon | FreeShippingCoupon | PercentageCoupon;
