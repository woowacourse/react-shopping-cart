import { isCouponValid } from '@/features/Coupon/utils/validateCoupon';
import { vi } from 'vitest';
import { CouponResponse } from '@/features/Coupon/types/Coupon.types';
import { CartItem } from '@/features/Cart/types/Cart.types';

describe('isCouponValid', () => {
  const baseCartItems: CartItem[] = [
    {
      id: 1,
      isChecked: true,
      quantity: 2,
      product: {
        id: 1,
        name: '상품1',
        price: 60000,
        imageUrl: '',
        category: '식료품',
        quantity: 10,
      },
    },
  ];

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('FIXED5000 쿠폰은 최소 금액 100000 이상일 때만 유효하다', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00'));

    const coupon: CouponResponse = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2025-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    };

    expect(isCouponValid(coupon, baseCartItems, 120000)).toBe(true);
    expect(isCouponValid(coupon, baseCartItems, 90000)).toBe(false);
  });

  it('BOGO 쿠폰은 최소 구매 수량을 만족해야 유효하다', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00'));

    const coupon: CouponResponse = {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: '2025-06-30',
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
    };

    expect(isCouponValid(coupon, baseCartItems, 0)).toBe(true);

    const notEnough: CartItem[] = [
      {
        ...baseCartItems[0],
        quantity: 1,
      },
    ];
    expect(isCouponValid(coupon, notEnough, 0)).toBe(false);
  });

  it('FREESHIPPING 쿠폰은 최소 금액을 만족해야 유효하다', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00'));

    const coupon: CouponResponse = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      expirationDate: '2025-08-31',
      minimumAmount: 50000,
      discountType: 'freeShipping',
    };

    expect(isCouponValid(coupon, baseCartItems, 60000)).toBe(true);
    expect(isCouponValid(coupon, baseCartItems, 40000)).toBe(false);
  });

  it('MIRACLESALE 쿠폰은 시간대 조건을 만족할 때만 유효하다', () => {
    const coupon: CouponResponse = {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2025-07-31',
      discount: 30,
      discountType: 'percentage',
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
    };

    vi.setSystemTime(new Date('2025-06-10T05:30:00'));
    expect(isCouponValid(coupon, baseCartItems, 120000)).toBe(true);

    vi.setSystemTime(new Date('2025-06-10T07:30:00'));
    expect(isCouponValid(coupon, baseCartItems, 120000)).toBe(false);
  });

  it('만료된 쿠폰은 어떤 조건이든 무효하다', () => {
    vi.setSystemTime(new Date('2025-12-01T12:00:00'));

    const expiredCoupon: CouponResponse = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2025-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    };

    expect(isCouponValid(expiredCoupon, baseCartItems, 120000)).toBe(false);
  });
});
