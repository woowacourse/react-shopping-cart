import {
  isExpired,
  isMinimumAmount,
  isMiracleMorning,
  isQuantity,
  validateCoupons,
} from '../couponValidate.ts';
import mockCoupon from '../../mocks/mockCoupon.json';
import { Coupon } from '../../types/coupon';

describe('쿠폰 단위 유효성 검사 성공 테스트', () => {
  it('날짜 유효성 검사', () => {
    const coupon = {
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      expirationDate: '2025-07-01',
      id: 1,
      minimumAmount: 100000,
    };
    const result = isExpired(coupon.expirationDate);
    expect(result).toBe(true);
  });

  it('미라클모닝 쿠폰 유효성 검사', () => {
    const coupon = {
      availableTime: {
        start: '04:00:00',
        end: '09:00:00',
      },
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      discount: 30,
      discountType: 'percentage',
      expirationDate: '2025-07-31',
      id: 4,
    };
    const result = isMiracleMorning(
      coupon.availableTime.start,
      coupon.availableTime.end
    );
    expect(result).toBe(true);
  });

  it('최소 주문 금액 검사', () => {
    const coupon = {
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      expirationDate: '2025-07-01',
      id: 1,
      minimumAmount: 100000,
    };
    const result = isMinimumAmount(coupon.minimumAmount, 100000);
    expect(result).toBe(true);
  });

  it('상품 개수 검사', () => {
    const cartItems = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = isQuantity(cartItems);
    expect(result).toBe(true);
  });
});

describe('쿠폰 단위 유효성 검사 실패 테스트', () => {
  it('쿠폰 만료 날짜 검사', () => {
    const coupon = {
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      expirationDate: '2025-06-01',
      id: 1,
      minimumAmount: 100000,
    };
    const result = isExpired(coupon.expirationDate);
    expect(result).toBe(false);
  });

  it('미라클모닝 쿠폰 유효성 검사', () => {
    const coupon = {
      availableTime: {
        start: '07:00:00',
        end: '07:00:00',
      },
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      discount: 30,
      discountType: 'percentage',
      expirationDate: '2025-07-31',
      id: 4,
    };
    const result = isMiracleMorning(
      coupon.availableTime.start,
      coupon.availableTime.end
    );
    expect(result).toBe(false);
  });

  it('최소 주문 금액 검사', () => {
    const coupon = {
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      expirationDate: '2025-07-01',
      id: 1,
      minimumAmount: 100000,
    };
    const result = isMinimumAmount(coupon.minimumAmount, 99999);
    expect(result).toBe(false);
  });

  it('상품 개수 검사', () => {
    const cartItems = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = isQuantity(cartItems);
    expect(result).toBe(false);
  });
});

describe('쿠폰 조합 유효성 검사 성공 테스트', () => {
  it('모든 유효성 검사 통과', () => {
    const couponList = mockCoupon as Coupon[];
    const selectedItems = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = validateCoupons(couponList, 500000, selectedItems);
    expect(result[0].isExpired).toBe(false);
    expect(result[1].isExpired).toBe(false);
    expect(result[2].isExpired).toBe(false);
    expect(result[3].isExpired).toBe(false);
  });
});

describe('쿠폰 조합 유효성 검사 실패 테스트', () => {
  it('쿠폰 만료 날짜 검사', () => {
    const couponList = mockCoupon as Coupon[];
    couponList[0].expirationDate = '2025-06-01';
    const selectedItems = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = validateCoupons(couponList, 500000, selectedItems);
    expect(result[0].isExpired).toBe(true);
    expect(result[1].isExpired).toBe(false);
    expect(result[2].isExpired).toBe(false);
    expect(result[3].isExpired).toBe(false);
  });

  it('미라클모닝 쿠폰 유효성 검사', () => {
    const couponList = mockCoupon as Coupon[];
    couponList[0].expirationDate = '2025-07-01';
    couponList[3].availableTime = {
      start: '04:00:00',
      end: '07:00:00',
    };
    console.log(couponList[0]);
    const selectedItems = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = validateCoupons(couponList, 500000, selectedItems);
    expect(result[0].isExpired).toBe(false);
    expect(result[1].isExpired).toBe(false);
    expect(result[2].isExpired).toBe(false);
    expect(result[3].isExpired).toBe(true);
  });

  it('최소 주문 금액 검사', () => {
    const couponList = mockCoupon as Coupon[];
    couponList[3].availableTime = {
      start: '04:00:00',
      end: '11:00:00',
    };
    const selectedItems = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = validateCoupons(couponList, 1000, selectedItems);
    expect(result[0].isExpired).toBe(true);
    expect(result[1].isExpired).toBe(false);
    expect(result[2].isExpired).toBe(true);
    expect(result[3].isExpired).toBe(false);
  });

  it('상품 개수 검사', () => {
    const couponList = mockCoupon as Coupon[];
    const selectedItems = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
    const result = validateCoupons(couponList, 500000, selectedItems);
    expect(result[0].isExpired).toBe(false);
    expect(result[1].isExpired).toBe(true);
    expect(result[2].isExpired).toBe(false);
    expect(result[3].isExpired).toBe(false);
  });
});
