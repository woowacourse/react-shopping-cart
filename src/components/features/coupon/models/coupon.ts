import {
  CartItemType,
  calculateDeliveryFee,
  calculateOrderPrice,
} from '../../cart';
import { convertTimeToSecond } from '../utils';
import { CouponType } from './coupon.types';
import { createCoupon } from './coupon.utils';

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

    if (this.#isExpired()) return true;

    switch (this.#data.discountType) {
      case 'fixed': {
        return this.#data.minimumAmount > orderPrice;
      }
      case 'buyXgetY': {
        const totalQuantity = this.#data.buyQuantity + this.#data.getQuantity;
        const eligibleItemsByPrice = orderItems.filter(
          (item) => item.quantity >= totalQuantity
        );

        return eligibleItemsByPrice.length === 0;
      }
      case 'freeShipping': {
        return this.#data.minimumAmount > orderPrice;
      }
      case 'percentage': {
        const now = new Date();
        const { start, end } = this.#data.availableTime;
        const nowSecond = convertTimeToSecond(
          `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        );
        const startSecond = convertTimeToSecond(start);
        const endSecond = convertTimeToSecond(end);
        return nowSecond < startSecond || nowSecond > endSecond;
      }
      default:
        return false;
    }
  }

  #isExpired() {
    return this.#data.expirationDate < new Date();
  }

  #calculateDiscount(
    orderItems: CartItemType[],
    isRemoteArea: boolean
  ): number {
    const orderPrice = calculateOrderPrice(orderItems);

    switch (this.#data.discountType) {
      case 'fixed': {
        return this.#data.discount;
      }
      case 'buyXgetY': {
        const totalQuantity = this.#data.buyQuantity + this.#data.getQuantity;
        const eligibleItemsByPrice = orderItems
          .filter((item) => item.quantity >= totalQuantity)
          .sort((a, b) => b.product.price - a.product.price);

        if (eligibleItemsByPrice.length === 0) return 0;

        return eligibleItemsByPrice[0].product.price;
      }
      case 'freeShipping': {
        return calculateDeliveryFee(orderPrice, isRemoteArea);
      }
      case 'percentage': {
        return (this.#data.discount / 100) * orderPrice;
      }
      default:
        return 0;
    }
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
