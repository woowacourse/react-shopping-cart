import { Coupon } from '@appTypes/orderConfirm';
import { CartItem } from '@appTypes/shoppingCart';
import { isApplicabilityCoupon } from '@domain/coupon';
import { useOrderCosts } from '@hooks/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { act } from 'react';
import { useRecoilValue } from 'recoil';

import { FREE_SHIPPING_ITEMS, INITIAL_ITEMS, SHIPPING_FREE_ITEMS } from './constants/cartItems';
import { create5000Coupon, createBOGOCoupon, createFreeShippingCoupon, createMiracleCoupon } from './utils/coupon';
import executeCartItemRenderHook from './utils/executeRenderHook';

describe('쿠폰 이용 여부 테스트', () => {
  // given
  const createCouponValidationPayload = (cartItems?: CartItem[], selectedIds?: Set<number>) =>
    executeCartItemRenderHook(
      () => {
        const { shippingPrice, totalPrice } = useOrderCosts();
        const selectedCartItems = useRecoilValue(selectedItemsSelector);

        return { shippingPrice, totalPrice, selectedCartItems };
      },
      cartItems ?? SHIPPING_FREE_ITEMS,
      selectedIds ?? new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)),
    ).result.current;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-20'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('5,000원 할인 쿠폰', () => {
    it('이용 일자가 지나지 않았다면 이용 가능한 쿠폰이다.', () => {
      // given
      const VALID_COUPON: Coupon = create5000Coupon('2024-05-21');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('이용 일자가 지났다면 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const VALID_COUPON: Coupon = create5000Coupon('2024-05-19');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });

    it('선택된 아이템들의 총 주문 금액이 100,000원이 넘지 않는 경우, 최소 주문 금액 조건에 만족하지 않았기 때문에 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const payload = createCouponValidationPayload(INITIAL_ITEMS, new Set(INITIAL_ITEMS.map((item) => item.id)));

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: create5000Coupon() })).toBeFalsy();
      });
    });

    it('선택된 아이템들의 총 주문 금액이 100,000원이 넘는 경우, 최소 주문 금액 조건에 만족하였기 때문에 이용 가능한 쿠폰이다.', () => {
      // given
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: create5000Coupon() })).toBeTruthy();
      });
    });
  });

  describe('2개 구매 시 1개 무료 쿠폰', () => {
    it('이용 일자가 지나지 않았다면 이용 가능한 쿠폰이다.', () => {
      // given
      const VALID_COUPON: Coupon = create5000Coupon('2024-05-21');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('이용 일자가 지났다면 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const VALID_COUPON: Coupon = createBOGOCoupon('2024-05-19');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });

    it('수량이 3개 이상 있는 상품이 있는 경우 이용 가능한 쿠폰이다.', () => {
      // given
      const payload = createCouponValidationPayload(INITIAL_ITEMS, new Set(INITIAL_ITEMS.map((item) => item.id)));

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: createBOGOCoupon() })).toBeTruthy();
      });
    });

    it('수량이 3개 이상 있는 상품이 없는 경우 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const payload = createCouponValidationPayload(
        SHIPPING_FREE_ITEMS,
        new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)),
      );

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: createBOGOCoupon() })).toBeFalsy();
      });
    });
  });

  describe('5만원 이상 구매 시 무료 배송 쿠폰', () => {
    it('이용 일자가 지나지 않았다면 이용 가능한 쿠폰이다.', () => {
      // given
      const VALID_COUPON: Coupon = createFreeShippingCoupon('2024-05-21');
      const payload = createCouponValidationPayload(
        FREE_SHIPPING_ITEMS,
        new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
      );

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('이용 일자가 지났다면 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const VALID_COUPON: Coupon = createFreeShippingCoupon('2024-05-19');
      const payload = createCouponValidationPayload(
        FREE_SHIPPING_ITEMS,
        new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
      );

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });

    it('5만원 이상 구매한 경우, 이용 가능한 쿠폰이다.', () => {
      // given
      const VALID_COUPON: Coupon = createFreeShippingCoupon();
      const payload = createCouponValidationPayload(
        FREE_SHIPPING_ITEMS,
        new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
      );

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('5만원 미만 구매한 경우, 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const VALID_COUPON: Coupon = createFreeShippingCoupon();
      const payload = createCouponValidationPayload(INITIAL_ITEMS, new Set(INITIAL_ITEMS.map((item) => item.id)));

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });

    it('10만원 이상 구매한 경우, 무료 배송 조건을 만족했기 때문에 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const VALID_COUPON: Coupon = createFreeShippingCoupon();
      const payload = createCouponValidationPayload(SHIPPING_FREE_ITEMS, new Set(INITIAL_ITEMS.map((item) => item.id)));

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });
  });

  describe('미라클 할인 쿠폰 테스트', () => {
    it('이용 일자가 지나지 않았다면 이용 가능한 쿠폰이다.', () => {
      // given
      jest.setSystemTime(new Date(Date.UTC(2024, 4, 19, 19, 0, 1)));

      const VALID_COUPON: Coupon = createMiracleCoupon('2024-05-22');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('이용 일자가 지났다면 이용 가능한 쿠폰이 아니다.', () => {
      // given
      const VALID_COUPON: Coupon = createMiracleCoupon('2024-05-19');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });

    it('이용 가능한 시간 (4시 1초)에 쿠폰을 사용할 수 있다.', () => {
      // given
      jest.setSystemTime(new Date(Date.UTC(2024, 4, 19, 19, 0, 1)));

      const VALID_COUPON = createMiracleCoupon('2024-05-21');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('이용 가능한 시간 (6시 59분 59초)에 쿠폰을 사용할 수 있다.', () => {
      // given
      jest.setSystemTime(new Date(Date.UTC(2024, 4, 18, 21, 59, 59)));
      const VALID_COUPON = createMiracleCoupon('2024-05-21');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeTruthy();
      });
    });

    it('이용 불가능 한 시간 (3시 59분 59초)에 쿠폰을 사용할 수 없다.', () => {
      // given
      jest.setSystemTime(new Date(Date.UTC(2024, 4, 18, 18, 59, 59)));

      const VALID_COUPON = createMiracleCoupon('2024-05-21');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });

    it('이용 불가능 한 시간 (7시 1초)에 쿠폰을 사용할 수 없다.', () => {
      // given
      jest.setSystemTime(new Date(Date.UTC(2024, 4, 18, 22, 0, 1)));

      const VALID_COUPON = createMiracleCoupon('2024-05-21');
      const payload = createCouponValidationPayload();

      // when - then
      act(() => {
        expect(isApplicabilityCoupon({ ...payload, coupon: VALID_COUPON })).toBeFalsy();
      });
    });
  });
});
