import {
  DUMMY_BUY_X_GET_Y_COUPON,
  DUMMY_FIXED_DISCOUNT_COUPON,
  DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
} from './dummyCoupons';
import { FixedDiscountCoupon, FreeShippingCoupon } from '../type';

import DUMMY_ITEMS from './dummyItems';
import getCouponsAmount from '../utils/getCouponsAmount';

describe('getCouponsAmount', () => {
  describe('할인 타입 별 검사', () => {
    describe('fixedDiscountCoupon', () => {
      it.each([
        {
          ...DUMMY_FIXED_DISCOUNT_COUPON,
          expirationDate: '2001-05-17',
        },
        {
          ...DUMMY_FIXED_DISCOUNT_COUPON,
          minimumAmount: DUMMY_ITEMS[0].quantity * DUMMY_ITEMS[0].product.price + 1,
        },
      ])('유효하지 않은 쿠폰이 입력되면 할인 금액은 0원이다.', (invalidCoupon) => {
        // given
        const items = [DUMMY_ITEMS[0]];

        // when
        const couponsAmount = getCouponsAmount([invalidCoupon], items, 0);

        //then
        expect(couponsAmount).toBe(0);
      });

      it('유효한 경우 discount만큼 고정된 금액을 할인해준다', () => {
        // given
        const items = [DUMMY_ITEMS[0]];
        const validCoupon: FixedDiscountCoupon = {
          ...DUMMY_FIXED_DISCOUNT_COUPON,
          expirationDate: '2050-05-17',
          minimumAmount: DUMMY_ITEMS[0].quantity * DUMMY_ITEMS[0].product.price,
        };

        // when
        const couponsAmount = getCouponsAmount([validCoupon], items, 0);

        //then
        expect(couponsAmount).toBe(validCoupon.discount);
      });
    });

    describe('buyXGetYCoupon', () => {
      it.each([
        {
          ...DUMMY_BUY_X_GET_Y_COUPON,
          expirationDate: '2001-05-17',
        },
        {
          ...DUMMY_BUY_X_GET_Y_COUPON,
          buyQuantity: DUMMY_ITEMS[0].quantity,
          getQuantity: 1,
        },
      ])('유효하지 않은 쿠폰이 입력되면 할인 금액은 0원이다.', (invalidCoupon) => {
        // given
        const items = [DUMMY_ITEMS[0]];

        // when
        const couponsAmount = getCouponsAmount([invalidCoupon], items, 0);

        //then
        expect(couponsAmount).toBe(0);
      });

      it.each([
        [
          { ...DUMMY_BUY_X_GET_Y_COUPON, buyQuantity: 2, getQuantity: 1 },
          [{ ...DUMMY_ITEMS[0], quantity: 3, product: { ...DUMMY_ITEMS[0].product, price: 10 } }],
          10,
        ],
        [
          { ...DUMMY_BUY_X_GET_Y_COUPON, buyQuantity: 2, getQuantity: 1 },
          [
            { ...DUMMY_ITEMS[0], quantity: 3, product: { ...DUMMY_ITEMS[0].product, price: 10 } },
            { ...DUMMY_ITEMS[0], quantity: 3, product: { ...DUMMY_ITEMS[0].product, price: 1000 } },
          ],
          1000,
        ],
        [
          { ...DUMMY_BUY_X_GET_Y_COUPON, buyQuantity: 2, getQuantity: 10 },
          [
            { ...DUMMY_ITEMS[0], quantity: 12, product: { ...DUMMY_ITEMS[0].product, price: 10 } },
            {
              ...DUMMY_ITEMS[0],
              quantity: 12,
              product: { ...DUMMY_ITEMS[0].product, price: 1000 },
            },
          ],
          10000,
        ],
      ])(
        '유효한 경우 쿠폰 적용 가능한 물건 중 가장 비싼 물건의 가격*개수 만큼 할인해준다.',
        (coupon, items, expected) => {
          // when
          const couponsAmount = getCouponsAmount([coupon], items, 0);

          //then
          expect(couponsAmount).toBe(expected);
        },
      );
    });

    describe('FreeShippingCoupon', () => {
      it.each([
        {
          ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
          expirationDate: '2001-05-17',
        },
        {
          ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
          minimumAmount: DUMMY_ITEMS[0].quantity * DUMMY_ITEMS[0].product.price + 1,
        },
      ])('유효하지 않은 쿠폰이 입력되면 할인 금액은 0원이다.', (invalidCoupon) => {
        // given
        const items = [DUMMY_ITEMS[0]];

        // when
        const couponsAmount = getCouponsAmount([invalidCoupon], items, 0);

        //then
        expect(couponsAmount).toBe(0);
      });

      it('유효한 경우 discount만큼 고정된 금액을 할인해준다', () => {
        // given
        const items = [DUMMY_ITEMS[0]];
        const validCoupon: FreeShippingCoupon = {
          ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
          expirationDate: '2050-05-17',
          minimumAmount: DUMMY_ITEMS[0].quantity * DUMMY_ITEMS[0].product.price,
        };
        const shippingFee = 3000;

        // when
        const couponsAmount = getCouponsAmount([validCoupon], items, shippingFee);

        //then
        expect(couponsAmount).toBe(shippingFee);
      });
    });
  });
});
