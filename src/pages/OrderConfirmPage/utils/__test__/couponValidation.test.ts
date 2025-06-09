import { validateBasicCouponConditions, validateCouponUsage } from "../couponValidation";
import { CouponData, OrderItem } from "../../types";

describe("쿠폰 유효성 검증 테스트", () => {
  const mockOrderItems: OrderItem[] = [
    {
      id: 1,
      quantity: 2,
      product: { id: 1, name: "Product 1", price: 50000, imageUrl: "img1.jpg" },
    },
    {
      id: 2,
      quantity: 1,
      product: { id: 2, name: "Product 2", price: 80000, imageUrl: "img2.jpg" },
    },
  ];

  describe("기본 쿠폰 조건 검증", () => {
    const baseCoupon: CouponData = {
      id: 1,
      code: "TEST",
      description: "테스트 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "fixed",
      discount: 5000,
    };

    describe("만료일 검증", () => {
      it("유효한 만료일인 경우 통과해야 한다", () => {
        const coupon = { ...baseCoupon, expirationDate: "2025-12-31" };
        const result = validateBasicCouponConditions(coupon, 100000);
        expect(result.isValid).toBe(true);
      });

      it("만료된 쿠폰인 경우 실패해야 한다", () => {
        const coupon = { ...baseCoupon, expirationDate: "2024-01-01" };
        const result = validateBasicCouponConditions(coupon, 100000);
        expect(result.isValid).toBe(false);
      });
    });

    describe("최소 주문 금액 검증", () => {
      it("최소 주문 금액을 충족하는 경우 통과해야 한다", () => {
        const coupon = { ...baseCoupon, minimumAmount: 50000 };
        const result = validateBasicCouponConditions(coupon, 100000);
        expect(result.isValid).toBe(true);
      });

      it("최소 주문 금액을 충족하지 않는 경우 실패해야 한다", () => {
        const coupon = { ...baseCoupon, minimumAmount: 150000 };
        const result = validateBasicCouponConditions(coupon, 100000);
        expect(result.isValid).toBe(false);
      });

      it("최소 주문 금액이 설정되지 않은 경우 통과해야 한다", () => {
        const coupon = { ...baseCoupon };
        const result = validateBasicCouponConditions(coupon, 10000);
        expect(result.isValid).toBe(true);
      });

      describe("경계값 테스트", () => {
        it("최소 주문 금액과 정확히 같은 경우 통과해야 한다", () => {
          const coupon = { ...baseCoupon, minimumAmount: 100000 };
          const result = validateBasicCouponConditions(coupon, 100000);
          expect(result.isValid).toBe(true);
        });

        it("최소 주문 금액보다 1원 적은 경우 실패해야 한다", () => {
          const coupon = { ...baseCoupon, minimumAmount: 100000 };
          const result = validateBasicCouponConditions(coupon, 99999);
          expect(result.isValid).toBe(false);
        });
      });
    });
  });

  describe("BOGO(Buy X Get Y) 쿠폰 검증", () => {
    const bogoCoupon: CouponData = {
      id: 2,
      code: "BOGO",
      description: "2개 구매 시 1개 무료",
      expirationDate: "2025-12-31",
      discountType: "buyXgetY",
      buyQuantity: 2,
      getQuantity: 1,
    };

    it("2개 이상 구매한 상품이 있는 경우 통과해야 한다", () => {
      const result = validateCouponUsage({
        coupon: bogoCoupon,
        orderItems: mockOrderItems, // Product 1이 2개
        orderAmount: 180000,
        isIsolatedAreaSelected: false,
      });
      expect(result.isValid).toBe(true);
    });

    it("모든 상품이 1개씩만 있는 경우 실패해야 한다", () => {
      const singleItems: OrderItem[] = [
        { id: 1, quantity: 1, product: { id: 1, name: "Product 1", price: 50000, imageUrl: "img1.jpg" } },
        { id: 2, quantity: 1, product: { id: 2, name: "Product 2", price: 80000, imageUrl: "img2.jpg" } },
      ];

      const result = validateCouponUsage({
        coupon: bogoCoupon,
        orderItems: singleItems,
        orderAmount: 130000,
        isIsolatedAreaSelected: false,
      });
      expect(result.isValid).toBe(false);
    });
  });

  describe("무료배송 쿠폰 검증", () => {
    const freeShippingCoupon: CouponData = {
      id: 3,
      code: "FREESHIP",
      description: "무료배송 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "freeShipping",
      minimumAmount: 50000,
    };

    describe("일반 지역 배송", () => {
      it("10만원 미만 주문 시 무료배송 쿠폰 적용 가능해야 한다", () => {
        const result = validateCouponUsage({
          coupon: freeShippingCoupon,
          orderItems: mockOrderItems,
          orderAmount: 80000,
          isIsolatedAreaSelected: false,
        });
        expect(result.isValid).toBe(true);
      });

      it("10만원 이상 주문 시 무료배송 쿠폰 적용 불가해야 한다 (이미 무료배송)", () => {
        const result = validateCouponUsage({
          coupon: freeShippingCoupon,
          orderItems: mockOrderItems,
          orderAmount: 150000,
          isIsolatedAreaSelected: false,
        });
        expect(result.isValid).toBe(false);
      });
    });

    describe("제주도 지역 배송", () => {
      it("10만원 이상이지만 제주도 선택 시 무료배송 쿠폰 적용 가능해야 한다", () => {
        const result = validateCouponUsage({
          coupon: freeShippingCoupon,
          orderItems: mockOrderItems,
          orderAmount: 150000,
          isIsolatedAreaSelected: true,
        });
        expect(result.isValid).toBe(true);
      });

      it("10만원 미만 제주도 주문 시 무료배송 쿠폰 적용 가능해야 한다", () => {
        const result = validateCouponUsage({
          coupon: freeShippingCoupon,
          orderItems: mockOrderItems,
          orderAmount: 80000,
          isIsolatedAreaSelected: true,
        });
        expect(result.isValid).toBe(true);
      });
    });

    describe("경계값 테스트", () => {
      it("정확히 10만원 주문 시 일반 지역은 무료배송 쿠폰 적용 불가해야 한다", () => {
        const result = validateCouponUsage({
          coupon: freeShippingCoupon,
          orderItems: mockOrderItems,
          orderAmount: 100000,
          isIsolatedAreaSelected: false,
        });
        expect(result.isValid).toBe(false);
      });

      it("정확히 10만원 주문 시 제주도는 무료배송 쿠폰 적용 가능해야 한다", () => {
        const result = validateCouponUsage({
          coupon: freeShippingCoupon,
          orderItems: mockOrderItems,
          orderAmount: 100000,
          isIsolatedAreaSelected: true,
        });
        expect(result.isValid).toBe(true);
      });
    });
  });
});
