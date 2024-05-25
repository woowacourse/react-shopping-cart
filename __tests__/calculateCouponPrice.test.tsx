import { calculateDiscountAmount } from '@domain/discount';
import { useConfirmCouponApplication } from '@hooks/orderConfirm';
import { useOrderCosts } from '@hooks/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { act } from 'react';
import { useRecoilValue } from 'recoil';

import { FREE_SHIPPING_ITEMS, INITIAL_ITEMS, SHIPPING_FREE_ITEMS } from './constants/cartItems';
import { create5000Coupon, createBOGOCoupon, createFreeShippingCoupon, createMiracleCoupon } from './utils/coupon';
import executeCartItemRenderHook from './utils/executeRenderHook';

describe('쿠폰 할인 금액 계산 테스트', () => {
  describe('5,000원 할인 쿠폰', () => {
    it('주문 금액이 100,000원이 넘을 때, 할인 금액은 5,000원 이다.', () => {
      const { result } = executeCartItemRenderHook(
        () => useConfirmCouponApplication(),
        SHIPPING_FREE_ITEMS,
        new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)),
      );
      // given
      const coupon = create5000Coupon('2100-5-30');
      const isApplicabilityCoupon = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) {
          discountAmount = calculateDiscountAmount({ coupon });
        }
      });

      // then
      expect(discountAmount).toBe(5000);
    });

    it('주문 금액이 100,000원이 넘지 않을 때, 할인 금액은 0원 이다.', () => {
      const { result } = executeCartItemRenderHook(() => useConfirmCouponApplication());

      // given
      const coupon = create5000Coupon('2100-5-30');
      const isApplicabilityCoupon = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) {
          discountAmount = calculateDiscountAmount({ coupon });
        }
      });

      // then
      expect(discountAmount).toBe(0);
    });
  });

  describe('2개 구매 시 1개 무료 쿠폰', () => {
    it('수량이 3개 이상인 품목의 가격이 1,000원일 경우, 그 1,000원이 할인 된다.', () => {
      const { result } = executeCartItemRenderHook(
        () => {
          const selectedCartItems = useRecoilValue(selectedItemsSelector);
          const isApplicabilityCoupon = useConfirmCouponApplication();
          return { selectedCartItems, isApplicabilityCoupon };
        },
        INITIAL_ITEMS,
        new Set(INITIAL_ITEMS.map((item) => item.id)),
      );

      // given
      const coupon = createBOGOCoupon('2100-5-30');
      const { selectedCartItems, isApplicabilityCoupon } = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) discountAmount = calculateDiscountAmount({ coupon, selectedCartItems });
      });

      // then
      expect(discountAmount).toBe(1000);
    });

    it('수량이 3개 이상인 품목이 없는 경우, 할인 금액은 0원이다.', () => {
      const { result } = executeCartItemRenderHook(() => {
        const selectedCartItems = useRecoilValue(selectedItemsSelector);
        const isApplicabilityCoupon = useConfirmCouponApplication();
        return { selectedCartItems, isApplicabilityCoupon };
      });

      // given
      const coupon = createBOGOCoupon('2100-5-30');
      const { selectedCartItems, isApplicabilityCoupon } = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) discountAmount = calculateDiscountAmount({ coupon, selectedCartItems });
      });

      // then
      expect(discountAmount).toBe(0);
    });
  });

  describe('5만원 이상 구매 시 무료 배송 쿠폰', () => {
    it('5만원 미만으로 구매했다면 할인 금액이 0원이다.', () => {
      const { result } = executeCartItemRenderHook(
        () => {
          const { shippingPrice } = useOrderCosts();
          const isApplicabilityCoupon = useConfirmCouponApplication();
          return { shippingPrice, isApplicabilityCoupon };
        },
        INITIAL_ITEMS,
        new Set(INITIAL_ITEMS.map((item) => item.id)),
      );

      // given
      const coupon = createFreeShippingCoupon('2100-5-30');
      const { shippingPrice, isApplicabilityCoupon } = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) discountAmount = calculateDiscountAmount({ coupon, shippingPrice });
      });

      // then
      expect(discountAmount).toBe(0);
    });

    it('5만원 이상 구매했다면 할인 금액이 적용 된다.', () => {
      const { result } = executeCartItemRenderHook(
        () => {
          const { shippingPrice } = useOrderCosts();
          const isApplicabilityCoupon = useConfirmCouponApplication();
          return { shippingPrice, isApplicabilityCoupon };
        },
        FREE_SHIPPING_ITEMS,
        new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
      );

      // given
      const coupon = createFreeShippingCoupon('2100-5-30');
      const { shippingPrice, isApplicabilityCoupon } = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) discountAmount = calculateDiscountAmount({ coupon, shippingPrice });
      });

      // then
      expect(discountAmount).toBe(3000);
    });

    it('10만원 이상 구매했다면 이미 무료 배송 조건을 만족하기 때문에 할인 금액이 적용 되지 않는다.', () => {
      const { result } = executeCartItemRenderHook(
        () => {
          const { shippingPrice } = useOrderCosts();
          const isApplicabilityCoupon = useConfirmCouponApplication();
          return { shippingPrice, isApplicabilityCoupon };
        },
        SHIPPING_FREE_ITEMS,
        new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)),
      );

      // given
      const coupon = createFreeShippingCoupon('2100-5-30');
      const { shippingPrice, isApplicabilityCoupon } = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) discountAmount = calculateDiscountAmount({ coupon, shippingPrice });
      });

      // then
      expect(discountAmount).toBe(0);
    });
  });

  describe('미라클 할인 쿠폰 ', () => {
    // given
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const testCases = [
      {
        title: '새벽 4시 1초일 경우 30% 할인이 적용 된다.',
        date: new Date(Date.UTC(2024, 4, 19, 19, 0, 1)),
        expectedDiscount: 18000,
      },
      {
        title: '새벽 6시 59분 59초일 경우 30% 할인이 적용 된다.',
        date: new Date(Date.UTC(2024, 4, 18, 21, 59, 59)),
        expectedDiscount: 18000,
      },
      {
        title: '새벽 3시 59분 59초일 경우 30% 할인이 적용 되지 않는다.',
        date: new Date(Date.UTC(2024, 4, 18, 18, 59, 59)),
        expectedDiscount: 0,
      },
      {
        title: '새벽 7시 1초일 경우 30% 할인이 적용 되지 않는다.',
        date: new Date(Date.UTC(2024, 4, 18, 22, 0, 1)),
        expectedDiscount: 0,
      },
    ];

    it.each(testCases)('$title', ({ date, expectedDiscount }) => {
      jest.setSystemTime(date);

      const { result } = executeCartItemRenderHook(
        () => {
          const { orderPrice } = useOrderCosts();
          const isApplicabilityCoupon = useConfirmCouponApplication();
          return { orderPrice, isApplicabilityCoupon };
        },
        FREE_SHIPPING_ITEMS,
        new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
      );

      const coupon = createMiracleCoupon('2100-5-30');
      const { orderPrice, isApplicabilityCoupon } = result.current;

      let discountAmount = 0;

      // when
      act(() => {
        if (isApplicabilityCoupon(coupon)) {
          discountAmount = calculateDiscountAmount({ coupon, orderPrice });
        }
      });

      // then
      expect(discountAmount).toBe(expectedDiscount);
    });
  });
});
