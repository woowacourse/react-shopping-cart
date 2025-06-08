import { CouponCalculator } from "../src/utils/couponCalculator";
import { OrderService } from "../src/services/orderService";
import { Coupon } from "../src/types/coupon";

/**
 * 실제 비즈니스 시나리오를 기반으로 한 통합 테스트
 */
describe("쿠폰 시스템 통합 테스트", () => {
  let originalDate: typeof Date;

  beforeEach(() => {
    originalDate = global.Date;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  const coupons = {
    fixed5000: {
      id: 1,
      code: "FIXED5000",
      description: "5,000원 할인 쿠폰 (FIXED5000)",
      discountType: "fixed" as const,
      discount: 5000,
      minimumAmount: 100000,
      expirationDate: "2025-11-30",
    },
    bogo: {
      id: 2,
      code: "BOGO",
      description: "2+1 쿠폰 (BOGO)",
      discountType: "buyXgetY" as const,
      buyQuantity: 2,
      getQuantity: 1,
      expirationDate: "2025-06-30",
    },
    freeShipping: {
      id: 3,
      code: "FREESHIPPING",
      description: "무료 배송 쿠폰 (FREESHIPPING)",
      discountType: "freeShipping" as const,
      minimumAmount: 50000,
      expirationDate: "2025-08-31",
    },
    miracleSale: {
      id: 4,
      code: "MIRACLESALE",
      description: "30% 시간제 할인 쿠폰 (MIRACLESALE)",
      discountType: "percentage" as const,
      discount: 30,
      availableTime: { start: "04:00", end: "07:00" },
      expirationDate: "2025-07-31",
    },
  } satisfies Record<string, Coupon>;

  describe("실제 쇼핑 시나리오", () => {
    it("시나리오 1: 새벽 4시, 고액 주문, 도서산간", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "상품1",
            price: 10000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 2,
        },
        {
          id: 2,
          product: {
            id: 2,
            name: "상품2",
            price: 20000,
            imageUrl: "image2",
            category: "category2",
          },
          quantity: 1,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, false);
      const availableCoupons = Object.values(coupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons as Coupon[],
        orderInfo
      );

      expect(result.appliedCoupons.length).toBe(1);
      expect(result.appliedCoupons[0].id).toBe(2);
      expect(result.totalDiscount).toBe(10000);
      expect(result.finalOrderAmount).toBe(30000);
      expect(result.finalDeliveryFee).toBe(3000);
    });

    it("시나리오 2: 평상시, 고액 주문에서 최적 조합 적용", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "고가상품",
            price: 50000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 2,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, false);
      const availableCoupons = Object.values(coupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons as Coupon[],
        orderInfo
      );

      expect(result.appliedCoupons.length).toBe(2);
      expect(result.totalDiscount).toBe(55000);
      expect(result.finalOrderAmount).toBe(45000);
      expect(result.finalDeliveryFee).toBe(0);

      const appliedTypes = result.appliedCoupons.map((c) => c.discountType);
      expect(appliedTypes).toContain("buyXgetY");
      expect(appliedTypes).toContain("fixed");
    });

    it("시나리오 3: 새벽 시간, 미라클 모닝 쿠폰 적용", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 5,
      })) as unknown as DateConstructor;

      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "고가상품",
            price: 50000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 3,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, false);
      const availableCoupons = Object.values(coupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons as Coupon[],
        orderInfo
      );

      expect(result.totalDiscount).toBe(95000);
      expect(result.appliedCoupons.length).toBe(2);

      const appliedTypes = result.appliedCoupons.map((c) => c.discountType);
      expect(appliedTypes).toContain("percentage");
      expect(appliedTypes).toContain("buyXgetY");
    });

    it("시나리오 4: 소액 주문, 무료배송 쿠폰만 적용", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "소액상품",
            price: 30000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 2,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, true);
      const availableCoupons = Object.values(coupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons as Coupon[],
        orderInfo
      );

      const totalBenefit = result.totalDiscount + result.deliveryDiscount;
      expect(totalBenefit).toBe(36000);
      expect(result.appliedCoupons.length).toBe(2);

      const appliedTypes = result.appliedCoupons.map((c) => c.discountType);
      expect(appliedTypes).toContain("buyXgetY");
      expect(appliedTypes).toContain("freeShipping");
    });
  });

  describe("배송비 정책 통합 테스트", () => {
    it("무료배송 쿠폰과 도서산간 지역", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "상품",
            price: 30000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 2,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, true);

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [coupons.freeShipping],
        orderInfo
      );

      expect(result.deliveryDiscount).toBe(6000);
      expect(result.finalDeliveryFee).toBe(0);
    });

    it("원주문 금액 기준 무료배송 유지", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 5,
      })) as unknown as DateConstructor;

      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "상품",
            price: 100000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 1,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, false);

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [coupons.miracleSale],
        orderInfo
      );

      expect(result.finalOrderAmount).toBe(70000);
      expect(result.finalDeliveryFee).toBe(0);
    });

    it("고액 주문에서 도서산간비만 할인", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "고가상품",
            price: 150000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 1,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, true);

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [coupons.freeShipping],
        orderInfo
      );

      expect(result.deliveryDiscount).toBe(3000);
      expect(result.finalDeliveryFee).toBe(0);
    });
  });

  describe("쿠폰 조합 제한 검증", () => {
    it("최대 2개 쿠폰까지만 적용", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 5,
      })) as unknown as DateConstructor;

      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "상품",
            price: 50000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 4,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, true);
      const availableCoupons = Object.values(coupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons as Coupon[],
        orderInfo
      );

      expect(result.appliedCoupons.length).toBeLessThanOrEqual(2);
    });

    it("중복 배송비 할인 방지", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "상품",
            price: 30000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 2,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, false);

      const duplicateFreeShipping = {
        ...coupons.freeShipping,
        id: 5,
        code: "FREESHIPPING2",
      };

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [coupons.freeShipping, duplicateFreeShipping],
        orderInfo
      );

      expect(result.appliedCoupons.length).toBe(1);
      expect(result.deliveryDiscount).toBe(3000);
    });
  });

  describe("에지 케이스", () => {
    it("쿠폰 조건을 모두 만족하지 않는 경우", () => {
      const cartItems = [
        {
          id: 1,
          product: {
            id: 1,
            name: "소액상품",
            price: 10000,
            imageUrl: "image1",
            category: "category1",
          },
          quantity: 1,
        },
      ];

      const orderInfo = OrderService.createOrderInfo(cartItems, false);
      const availableCoupons = Object.values(coupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons as Coupon[],
        orderInfo
      );

      expect(result.appliedCoupons.length).toBe(0);
      expect(result.totalDiscount).toBe(0);
      expect(result.deliveryDiscount).toBe(0);
    });
  });
});
