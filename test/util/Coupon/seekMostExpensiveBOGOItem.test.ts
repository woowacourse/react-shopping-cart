import { describe, it, expect } from "vitest";
import { seekMostExpensiveBOGOItem } from "@/util/coupon/seekMostExpensiveBOGOItem";
import { CartItem } from "@/type/CartItem";

describe("seekMostExpensiveBOGOItem", () => {
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

  it("수량이 부족한 경우 null을 반환해야 한다", () => {
    const cartItems = [
      createCartItem(10000, 2), // 2개는 2+1에 부족
    ];

    const result = seekMostExpensiveBOGOItem(cartItems, 2, 1);
    expect(result).toBeNull();
  });

  it("단일 상품의 경우 해당 상품의 할인을 계산해야 한다", () => {
    const cartItems = [
      createCartItem(10000, 3), // 3개로 딱 2+1 한 그룹
    ];

    const result = seekMostExpensiveBOGOItem(cartItems, 2, 1);
    expect(result).not.toBeNull();
    expect(result?.item.product.price).toBe(10000);
    expect(result?.groups).toBe(1);
    expect(result?.totalDiscount).toBe(10000); // 1개 무료
  });

  it("단일 상품의 여러 그룹 적용이 가능한 경우", () => {
    const cartItems = [
      createCartItem(10000, 6), // 3개씩 2그룹 가능
    ];

    const result = seekMostExpensiveBOGOItem(cartItems, 2, 1);
    expect(result).not.toBeNull();
    expect(result?.groups).toBe(2);
    expect(result?.totalDiscount).toBe(20000); // 2개 무료
  });

  describe("여러 상품이 있는 경우", () => {
    it("비싼 상품보다 싼 상품이 더 큰 할인을 제공할 수 있다", () => {
      const cartItems = [
        createCartItem(10000, 3, "1"), // 10000원 x 3개 = 1그룹, 10000원 할인
        createCartItem(8000, 6, "2"), // 8000원 x 6개 = 2그룹, 16000원 할인
      ];

      const result = seekMostExpensiveBOGOItem(cartItems, 2, 1);
      expect(result).not.toBeNull();
      expect(result?.item.id).toBe("2"); // 8000원 상품 선택
      expect(result?.groups).toBe(2);
      expect(result?.totalDiscount).toBe(16000);
    });

    it("수량이 부족한 비싼 상품은 제외되어야 한다", () => {
      const cartItems = [
        createCartItem(15000, 2, "1"), // 수량 부족
        createCartItem(10000, 3, "2"), // 1그룹 가능
      ];

      const result = seekMostExpensiveBOGOItem(cartItems, 2, 1);
      expect(result).not.toBeNull();
      expect(result?.item.id).toBe("2");
      expect(result?.totalDiscount).toBe(10000);
    });

    it("3+1 쿠폰 적용 시나리오", () => {
      const cartItems = [
        createCartItem(12000, 4, "1"), // 12000원 x 4개 = 1그룹, 12000원 할인
        createCartItem(10000, 8, "2"), // 10000원 x 8개 = 2그룹, 20000원 할인
      ];

      const result = seekMostExpensiveBOGOItem(cartItems, 3, 1);
      expect(result).not.toBeNull();
      expect(result?.item.id).toBe("2"); // 더 많은 할인을 제공하는 10000원 상품
      expect(result?.groups).toBe(2);
      expect(result?.totalDiscount).toBe(20000);
    });

    it("여러 상품 중 최적의 할인을 찾아야 한다", () => {
      const cartItems = [
        createCartItem(20000, 2, "1"), // 수량 부족
        createCartItem(15000, 3, "2"), // 15000원 할인
        createCartItem(12000, 6, "3"), // 24000원 할인
        createCartItem(8000, 3, "4"), // 8000원 할인
      ];

      const result = seekMostExpensiveBOGOItem(cartItems, 2, 1);
      expect(result).not.toBeNull();
      expect(result?.item.id).toBe("3"); // 가장 큰 할인을 제공하는 12000원 상품
      expect(result?.groups).toBe(2);
      expect(result?.totalDiscount).toBe(24000);
    });
  });

  describe("다양한 쿠폰 비율", () => {
    it("1+1 쿠폰 적용", () => {
      const cartItems = [
        createCartItem(10000, 2, "1"), // 10000원 할인
        createCartItem(8000, 4, "2"), // 16000원 할인
      ];

      const result = seekMostExpensiveBOGOItem(cartItems, 1, 1);
      expect(result?.item.id).toBe("2");
      expect(result?.totalDiscount).toBe(16000);
    });

    it("2+2 쿠폰 적용", () => {
      const cartItems = [
        createCartItem(10000, 4, "1"), // 20000원 할인
        createCartItem(8000, 8, "2"), // 32000원 할인
      ];

      const result = seekMostExpensiveBOGOItem(cartItems, 2, 2);
      expect(result?.item.id).toBe("2");
      expect(result?.totalDiscount).toBe(32000);
    });
  });
});
