import { CartItemType } from '../../cart/types';
import { calculateDeliveryFee } from '../../cart/utils/calculateDeliveryFee';
import { calculateOrderPrice } from '../../cart/utils/cartCalculations';
import { convertTimeToSecond } from '../utils/time';
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
      const nowSecond = convertTimeToSecond(
        `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      );
      const startSecond = convertTimeToSecond(start);
      const endSecond = convertTimeToSecond(end);
      if (nowSecond < startSecond || nowSecond > endSecond) return true;
    }

    if (
      'minimumAmount' in this.#data &&
      this.#data.minimumAmount > orderPrice
    ) {
      return true;
    }

    return false;
  }

  calculateDiscount(orderItems: CartItemType[], isRemoteArea: boolean) {
    const orderPrice = calculateOrderPrice(orderItems);
    if (this.isDisable(orderPrice)) return 0;

    if (isFixedCoupon(this.#data)) {
      return this.#data.discount;
    }

    if (isMiracleCoupon(this.#data)) {
      return (this.#data.discount / 100) * orderPrice;
    }

    if (isBOGOCoupon(this.#data)) {
      const eligibleItemsByPrice = orderItems
        .filter((item) => item.quantity >= 2 + 1)
        .sort((a, b) => b.product.price - a.product.price);

      if (eligibleItemsByPrice.length === 0) {
        return 0;
      }

      return eligibleItemsByPrice[0].product.price;
    }

    if (isFreeShippingCoupon(this.#data)) {
      return calculateDeliveryFee(orderPrice, isRemoteArea);
    }

    return 0;
  }
}

export default Coupon;
