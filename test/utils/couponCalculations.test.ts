import { describe, it, expect } from 'vitest';
import { calculateCouponDiscount } from '../../src/utils/couponCalculations';
import { CartProduct } from '../../src/types/cart';
import { Coupon } from '../../src/types/coupon';

describe('couponCalculations', () => {
  const mockProducts: CartProduct[] = [
    {
      id: 1,
      quantity: 3,
      product: {
        id: 1,
        name: '상품 A',
        price: 10000,
        imageUrl: '',
        category: '식료품',
      },
    },
    {
      id: 2,
      quantity: 2,
      product: {
        id: 2,
        name: '상품 B',
        price: 20000,
        imageUrl: '',
        category: '패션잡화',
      },
    },
  ];

  describe('calculateCouponDiscount', () => {
    it('쿠폰이 없으면 할인이 0원이다', () => {
      const discount = calculateCouponDiscount({
        coupons: [],
        products: mockProducts,
        total: 70000,
        shippingFee: 3000,
      });

      expect(discount).toBe(0);
    });

    it('여러 쿠폰의 할인 금액을 합산한다', () => {
      const coupons: Coupon[] = [
        {
          id: 1,
          code: 'FIXED5000',
          expirationDate: '2025-12-31',
          discountType: 'fixed',
          discount: 5000,
        },
        {
          id: 2,
          code: 'PERCENT10',
          expirationDate: '2025-12-31',
          discountType: 'percentage',
          discount: 10,
        },
      ];

      const discount = calculateCouponDiscount({
        coupons,
        products: mockProducts,
        total: 70000,
        shippingFee: 3000,
      });

      expect(discount).toBe(5000 + 7000);
    });
  });

  describe('fixed 타입 쿠폰', () => {
    it('고정 금액만큼 할인한다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'FIXED5000',
        expirationDate: '2025-12-31',
        discountType: 'fixed',
        discount: 5000,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 70000,
        shippingFee: 3000,
      });

      expect(discount).toBe(5000);
    });

    it('할인 금액이 없으면 0원을 반환한다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'FIXED_NO_DISCOUNT',
        expirationDate: '2025-12-31',
        discountType: 'fixed',
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 70000,
        shippingFee: 3000,
      });

      expect(discount).toBe(0);
    });
  });

  describe('percentage 타입 쿠폰', () => {
    it('주문 금액의 퍼센트만큼 할인한다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'PERCENT30',
        expirationDate: '2025-12-31',
        discountType: 'percentage',
        discount: 30,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 100000,
        shippingFee: 0,
      });

      expect(discount).toBe(30000); // 100000원의 30%
    });

    it('소수점은 버림 처리한다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'PERCENT15',
        expirationDate: '2025-12-31',
        discountType: 'percentage',
        discount: 15,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 33333,
        shippingFee: 0,
      });

      expect(discount).toBe(4999); // 33333 * 0.15 = 4999.95 → 4999
    });
  });

  describe('buyXgetY (BOGO) 타입 쿠폰', () => {
    it('2+1 쿠폰이 적용된다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'BOGO',
        expirationDate: '2025-12-31',
        discountType: 'buyXgetY',
        buyQuantity: 2,
        getQuantity: 1,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts, // 상품 A: 3개, 상품 B: 2개
        total: 70000,
        shippingFee: 0,
      });

      expect(discount).toBe(10000); // 상품 A 1개 무료
    });

    it('여러 상품이 조건을 만족하면 가장 비싼 상품에 적용된다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'BOGO',
        expirationDate: '2025-12-31',
        discountType: 'buyXgetY',
        buyQuantity: 2,
        getQuantity: 1,
      };

      const products: CartProduct[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: '상품 A',
            price: 10000,
            imageUrl: '',
            category: '',
          },
        },
        {
          id: 2,
          quantity: 3,
          product: {
            id: 2,
            name: '상품 B',
            price: 20000,
            imageUrl: '',
            category: '',
          },
        },
      ];

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products,
        total: 90000,
        shippingFee: 0,
      });

      expect(discount).toBe(20000); // 더 비싼 상품 B 1개 무료
    });

    it('수량이 부족하면 적용되지 않는다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'BOGO',
        expirationDate: '2025-12-31',
        discountType: 'buyXgetY',
        buyQuantity: 2,
        getQuantity: 1,
      };

      const products: CartProduct[] = [
        {
          id: 1,
          quantity: 2, // 3개 필요한데 2개만 있음
          product: {
            id: 1,
            name: '상품 A',
            price: 10000,
            imageUrl: '',
            category: '식료품',
          },
        },
      ];

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products,
        total: 20000,
        shippingFee: 0,
      });

      expect(discount).toBe(0);
    });

    it('여러 세트가 있으면 모두 적용된다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'BOGO',
        expirationDate: '2025-12-31',
        discountType: 'buyXgetY',
        buyQuantity: 2,
        getQuantity: 1,
      };

      const products: CartProduct[] = [
        {
          id: 1,
          quantity: 6, // 2세트 적용 가능
          product: {
            id: 1,
            name: '상품 A',
            price: 10000,
            imageUrl: '',
            category: '',
          },
        },
      ];

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products,
        total: 60000,
        shippingFee: 0,
      });

      expect(discount).toBe(20000); // 2개 무료
    });
  });

  describe('freeShipping 타입 쿠폰', () => {
    it('최소 주문 금액을 충족하면 배송비를 할인한다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'FREESHIPPING',
        expirationDate: '2025-12-31',
        discountType: 'freeShipping',
        minimumAmount: 50000,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 70000,
        shippingFee: 3000,
      });

      expect(discount).toBe(3000);
    });

    it('최소 주문 금액을 충족하지 못하면 할인이 없다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'FREESHIPPING',
        expirationDate: '2025-12-31',
        discountType: 'freeShipping',
        minimumAmount: 50000,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 40000,
        shippingFee: 3000,
      });

      expect(discount).toBe(0);
    });

    it('도서산간 지역 추가 배송비도 포함하여 할인한다', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'FREESHIPPING',
        expirationDate: '2025-12-31',
        discountType: 'freeShipping',
        minimumAmount: 50000,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 70000,
        shippingFee: 6000,
      });

      expect(discount).toBe(6000);
    });
  });

  describe('실제 쿠폰 시나리오', () => {
    it('FIXED5000 쿠폰 - 10만원 이상 주문 시 5000원 할인', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'FIXED5000',
        expirationDate: '2025-11-30',
        discountType: 'fixed',
        discount: 5000,
        minimumAmount: 100000,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 100000,
        shippingFee: 0,
      });

      expect(discount).toBe(5000);
    });

    it('MIRACLESALE 쿠폰 - 30% 할인', () => {
      const coupon: Coupon = {
        id: 1,
        code: 'MIRACLESALE',
        expirationDate: '2025-07-31',
        discountType: 'percentage',
        discount: 30,
      };

      const discount = calculateCouponDiscount({
        coupons: [coupon],
        products: mockProducts,
        total: 70000,
        shippingFee: 0,
      });

      expect(discount).toBe(21000); // 70000 * 0.3 = 21000
    });
  });

  describe('복합 쿠폰 적용', () => {
    it('고정 할인과 배송비 무료 쿠폰을 함께 사용한다', () => {
      const coupons: Coupon[] = [
        {
          id: 1,
          code: 'FIXED5000',
          expirationDate: '2025-12-31',
          discountType: 'fixed',
          discount: 5000,
        },
        {
          id: 2,
          code: 'FREESHIPPING',
          expirationDate: '2025-12-31',
          discountType: 'freeShipping',
          minimumAmount: 50000,
        },
      ];

      const discount = calculateCouponDiscount({
        coupons,
        products: mockProducts,
        total: 70000,
        shippingFee: 3000,
      });

      expect(discount).toBe(8000); // 5000 + 3000
    });

    it('퍼센트 할인과 BOGO 쿠폰을 함께 사용한다', () => {
      const coupons: Coupon[] = [
        {
          id: 1,
          code: 'PERCENT10',
          expirationDate: '2025-12-31',
          discountType: 'percentage',
          discount: 10,
        },
        {
          id: 2,
          code: 'BOGO',
          expirationDate: '2025-12-31',
          discountType: 'buyXgetY',
          buyQuantity: 2,
          getQuantity: 1,
        },
      ];

      const discount = calculateCouponDiscount({
        coupons,
        products: mockProducts,
        total: 70000,
        shippingFee: 0,
      });

      expect(discount).toBe(7000 + 10000); // 10% + BOGO
    });
  });
});
