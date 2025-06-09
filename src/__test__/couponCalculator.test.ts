import { Cart, Category } from "../api/cart";
import { Coupon } from "../api/coupon";
import { calculateCouponDiscount } from "../pages/order-confirm/order-contents/pay-contents/coupon-modal-content/utils/couponCalculator";

jest.mock("../api/cart", () => ({
  Category: {
    식료품: "식료품",
    패션잡화: "패션잡화",
  },
}));

jest.mock("../api/coupon", () => ({
  Coupon: jest.fn(),
}));

describe("쿠폰 할인 계산", () => {
  const mockCartItems: Cart[] = [
    {
      id: "1",
      quantity: 2,
      product: {
        id: "1",
        name: "상품1",
        price: 10000,
        imageUrl: "image1.jpg",
        quantity: 20,
        category: Category.식료품,
      },
    },
    {
      id: "2",
      quantity: 1,
      product: {
        id: "2",
        name: "상품2",
        price: 20000,
        imageUrl: "image2.jpg",
        quantity: 20,
        category: Category.패션잡화,
      },
    },
  ];

  describe("고정 할인 쿠폰", () => {
    it("최소 주문 금액을 만족할 때 할인이 적용된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "FIXED1000",
        description: "1,000원 할인",
        expirationDate: [2024, 12, 31],
        discountType: "fixed",
        discount: 1000,
        minimumAmount: 10000,
      };

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        mockCartItems
      );

      expect(result.totalDiscount).toBe(1000);
      expect(result.finalDiscount).toBe(1000);
    });

    it("최소 주문 금액을 만족하지 않으면 할인이 적용되지 않는다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "FIXED1000",
        description: "1,000원 할인",
        expirationDate: [2024, 12, 31],
        discountType: "fixed",
        discount: 1000,
        minimumAmount: 50000,
      };

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        mockCartItems
      );

      expect(result.totalDiscount).toBe(0);
      expect(result.finalDiscount).toBe(0);
    });
  });

  describe("퍼센트 할인 쿠폰", () => {
    it("주문 금액에 대한 퍼센트 할인이 적용된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "PERCENT10",
        description: "10% 할인",
        expirationDate: [2024, 12, 31],
        discountType: "percentage",
        discount: 10,
      };

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        mockCartItems
      );

      expect(result.totalDiscount).toBe(3000);
      expect(result.finalDiscount).toBe(3000);
    });

    it("시간 제한이 있는 퍼센트 할인 쿠폰도 동일하게 적용된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "PERCENT10",
        description: "10% 할인",
        expirationDate: [2024, 12, 31],
        discountType: "percentage",
        discount: 10,
        availableTime: {
          start: "00:00",
          end: "23:59",
        },
      };

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        mockCartItems
      );

      expect(result.totalDiscount).toBe(3000);
      expect(result.finalDiscount).toBe(3000);
    });
  });

  describe("무료 배송 쿠폰", () => {
    it("최소 주문 금액을 만족할 때 배송비가 무료가 된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "FREESHIP",
        description: "무료 배송",
        expirationDate: [2024, 12, 31],
        discountType: "freeShipping",
        minimumAmount: 10000,
      };

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        mockCartItems
      );

      expect(result.hasFreeShipping).toBe(true);
      expect(result.finalShippingFee).toBe(0);
      expect(result.finalDiscount).toBe(3000);
    });

    it("최소 주문 금액을 만족하지 않으면 배송비가 무료가 되지 않는다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "FREESHIP",
        description: "무료 배송",
        expirationDate: [2024, 12, 31],
        discountType: "freeShipping",
        minimumAmount: 50000,
      };

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        mockCartItems
      );

      expect(result.hasFreeShipping).toBe(false);
      expect(result.finalShippingFee).toBe(3000);
      expect(result.finalDiscount).toBe(0);
    });
  });

  describe("쿠폰 조합", () => {
    it("여러 쿠폰을 동시에 적용할 수 있다", () => {
      const coupons: Coupon[] = [
        {
          id: "1",
          code: "FIXED1000",
          description: "1,000원 할인",
          expirationDate: [2024, 12, 31],
          discountType: "fixed",
          discount: 1000,
          minimumAmount: 10000,
        },
        {
          id: "2",
          code: "PERCENT10",
          description: "10% 할인",
          expirationDate: [2024, 12, 31],
          discountType: "percentage",
          discount: 10,
        },
      ];

      const result = calculateCouponDiscount(
        coupons,
        30000,
        3000,
        mockCartItems
      );

      expect(result.totalDiscount).toBe(4000);
      expect(result.finalDiscount).toBe(4000);
    });

    it("무료 배송 쿠폰과 다른 쿠폰을 함께 적용할 수 있다", () => {
      const coupons: Coupon[] = [
        {
          id: "1",
          code: "FIXED1000",
          description: "1,000원 할인",
          expirationDate: [2024, 12, 31],
          discountType: "fixed",
          discount: 1000,
          minimumAmount: 10000,
        },
        {
          id: "2",
          code: "FREESHIP",
          description: "무료 배송",
          expirationDate: [2024, 12, 31],
          discountType: "freeShipping",
          minimumAmount: 10000,
        },
      ];

      const result = calculateCouponDiscount(
        coupons,
        30000,
        3000,
        mockCartItems
      );

      expect(result.totalDiscount).toBe(1000);
      expect(result.hasFreeShipping).toBe(true);
      expect(result.finalShippingFee).toBe(0);
      expect(result.finalDiscount).toBe(4000);
    });
  });

  describe("N+1 쿠폰", () => {
    it("2+1 쿠폰이 적용될 때 3개 구매 시 1개가 무료가 된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "BUY2GET1",
        description: "2+1 쿠폰",
        expirationDate: [2024, 12, 31],
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
      };

      const cartItems: Cart[] = [
        {
          id: "1",
          quantity: 3,
          product: {
            id: "1",
            name: "상품1",
            price: 10000,
            imageUrl: "image1.jpg",
            quantity: 20,
            category: Category.식료품,
          },
        },
      ];

      const result = calculateCouponDiscount(
        [coupon],
        30000,
        3000,
        cartItems
      );

      expect(result.totalDiscount).toBe(10000);
      expect(result.finalDiscount).toBe(10000);
    });

    it("2+1 쿠폰이 적용될 때 2개 구매 시 할인이 적용되지 않는다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "BUY2GET1",
        description: "2+1 쿠폰",
        expirationDate: [2024, 12, 31],
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
      };

      const cartItems: Cart[] = [
        {
          id: "1",
          quantity: 2,
          product: {
            id: "1",
            name: "상품1",
            price: 10000,
            imageUrl: "image1.jpg",
            quantity: 20,
            category: Category.식료품,
          },
        },
      ];

      const result = calculateCouponDiscount(
        [coupon],
        20000,
        3000,
        cartItems
      );

      expect(result.totalDiscount).toBe(0);
      expect(result.finalDiscount).toBe(0);
    });

    it("여러 상품 중 가장 비싼 상품에 2+1 쿠폰이 적용된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "BUY2GET1",
        description: "2+1 쿠폰",
        expirationDate: [2024, 12, 31],
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
      };

      const cartItems: Cart[] = [
        {
          id: "1",
          quantity: 3,
          product: {
            id: "1",
            name: "상품1",
            price: 10000,
            imageUrl: "image1.jpg",
            quantity: 20,
            category: Category.식료품,
          },
        },
        {
          id: "2",
          quantity: 3,
          product: {
            id: "2",
            name: "상품2",
            price: 20000,
            imageUrl: "image2.jpg",
            quantity: 20,
            category: Category.패션잡화,
          },
        },
      ];

      const result = calculateCouponDiscount(
        [coupon],
        90000,
        3000,
        cartItems
      );

      expect(result.totalDiscount).toBe(20000);
      expect(result.finalDiscount).toBe(20000);
    });

    it("3+1 쿠폰이 적용될 때 4개 구매 시 1개가 무료가 된다", () => {
      const coupon: Coupon = {
        id: "1",
        code: "BUY3GET1",
        description: "3+1 쿠폰",
        expirationDate: [2024, 12, 31],
        discountType: "buyXgetY",
        buyQuantity: 3,
        getQuantity: 1,
      };

      const cartItems: Cart[] = [
        {
          id: "1",
          quantity: 4,
          product: {
            id: "1",
            name: "상품1",
            price: 10000,
            imageUrl: "image1.jpg",
            quantity: 20,
            category: Category.식료품,
          },
        },
      ];

      const result = calculateCouponDiscount(
        [coupon],
        40000,
        3000,
        cartItems
      );

      expect(result.totalDiscount).toBe(10000);
      expect(result.finalDiscount).toBe(10000);
    });
  });
});
