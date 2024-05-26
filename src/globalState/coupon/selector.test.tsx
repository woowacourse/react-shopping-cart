import { renderHook } from '@testing-library/react';
import { Suspense, act } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { couponsState, fixedSelectedCouponsState } from './atom';
import {
  applicableCouponSelector,
  calculateTotalDiscountAmountSelector,
  couponSelector,
} from './selector';
import { cartItemsState } from '../cartItems/atoms';
import {
  checkedItemsSelector,
  deliveryPriceState,
  orderTotalPriceState,
} from '../cartItems/selectors';

import {
  PRODUCT_PER_QUANTITY_UNDER_THREE_ITEMS,
  TOTAL_PRICE_OVER_100000_DATA,
  TOTAL_PRICE_UNDER_100000_DATA,
} from '@/mocks/cartItems';
import {
  APPLICABLE_BuyXgetY_COUPON,
  APPLICABLE_FIXED_COUPON,
  APPLICABLE_FREE_SHIPPING_COUPON,
  APPLICABLE_PERCENTAGE_COUPON,
  APPLICABLE_TEN_PERCENT_COUPON,
  EXPIRED_BOGO_COUPON,
  coupons,
} from '@/mocks/coupons';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
  updateItemQuantity: jest.fn(),
  deleteItem: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCoupons: jest.fn(),
}));

describe('coupon selector', () => {
  describe('couponSelector', () => {
    const couponCodes = coupons.map(({ code }) => code);
    it.each([...couponCodes])(
      '존재하는 쿠폰(%s)을 찾으면 해당 쿠폰을 반환한다.',
      (couponCode: string) => {
        const { result } = renderHook(() => useRecoilValue(couponSelector(couponCode)), {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={({ set }) => set(couponsState, coupons)}>
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        });

        expect(result.current?.code).toBe(couponCode);
      },
    );

    it('쿠폰이 존재하지 않으면 undefined를 반환한다.', () => {
      const EXPIRED_BOGO_COUPON_CODE = 'EXPIRED_BOGO_COUPON';
      const { result } = renderHook(
        () => useRecoilValue(couponSelector(EXPIRED_BOGO_COUPON_CODE)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot initializeState={({ set }) => set(couponsState, coupons)}>
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeUndefined();
    });
  });

  describe('applicableCouponSelector', () => {
    it('쿠폰이 유효하지 않다면, "false"를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(EXPIRED_BOGO_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [EXPIRED_BOGO_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeFalsy();
    });

    it('쿠폰이 유효하다면, "true"를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(APPLICABLE_FIXED_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [APPLICABLE_FIXED_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeTruthy();
    });

    it(`quantity가 3 이상인 아이템이 없다면, "false"를 반환한다.`, () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(APPLICABLE_BuyXgetY_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, PRODUCT_PER_QUANTITY_UNDER_THREE_ITEMS),
                set(couponsState, [APPLICABLE_BuyXgetY_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeFalsy();
    });

    it(`quantity가 3 이상인 아이템이 하나라도 존재한다면, "true"를 반환한다.`, () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(APPLICABLE_BuyXgetY_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [APPLICABLE_BuyXgetY_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeTruthy();
    });
  });

  describe('calculateTotalDiscountAmountSelector', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-05-22T05:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('유효한 "fixed"타입의 쿠폰을 적용하면 해당 금액만큼 할인된다.', () => {
      const { result } = renderHook(
        () => {
          const discountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(true));
          const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);

          return { discountAmount, setFixedSelectedCoupons };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [APPLICABLE_FIXED_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      act(() => {
        result.current.setFixedSelectedCoupons([APPLICABLE_FIXED_COUPON.code]);
      });

      expect(result.current.discountAmount).toBe(APPLICABLE_FIXED_COUPON.discount);
    });

    it('유효한 "percentage"타입의 쿠폰을 적용하면 해당 금액만큼 할인된다.', () => {
      const { result } = renderHook(
        () => {
          const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);
          const discountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(true));
          const orderTotalAmount = useRecoilValue(orderTotalPriceState);

          return { setFixedSelectedCoupons, discountAmount, orderTotalAmount };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [APPLICABLE_PERCENTAGE_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      act(() => {
        result.current.setFixedSelectedCoupons([APPLICABLE_PERCENTAGE_COUPON.code]);
      });

      const discountedFromTotalAmount = Math.floor(
        (result.current.orderTotalAmount * APPLICABLE_PERCENTAGE_COUPON.discount!) / 100,
      );

      expect(result.current.discountAmount).toBe(discountedFromTotalAmount);
    });

    it('유효한 "freeShipping"타입의 쿠폰을 적용하면 배송비만큼 할인된다.', () => {
      const { result } = renderHook(
        () => {
          const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);
          const discountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(true));
          const deliveryPrice = useRecoilValue(deliveryPriceState);

          return { setFixedSelectedCoupons, discountAmount, deliveryPrice };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_UNDER_100000_DATA),
                set(couponsState, [APPLICABLE_FREE_SHIPPING_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      act(() => {
        result.current.setFixedSelectedCoupons([APPLICABLE_FREE_SHIPPING_COUPON.code]);
      });

      expect(result.current.discountAmount).toBe(result.current.deliveryPrice);
    });
  });

  it('유효한 "buyXgetY"타입의 쿠폰을 적용하면 1개당 금액이 가장 비싼 제품이 할인된다.', () => {
    const { result } = renderHook(
      () => {
        const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);
        const discountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(true));
        const checkedItems = useRecoilValue(checkedItemsSelector);

        return { setFixedSelectedCoupons, discountAmount, checkedItems };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => (
              set(cartItemsState, TOTAL_PRICE_UNDER_100000_DATA),
              set(couponsState, [APPLICABLE_BuyXgetY_COUPON])
            )}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      },
    );

    act(() => {
      result.current.setFixedSelectedCoupons([APPLICABLE_BuyXgetY_COUPON.code]);
    });

    const maxAmountPerItemPrice = Math.max(
      ...result.current.checkedItems.map(({ product: { price } }) => price),
    );

    expect(result.current.discountAmount).toBe(maxAmountPerItemPrice);
  });

  it('총 결제 금액이 100,000원이고, 5000원할인, 10%할인 쿠폰을 중복 적용할 때, 가장 큰 할인 금액인 15,000원을 할인한다.', () => {
    const { result } = renderHook(
      () => {
        const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);
        const discountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(true));

        return { setFixedSelectedCoupons, discountAmount };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => (
              set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
              set(couponsState, [APPLICABLE_FIXED_COUPON, APPLICABLE_TEN_PERCENT_COUPON])
            )}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      },
    );

    act(() => {
      result.current.setFixedSelectedCoupons([
        APPLICABLE_FIXED_COUPON.code,
        APPLICABLE_TEN_PERCENT_COUPON.code,
      ]);
    });

    expect(result.current.discountAmount).toBe(15000);
  });
});
