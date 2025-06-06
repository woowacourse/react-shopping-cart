import {
  BOGOCouponType,
  CouponType,
  FIXEDCouponType,
  FreeShippingCouponType,
  MiracleCouponType,
} from './coupon.types';

export function isFixedCoupon(c: CouponType): c is FIXEDCouponType {
  return c.code === 'FIXED5000';
}

export function isBOGOCoupon(c: CouponType): c is BOGOCouponType {
  return c.code === 'BOGO';
}

export function isFreeShippingCoupon(
  c: CouponType
): c is FreeShippingCouponType {
  return c.code === 'FREESHIPPING';
}

export function isMiracleCoupon(c: CouponType): c is MiracleCouponType {
  return c.code === 'MIRACLESALE';
}

export const createCoupon = (config: CouponType): CouponType => {
  const base = {
    id: config.id,
    code: config.code,
    description: config.description,
    expirationDate: new Date(config.expirationDate),
    discountType: config.discountType,
  };

  if (isFixedCoupon(config)) {
    return {
      ...base,
      discount: config.discount,
      minimumAmount: config.minimumAmount,
    };
  }

  if (isBOGOCoupon(config)) {
    return {
      ...base,
      buyQuantity: config.buyQuantity,
      getQuantity: config.getQuantity,
    };
  }

  if (isFreeShippingCoupon(config)) {
    return {
      ...base,
      minimumAmount: config.minimumAmount,
    };
  }

  if (isMiracleCoupon(config)) {
    return {
      ...base,
      discount: config.discount,
      availableTime: config.availableTime,
    };
  }

  // If the coupon type does not match any known types, throw an error
  throw new Error('쿠폰 code가 존재하지 않습니다.');
};

class Coupon {
  #data: CouponType;

  constructor(couponData: CouponType) {
    const coupon = createCoupon(couponData);
    if (!coupon) {
      throw new Error('유효하지 않은 쿠폰 데이터입니다.');
    }

    this.#data = coupon;
  }

  get data() {
    return { ...this.#data };
  }

  isDisable(orderPrice: number) {
    const now = new Date();
    if (this.#data.expirationDate < now) return true;

    if ('availableTime' in this.#data) {
      const { start, end } = this.#data.availableTime;
      const startTime = new Date(start);
      const endTime = new Date(end);
      if (now < startTime || now > endTime) return true;
    }

    if (
      'minimumAmount' in this.#data &&
      this.#data.minimumAmount > orderPrice
    ) {
      return true;
    }

    return false;
  }

  calculateDiscount() {}
}

export default Coupon;
