import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { mockCouponData } from "@/mock/data";
import { useCouponCalculation } from "@/hooks/Coupon/useCouponCalculation";
import { SHIPPING_FEE } from "@/constants/priceSetting";

describe("useCouponCalculation", () => {
  const createCartItem = (
    price: number,
    quantity: number,
    id: string = "1"
  ): CartItem => ({
    id,
    product: {
      id,
      name: `Product ${id}`,
      price,
      imageUrl: "",
      category: "test",
      quantity: 100,
    },
    quantity,
  });

  // 실제 쿠폰 데이터 사용
  const coupons = mockCouponData;
  describe("useCouponCalculation는", () => {
    describe("기본 계산 - 쿠폰 없음", () => {
      it("쿠폰 없이 주문 총액과 배송비를 올바르게 계산해야 한다 (일반 지역)", () => {
        const cartItems = [
          createCartItem(30000, 2), // 60,000원
          createCartItem(20000, 1), // 20,000원
        ];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: [],
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.orderTotal).toBe(80000);
        expect(result.current.shippingFee).toBe(SHIPPING_FEE); // 10만원 미만이므로 배송비 발생
        expect(result.current.discountTotal).toBe(0);
        expect(result.current.finalTotal).toBe(80000 + SHIPPING_FEE);
        expect(result.current.appliedCoupons).toHaveLength(0);
      });

      it("쿠폰 없이 주문 총액과 배송비를 올바르게 계산해야 한다 (섬 지역)", () => {
        const cartItems = [createCartItem(50000, 1)];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: [],
            selectedShoppingCartItems: cartItems,
            isIsland: true,
          })
        );

        expect(result.current.orderTotal).toBe(50000);
        expect(result.current.shippingFee).toBe(SHIPPING_FEE + 3000); // 기본 배송비 + 섬 추가비용
        expect(result.current.finalTotal).toBe(50000 + SHIPPING_FEE + 3000);
      });

      it("무료 배송 기준 이상 주문 시 배송비 계산이 올바른지 확인 (일반 지역)", () => {
        const cartItems = [createCartItem(100000, 1)];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: [],
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.orderTotal).toBe(100000);
        expect(result.current.shippingFee).toBe(0); // FREE_SHIPPING_OVER 이상이므로 무료 배송
        expect(result.current.finalTotal).toBe(100000);
      });

      it("무료 배송 기준 이상 주문 시 배송비 계산이 올바른지 확인 (섬 지역)", () => {
        const cartItems = [createCartItem(100000, 1)];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: [],
            selectedShoppingCartItems: cartItems,
            isIsland: true,
          })
        );

        expect(result.current.orderTotal).toBe(100000);
        expect(result.current.shippingFee).toBe(3000); // FREE_SHIPPING_OVER 이상이지만 섬 추가비용 3000원
        expect(result.current.finalTotal).toBe(103000);
      });
    });

    describe("Fixed 할인 쿠폰 (FIXED5000)", () => {
      it("5000원 할인 쿠폰이 올바르게 적용되어야 한다", () => {
        const cartItems = [createCartItem(100000, 1)];
        const couponsToUse = [coupons[0]]; // FIXED5000

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: couponsToUse,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.orderTotal).toBe(100000);
        expect(result.current.shippingFee).toBe(0);
        expect(result.current.discountTotal).toBe(5000);
        expect(result.current.finalTotal).toBe(95000); // 100000 - 5000
        expect(result.current.appliedCoupons).toHaveLength(1);
        expect(result.current.appliedCoupons[0].discountItem).toBe(5000);
        expect(result.current.appliedCoupons[0].discountShipping).toBe(0);
      });
    });

    describe("BOGO 쿠폰 (buyXgetY)", () => {
      it("2+1 쿠폰이 올바르게 적용되어야 한다 - 단일 상품", () => {
        const cartItems = [createCartItem(10000, 3)]; // 3개 구매
        const couponsToUse = [coupons[1]]; // BOGO

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: couponsToUse,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.orderTotal).toBe(30000);
        expect(result.current.discountTotal).toBe(10000); // 1개 무료
        expect(result.current.appliedCoupons[0].discountItem).toBe(10000);
      });

      it("2+1 쿠폰이 올바르게 적용되어야 한다 - 여러 상품 중 가장 비싼 것", () => {
        const cartItems = [
          createCartItem(5000, 3, "1"), // 5000원 상품 3개
          createCartItem(15000, 2, "2"), // 15000원 상품 2개 (더 비쌈)
        ];
        const coupons = [mockCouponData[1]]; // BOGO

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        // 15000원 상품이 2개이므로 2+1 적용 안됨 (2개만 있어서 무료 제공할 수 없음)
        // 5000원 상품이 3개이므로 2+1 적용됨
        console.dir(result.current);
        expect(result.current.discountTotal).toBe(5000); // 5000원 상품 1개 무료
        expect(result.current.orderTotal).toBe(45000);
      });

      it("2+1 쿠폰 - 수량이 부족한 경우 할인 없음", () => {
        const cartItems = [createCartItem(10000, 1)]; // 1개만 구매
        const coupons = [mockCouponData[1]]; // BOGO

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.appliedCoupons[0].discountItem).toBe(0);
      });

      it("2+1 쿠폰 - 6개 구매 시 2개 무료", () => {
        const cartItems = [createCartItem(10000, 6)]; // 6개 구매
        const coupons = [mockCouponData[1]]; // BOGO

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        // 6개 = (2+1) * 2그룹 = 2개 무료
        expect(result.current.appliedCoupons[0].discountItem).toBe(20000);
      });
    });

    describe("무료 배송 쿠폰 (freeShipping)", () => {
      it("무료 배송 쿠폰이 올바르게 적용되어야 한다 (일반 지역)", () => {
        const cartItems = [createCartItem(50000, 1)];
        const coupons = [mockCouponData[2]]; // FREESHIPPING

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.shippingFee).toBe(0); // 무료 배송 적용
        expect(result.current.appliedCoupons[0].discountShipping).toBe(3000);
        expect(result.current.discountTotal).toBe(3000);
      });

      it("무료 배송 쿠폰이 올바르게 적용되어야 한다 (섬 지역)", () => {
        const cartItems = [createCartItem(50000, 1)];
        const coupons = [mockCouponData[2]]; // FREESHIPPING

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: true,
          })
        );

        expect(result.current.shippingFee).toBe(0);
        expect(result.current.appliedCoupons[0].discountShipping).toBe(6000); // 전체 배송비 할인
        expect(result.current.discountTotal).toBe(6000);
      });
    });

    describe("퍼센트 할인 쿠폰 (percentage)", () => {
      it("30% 할인 쿠폰이 올바르게 적용되어야 한다", () => {
        const cartItems = [createCartItem(100000, 1)];
        const coupons = [mockCouponData[3]]; // MIRACLESALE 30%

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.orderTotal).toBe(100000);
        expect(result.current.appliedCoupons[0].discountItem).toBe(30000); // 30% 할인
        expect(result.current.discountTotal).toBe(30000);
        expect(result.current.finalTotal).toBe(70000);
      });
    });

    describe("복수 쿠폰 적용", () => {
      it("여러 쿠폰이 동시에 적용되어야 한다", () => {
        const cartItems = [createCartItem(100000, 1)];
        const coupons = [
          mockCouponData[0], // FIXED5000
          mockCouponData[2], // FREESHIPPING
        ];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.appliedCoupons).toHaveLength(2);
        expect(result.current.appliedCoupons[0].discountItem).toBe(5000); // Fixed 할인
        expect(result.current.appliedCoupons[1].discountShipping).toBe(0); // 이미 무료배송이므로 추가 할인 없음
        expect(result.current.discountTotal).toBe(5000);
        expect(result.current.finalTotal).toBe(95000);
      });

      it("퍼센트 할인과 BOGO 쿠폰이 동시에 적용되어야 한다", () => {
        const cartItems = [createCartItem(10000, 3)];
        const coupons = [
          mockCouponData[1], // BOGO (2+1)
          mockCouponData[3], // MIRACLESALE 30%
        ];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.orderTotal).toBe(30000);
        expect(result.current.appliedCoupons[0].discountItem).toBe(10000); // BOGO 할인
        expect(result.current.appliedCoupons[1].discountItem).toBe(9000); // 30% 할인
        expect(result.current.discountTotal).toBe(19000);
      });
    });

    describe("에러 케이스", () => {
      it("알 수 없는 쿠폰 타입의 경우 경고를 출력하고 무시해야 한다", () => {
        const consoleSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});

        const invalidCoupon: Coupon = {
          id: "invalid",
          code: "INVALID",
          description: "Invalid coupon",
          expirationDate: new Date("2025-12-31"),
          discountType: "invalidType" as any,
        };

        const cartItems = [createCartItem(50000, 1)];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: [invalidCoupon],
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining("알수없는 쿠폰 유형: invalidType")
        );
        expect(result.current.appliedCoupons[0].discountItem).toBe(0);
        expect(result.current.appliedCoupons[0].discountShipping).toBe(0);

        consoleSpy.mockRestore();
      });

      it("BOGO 쿠폰에서 buyQuantity나 getQuantity가 0 이하인 경우", () => {
        const invalidBogoCoupon: Coupon = {
          ...mockCouponData[1],
          buyQuantity: 0,
          getQuantity: 1,
        };

        const cartItems = [createCartItem(10000, 5)];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: [invalidBogoCoupon],
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        expect(result.current.appliedCoupons[0].discountItem).toBe(0);
      });
    });

    describe("배송비 계산 통합 테스트", () => {
      it("배송비 할인이 기본 배송비보다 클 때 올바르게 처리해야 한다", () => {
        // 여러 무료배송 쿠폰이 중복 적용되는 경우를 시뮬레이션
        const cartItems = [createCartItem(30000, 1)];
        const multipleFreeShippingCoupons = [
          mockCouponData[2], // FREESHIPPING
          mockCouponData[2], // 동일한 쿠폰 중복
        ];

        const { result } = renderHook(() =>
          useCouponCalculation({
            coupons: multipleFreeShippingCoupons,
            selectedShoppingCartItems: cartItems,
            isIsland: false,
          })
        );

        // 배송비는 음수가 될 수 없음
        expect(result.current.shippingFee).toBe(0);
      });
    });
  });
});
