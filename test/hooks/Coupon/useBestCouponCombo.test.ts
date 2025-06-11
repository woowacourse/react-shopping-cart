import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBestCouponCombo } from "@/hooks/Coupon/useBestCouponCombo";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { SHIPPING_FEE } from "@/constants/priceSetting";

describe("useBestCouponCombo는", () => {
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
      quantity: 10,
      imageUrl: "",
      category: "",
    },
    quantity,
  });

  const createCoupon = (
    type: "fixed" | "percentage" | "freeShipping" | "buyXgetY",
    options: Partial<Coupon> = {}
  ): Coupon => ({
    id: options.id ?? "coupon1",
    code: options.code ?? "CODE1",
    description: options.description ?? "Test Coupon",
    discountType: type,
    discount: options.discount,
    buyQuantity: options.buyQuantity,
    getQuantity: options.getQuantity,
    expirationDate: new Date("2025-12-31"),
    ...options,
  });

  describe("기본 동작", () => {
    it("쿠폰이 없는 경우 기본 계산을 수행해야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons: [],
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.orderTotal).toBe(50000);
      expect(result.current.shippingFee).toBe(SHIPPING_FEE);
      expect(result.current.discountTotal).toBe(0);
      expect(result.current.finalTotal).toBe(50000 + SHIPPING_FEE);
      expect(result.current.appliedCoupons).toHaveLength(0);
    });

    it("섬 지역 배송비가 올바르게 계산되어야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons: [],
          selectedShoppingCartItems: cartItems,
          isIsland: true,
        })
      );

      expect(result.current.shippingFee).toBe(SHIPPING_FEE + 3000);
    });
  });

  describe("단일 쿠폰 적용", () => {
    it("정액 할인 쿠폰이 올바르게 적용되어야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];
      const coupons = [createCoupon("fixed", { discount: 5000 })];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.discountTotal).toBe(5000);
      expect(result.current.appliedCoupons).toHaveLength(1);
    });

    it("퍼센트 할인 쿠폰이 올바르게 적용되어야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];
      const coupons = [createCoupon("percentage", { discount: 10 })];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.discountTotal).toBe(5000); // 50000의 10%
    });

    it("무료배송 쿠폰이 올바르게 적용되어야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];
      const coupons = [createCoupon("freeShipping")];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.shippingFee).toBe(0);
      expect(result.current.discountTotal).toBe(SHIPPING_FEE);
    });

    it("BOGO 쿠폰이 최적의 상품에 적용되어야 한다", () => {
      const cartItems = [
        createCartItem(10000, 3, "1"), // 10000원 할인
        createCartItem(8000, 6, "2"), // 16000원 할인
      ];
      const coupons = [
        createCoupon("buyXgetY", { buyQuantity: 2, getQuantity: 1 }),
      ];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.discountTotal).toBe(16000); // 더 큰 할인을 제공하는 8000원 상품 선택
    });
  });

  describe("복수 쿠폰 적용", () => {
    it("최대 2개의 쿠폰만 적용되어야 한다", () => {
      const cartItems = [createCartItem(100000, 1)];
      const coupons = [
        createCoupon("fixed", { id: "1", discount: 5000 }),
        createCoupon("fixed", { id: "2", discount: 3000 }),
        createCoupon("fixed", { id: "3", discount: 2000 }),
      ];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.appliedCoupons).toHaveLength(2);
      expect(result.current.discountTotal).toBe(8000); // 5000 + 3000
    });

    it("할인 효과가 큰 순서대로 쿠폰이 선택되어야 한다", () => {
      const cartItems = [createCartItem(100000, 1)];
      const coupons = [
        createCoupon("fixed", { id: "1", discount: 3000 }),
        createCoupon("percentage", { id: "2", discount: 10 }), // 10000원 할인
        createCoupon("fixed", { id: "3", discount: 5000 }),
      ];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.appliedCoupons).toHaveLength(2);
      expect(result.current.appliedCoupons[0].id).toBe("2"); // 가장 큰 할인
      expect(result.current.appliedCoupons[1].id).toBe("3"); // 두 번째로 큰 할인
      expect(result.current.discountTotal).toBe(15000); // 10000 + 5000
    });

    it("BOGO 쿠폰과 다른 쿠폰의 조합이 올바르게 적용되어야 한다", () => {
      // 이런 방식의 설계결함.. 쉽게 생각이 가능하겠죠.
      // 일단은 테스트 스팩상 이렇게 정의해 두고,
      // 의견을 물어보고 싶네요.
      const cartItems = [
        createCartItem(10000, 6, "1"), // BOGO로 20000원 할인 가능
      ];
      const coupons = [
        createCoupon("buyXgetY", {
          id: "1",
          buyQuantity: 2,
          getQuantity: 1,
        }),
        createCoupon("percentage", {
          id: "2",
          // 이부분은 두가지 갈래로 갈릴거에요.
          // 1. orderTotal에서 10% 할인
          // 2. bogo를 적용하고 남은 금액에서 10% 할인
          // 남은 금액에서 10% 할인이 대개는 더 많이 본것 같은데...

          discount: 10, //6000원 할인
        }),
      ];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.appliedCoupons).toHaveLength(2);
      expect(result.current.discountTotal).toBe(26000); // 20000 + 6000

      expect(result.current.finalTotal).toBe(
        result.current.orderTotal - result.current.discountTotal + SHIPPING_FEE
      );
    });
  });

  describe("에러 케이스", () => {
    it("알 수 없는 쿠폰 타입은 무시되어야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];
      const invalidCoupon = {
        ...createCoupon("fixed"),
        discountType: "invalid" as unknown as "fixed",
      };

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons: [invalidCoupon],
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.discountTotal).toBe(0);
      expect(result.current.appliedCoupons).toHaveLength(0);
    });

    it("할인 금액이 없는 쿠폰은 무시되어야 한다", () => {
      const cartItems = [createCartItem(50000, 1)];
      const coupons = [
        createCoupon("fixed", { discount: undefined }),
        createCoupon("percentage", { discount: undefined }),
      ];

      const { result } = renderHook(() =>
        useBestCouponCombo({
          coupons,
          selectedShoppingCartItems: cartItems,
          isIsland: false,
        })
      );

      expect(result.current.discountTotal).toBe(0);
    });
  });
});
