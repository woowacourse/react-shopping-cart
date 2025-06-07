import { CartItemType } from '../../cart/types';
import { calculateDeliveryFee } from '../../cart/utils/calculateDeliveryFee';
import { calculateOrderPrice } from '../../cart/utils/cartCalculations';
import { convertTimeToSecond } from '../utils/time';
import { CouponType } from './coupon.types';
import {
  createCoupon,
  isBOGOCoupon,
  isFixedCoupon,
  isFreeShippingCoupon,
  isMiracleCoupon,
} from './coupon.utils';

class Coupon {
  #data: CouponType;
  #discountAmount: number = 0;
  #disable: boolean = false;

  constructor(
    couponData: CouponType,
    orderItems: CartItemType[],
    isRemoteArea: boolean
  ) {
    const coupon = createCoupon(couponData);
    if (!coupon) {
      throw new Error('유효하지 않은 쿠폰 데이터입니다.');
    }

    this.#data = coupon;
    this.#disable = this.#evaluateDisable(orderItems);
    if (!this.#disable) {
      this.#discountAmount = this.#calculateDiscount(orderItems, isRemoteArea);
    }
  }

  get data() {
    return { ...this.#data };
  }

  get discountAmount() {
    return this.#discountAmount;
  }

  get disable() {
    return this.#disable;
  }

  #evaluateDisable(orderItems: CartItemType[]): boolean {
    const orderPrice = calculateOrderPrice(orderItems);

    const now = new Date();
    if (this.#data.expirationDate < now) return true;

    if (isBOGOCoupon(this.#data)) {
      const totalQuantity = this.#data.buyQuantity + this.#data.getQuantity;
      const eligibleItemsByPrice = orderItems.filter(
        (item) => item.quantity >= totalQuantity
      );

      return eligibleItemsByPrice.length === 0;
    }

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

  #calculateDiscount(
    orderItems: CartItemType[],
    isRemoteArea: boolean
  ): number {
    const orderPrice = calculateOrderPrice(orderItems);

    if (isFixedCoupon(this.#data)) {
      return this.#data.discount;
    }

    if (isMiracleCoupon(this.#data)) {
      return (this.#data.discount / 100) * orderPrice;
    }

    if (isBOGOCoupon(this.#data)) {
      const totalQuantity = this.#data.buyQuantity + this.#data.getQuantity;
      const eligibleItemsByPrice = orderItems
        .filter((item) => item.quantity >= totalQuantity)
        .sort((a, b) => b.product.price - a.product.price);

      if (eligibleItemsByPrice.length === 0) return 0;

      return eligibleItemsByPrice[0].product.price;
    }

    if (isFreeShippingCoupon(this.#data)) {
      return calculateDeliveryFee(orderPrice, isRemoteArea);
    }

    return 0;
  }

  updateDiscountAmount(orderItems: CartItemType[], isRemoteArea: boolean) {
    this.#disable = this.#evaluateDisable(orderItems);
    if (!this.#disable) {
      this.#discountAmount = this.#calculateDiscount(orderItems, isRemoteArea);
    } else {
      this.#discountAmount = 0;
    }
  }
}

export default Coupon;
