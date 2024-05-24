import { CartItem } from '@appTypes/shoppingCart';
import { useMaxDiscountCalculator } from '@hooks/coupon';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { COUPONS } from './mockData/coupon';
import { renderCouponHookWithRecoilRoot } from './utils';

const [FIXED_5000, BOGO, FREE_SHIPPING, MIRACLE_SALE] = COUPONS;

const TEST_ITEMS: CartItem[] = [
  {
    id: 106,
    quantity: 3,
    product: {
      id: 2,
      name: '나이키',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 306,
    quantity: 3,
    product: {
      id: 3,
      name: '아디다스',
      price: 15000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];

const TEST_ITEM_IDS = TEST_ITEMS.map((item) => item.id);

const renderCouponDiscount = () =>
  renderCouponHookWithRecoilRoot(() => useMaxDiscountCalculator(), TEST_ITEMS, TEST_ITEM_IDS);

describe('쿠폰 적용 시, 최대 할인 금액 테스트', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it('사용한 쿠폰에 따라 누적된 할인 금액을 반환한다.', () => {
    const EXPECTED_MAX_DISCOUNT_AMOUNT = 5000;

    vi.setSystemTime(new Date('2024-05-22T08:10:00'));

    const { result } = renderCouponDiscount();
    const maxDiscountAmount = result.current.getMaxDiscountAmount([FIXED_5000, FREE_SHIPPING]);

    expect(maxDiscountAmount).toBe(EXPECTED_MAX_DISCOUNT_AMOUNT);
  });
  it('2개의 쿠폰 적용 시,최종 금액은 할인 금액이 더 큰 값을 기준으로 계산하여 보여준다.', () => {
    const EXPECTED_MAX_DISCOUNT_AMOUNT = 51500;

    vi.setSystemTime(new Date('2024-05-22T04:10:00'));

    const { result } = renderCouponDiscount();
    const maxDiscountAmount = result.current.getMaxDiscountAmount([MIRACLE_SALE, BOGO]);

    expect(maxDiscountAmount).toBe(EXPECTED_MAX_DISCOUNT_AMOUNT);
  });
});
