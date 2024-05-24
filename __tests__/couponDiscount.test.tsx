import { CartItem } from '@appTypes/shoppingCart';
import { useCouponDiscount } from '@hooks/coupon';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ADIDAS, ASICS, NIKE } from './mockData';
import { renderCouponHookWithRecoilRoot } from './utils';
//주문 금액: 73,000원
const TEST_ITEMS: CartItem[] = [
  {
    ...NIKE,
    quantity: 3,
    product: {
      ...NIKE.product,
      price: 1000,
    },
  },
  {
    ...ADIDAS,
    quantity: 2,
    product: {
      ...ADIDAS.product,
      price: 20000,
    },
  },
  {
    ...ASICS,
    quantity: 1,
    product: {
      ...ASICS.product,
      price: 30000,
    },
  },
];
const TEST_ITEM_IDS = TEST_ITEMS.map((item) => item.id);
const TEST_ITEMS_TOTAL_AMOUNTS = TEST_ITEMS.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);

const renderCouponDiscount = (selectedItemIds: number[], isSurchargeShippingFee?: boolean) =>
  renderCouponHookWithRecoilRoot(() => useCouponDiscount(), TEST_ITEMS, selectedItemIds, isSurchargeShippingFee);

describe('쿠폰 할인 금액 테스트', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-05-22T04:10:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('5,000 원 할인 쿠폰을 사용하면, 5,000원이 할인된다.', () => {
    const EXPECT_DISCOUNT = 5000;

    const { result } = renderCouponDiscount(TEST_ITEM_IDS);
    const { calculateCouponDiscount } = result.current;

    expect(calculateCouponDiscount('FIXED5000')).toBe(EXPECT_DISCOUNT);
  });

  describe('2개 구매 시 1개 무료 쿠폰 테스트', () => {
    it('2개 구매 시 1개 무료 쿠폰 사용 시, 수량 1개에 대한 가격만큼 할인된다.', () => {
      const EXPECT_DISCOUNT = TEST_ITEMS[0].product.price;

      const { result } = renderCouponDiscount([TEST_ITEM_IDS[0]]);
      const { calculateCouponDiscount } = result.current;

      expect(calculateCouponDiscount('BOGO')).toBe(EXPECT_DISCOUNT);
    });

    it('2개 구매 시 1개 무료 쿠폰 사용 시, 적용 대상인 여러 상품 중 가격이 가장 높은 상품의 가격 만큼 할인된다.', () => {
      const EXPECT_DISCOUNT = TEST_ITEMS[1].product.price;

      const { result } = renderCouponDiscount(TEST_ITEM_IDS);
      const { calculateCouponDiscount } = result.current;

      expect(calculateCouponDiscount('BOGO')).toBe(EXPECT_DISCOUNT);
    });
  });

  describe('5만원 이상 구매 시 무료 배송 쿠폰 사용 시, 배송비가 무료이다.', () => {
    it('기본 배송비가 있는 경우, 기본 배송비만큼 할인된다.', () => {
      const EXPECT_DISCOUNT = 3000;

      const { result } = renderCouponDiscount(TEST_ITEM_IDS);
      const { calculateCouponDiscount } = result.current;

      expect(calculateCouponDiscount('FREESHIPPING')).toBe(EXPECT_DISCOUNT);
    });

    it('제주도 및 도서 산각 지역에 대한 추가 배송비가 있더고, 배송비가 무료이다.', () => {
      const EXPECT_DISCOUNT = 3000 + 3000;

      const { result } = renderCouponDiscount(TEST_ITEM_IDS, true);
      const { calculateCouponDiscount } = result.current;

      expect(calculateCouponDiscount('FREESHIPPING')).toBe(EXPECT_DISCOUNT);
    });
  });

  it('미라클모닝 30% 할인 쿠폰을 사용하면 주문 가격의 30% 할인된다.', () => {
    const EXPECT_DISCOUNT = TEST_ITEMS_TOTAL_AMOUNTS * 0.3;

    const { result } = renderCouponDiscount(TEST_ITEM_IDS);
    const { calculateCouponDiscount } = result.current;

    expect(calculateCouponDiscount('MIRACLESALE', TEST_ITEMS_TOTAL_AMOUNTS)).toBe(EXPECT_DISCOUNT);
  });
});
