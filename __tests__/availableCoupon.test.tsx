import { CartItem } from '@appTypes/shoppingCart';
import { useAvailableCoupons } from '@hooks/index';
import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { COUPONS, NIKE } from './mockData';
import { renderCouponHookWithRecoilRoot } from './utils';

const renderAvailableCoupon = (initialItems: CartItem[], selectedIds: number[]) =>
  renderCouponHookWithRecoilRoot(() => useAvailableCoupons(), initialItems, selectedIds);

describe('사용 가능한 쿠폰 테스트', () => {
  const [FIXED_5000, BOGO, FREE_SHIPPING, MIRACLE_SALE] = COUPONS;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('5000원 할인 쿠폰 테스트', () => {
    const ITEMS: CartItem[] = [
      {
        ...NIKE,
        quantity: 1,
        product: {
          ...NIKE.product,
          price: 100000,
        },
      },
    ];

    it('주문 금액이 최소 주문 금액(100000원) 미만이면, 쿠폰을 사용할 수 없다', () => {
      const INVALID_ITEMS = [{ ...ITEMS[0], product: { ...ITEMS[0].product, price: ITEMS[0].product.price - 100 } }];

      vi.setSystemTime(new Date(FIXED_5000.expirationDate));

      const { result } = renderAvailableCoupon(INVALID_ITEMS, [INVALID_ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();

        expect(coupons.includes(FIXED_5000)).toBeFalsy();
      });
    });

    it.each([
      { date: new Date('2024-12-1'), isValid: false },
      { date: new Date('2024-11-30'), isValid: true },
      { date: new Date('2024-11-29'), isValid: true },
    ])('쿠폰은 만료 기간안에 사용해야 한다. (사용 기간:%s)', ({ date, isValid }) => {
      vi.setSystemTime(date);

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(FIXED_5000)).toBe(isValid);
      });
    });

    it('주문 금액이 최소 주문 금액 이상이고 만료일 이전이라면, 쿠폰을 사용할 수 있다.', () => {
      vi.setSystemTime(new Date(FIXED_5000.expirationDate));

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(FIXED_5000)).toBeTruthy();
      });
    });
  });

  describe('2+1 쿠폰 테스트', () => {
    const ITEMS: CartItem[] = [
      {
        ...NIKE,
        quantity: 3,
        product: {
          ...NIKE.product,
          price: 1000,
        },
      },
    ];

    it.each([
      { date: new Date('2024-5-31'), isValid: false },
      { date: new Date('2024-5-30'), isValid: true },
      { date: new Date('2024-5-29'), isValid: true },
    ])('쿠폰은 만료 기간안에 사용해야 한다. (사용 기간:%s)', ({ date, isValid }) => {
      vi.setSystemTime(date);

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(BOGO)).toBe(isValid);
      });
    });

    it.each([
      { quantity: 2, isValid: false },
      { quantity: 3, isValid: true },
      { quantity: 4, isValid: true },
    ])('수량이 3개 이상인 상품이 선택되어야 쿠폰을 사용할 수 있다.(수량: %s)', ({ quantity, isValid }) => {
      const testItems = [{ ...ITEMS[0], quantity }];

      vi.setSystemTime(new Date(BOGO.expirationDate));

      const { result } = renderAvailableCoupon(testItems, [testItems[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(BOGO)).toBe(isValid);
      });
    });

    it('수량이 3개 이상인 상품이 존재하고 만료일 이전이라면 쿠폰을 사용할 수 있다.', () => {
      vi.setSystemTime(new Date(BOGO.expirationDate));

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();

        expect(coupons.includes(BOGO)).toBeTruthy();
      });
    });
  });
  describe('5만원 이상 구매 시 무료 배송 쿠폰 테스트', () => {
    const ITEMS: CartItem[] = [
      {
        ...NIKE,
        quantity: 1,
        product: {
          ...NIKE.product,
          price: 50000,
        },
      },
    ];

    it('주문 금액이 최소 주문 금액(5만원) 미만이면, 쿠폰을 사용할 수 없다', () => {
      const INVALID_ITEMS = [{ ...ITEMS[0], product: { ...ITEMS[0].product, price: ITEMS[0].product.price - 100 } }];

      vi.setSystemTime(new Date(FREE_SHIPPING.expirationDate));

      const { result } = renderAvailableCoupon(INVALID_ITEMS, [INVALID_ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();

        expect(coupons.includes(FREE_SHIPPING)).toBeFalsy();
      });
    });

    it.each([
      { date: new Date('2024-09-01'), isValid: false },
      { date: new Date('2024-08-31'), isValid: true },
      { date: new Date('2024-08-30'), isValid: true },
    ])('쿠폰은 만료 기간안에 사용해야 한다. (사용 기간:%s)', ({ date, isValid }) => {
      vi.setSystemTime(date);

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(FREE_SHIPPING)).toBe(isValid);
      });
    });

    it('주문 금액이 최소 주문 금액 이상이고 만료일 이전이라면, 쿠폰을 사용할 수 있다.', () => {
      vi.setSystemTime(new Date(FREE_SHIPPING.expirationDate));

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(FREE_SHIPPING)).toBeTruthy();
      });
    });
  });

  describe('미라클모닝 30% 할인 쿠폰 테스트', () => {
    const ITEMS: CartItem[] = [
      {
        ...NIKE,
        quantity: 3,
        product: {
          ...NIKE.product,
          price: 50000,
        },
      },
    ];

    it.each([
      { date: new Date('2024-08-01'), isValid: false },
      { date: new Date('2024-07-31T04:00:01'), isValid: true },
      { date: new Date('2024-07-30T04:00:01'), isValid: true },
    ])('쿠폰은 만료 기간안에 사용해야 한다. (사용 기간:%s)', ({ date, isValid }) => {
      vi.setSystemTime(date);

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(MIRACLE_SALE)).toBe(isValid);
      });
    });

    it.each([
      { date: new Date('2024-05-21T03:59:59'), isValid: false },
      { date: new Date('2024-05-21T07:00:01'), isValid: false },
      { date: new Date('2024-05-21T04:00:01'), isValid: true },
      { date: new Date('2024-05-21T06:59:59'), isValid: true },
    ])('쿠폰은 오전4~7시에 사용할 수 있다,(사용 시간: %s)', ({ date, isValid }) => {
      vi.setSystemTime(date);

      const { result } = renderAvailableCoupon(ITEMS, [ITEMS[0].id]);
      const { getAvailableCoupons } = result.current;

      act(() => {
        const coupons = getAvailableCoupons();
        expect(coupons.includes(MIRACLE_SALE)).toBe(isValid);
      });
    });
  });
});
