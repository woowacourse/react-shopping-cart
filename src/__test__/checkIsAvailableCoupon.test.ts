import { BuyXGetYCoupon, FixedDiscountCoupon, FreeShippingCoupon } from '../type';
import {
  DUMMY_BUY_X_GET_Y_COUPON,
  DUMMY_FIXED_DISCOUNT_COUPON,
  DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
  DUMMY_PERCENTAGE_DISCOUNT_COUPON,
} from './dummyCoupons';

import DUMMY_ITEMS from './dummyItems';
import checkIsAvailableCoupon from '../utils/checkIsAvailableCoupon';

const DUMMY_ITEMS_AMOUNT = DUMMY_ITEMS.reduce(
  (acc, item) => acc + item.quantity * item.product.price,
  0,
);

describe('checkIsAvailableCoupon', () => {
  describe('FixedDiscountCoupon의 유효성 검사', () => {
    it('minimumAmount이 총 가격보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: FixedDiscountCoupon = {
        ...DUMMY_FIXED_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT + 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(false);
    });

    it('minimumAmount이 총 가격과 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FixedDiscountCoupon = {
        ...DUMMY_FIXED_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });

    it('minimumAmount이 총 가격보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FixedDiscountCoupon = {
        ...DUMMY_FIXED_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT - 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });
  });

  describe('BuyXGetYCoupon의 유효성 검사', () => {
    const MAX_QUANTITY = Math.max(...DUMMY_ITEMS.map((item) => item.quantity));
    it('buyQuantity+getQuantity가 가장 수량이 많은 물품의 수량보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 3,
        getQuantity: 4,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(false);
    });

    it('buyQuantity+getQuantity가 가장 수량이 많은 물품의 수량과 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 1,
        getQuantity: 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });

    it('buyQuantity+getQuantity가 가장 수량이 많은 물품의 수량보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 3,
        getQuantity: 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });
  });

  describe('FreeShippingCoupon의 유효성 검사', () => {
    it('minimumAmount이 총 가격보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: FreeShippingCoupon = {
        ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT + 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 1000);

      //then
      expect(result).toBe(false);
    });

    it('minimumAmount이 총 가격과 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FreeShippingCoupon = {
        ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 1000);

      //then
      expect(result).toBe(true);
    });

    it('minimumAmount이 총 가격보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FreeShippingCoupon = {
        ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT - 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 1000);

      //then
      expect(result).toBe(true);
    });
  });

  describe('PercentageCoupon의 유효성 검사', () => {
    it('현재 시간이 availableTime.start보다 빠르면 쿠폰을 사용할 수 없다.', () => {
      const beforeDate = new Date(2024, 5, 21, 14, 59, 59);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        beforeDate,
      );

      //then
      expect(result).toBe(false);
    });

    it('현재 시간이 availableTime.start와 같으면 쿠폰을 사용할 수 있다.', () => {
      const startDate = new Date(2024, 5, 21, 15, 0, 0);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        startDate,
      );

      //then
      expect(result).toBe(true);
    });

    it('현재 시간이 availableTime.end와 같으면 쿠폰을 사용할 수 있다.', () => {
      const endDate = new Date(2024, 5, 21, 16, 59, 59);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        endDate,
      );

      //then
      expect(result).toBe(true);
    });

    it('현재 시간이 availableTime.end와 느리면 쿠폰을 사용할 수 없다.', () => {
      const afterDate = new Date(2024, 5, 21, 17, 0, 0);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        afterDate,
      );

      //then
      expect(result).toBe(false);
    });
  });
});
