import {
  isCartItem,
  isProduct,
  isProductWithQuantity,
} from "@/util/validation/validationTool";

describe("validationTool", () => {
  describe("isCartItem", () => {
    it("올바른 CartItem 객체를 검증할 수 있다", () => {
      const validCartItem = {
        id: "1",
        quantity: 2,
        product: {
          id: "product-1",
          name: "상품1",
          price: 1000,
          imageUrl: "image.jpg",
          category: "카테고리1",
          quantity: 5,
        },
      };

      expect(isCartItem(validCartItem)).toBe(true);
    });

    it("id가 문자열이 아닌 경우 false를 반환한다", () => {
      const invalidCartItem = {
        id: 123,
        quantity: 2,
        product: {
          id: "product-1",
          name: "상품1",
          price: 1000,
          imageUrl: "image.jpg",
          category: "카테고리1",
          quantity: 5,
        },
      };

      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    it("quantity가 숫자가 아닌 경우 false를 반환한다", () => {
      const invalidCartItem = {
        id: "1",
        quantity: "2",
        product: {
          id: "product-1",
          name: "상품1",
          price: 1000,
          imageUrl: "image.jpg",
          category: "카테고리1",
          quantity: 5,
        },
      };

      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    it("product가 올바른 ProductWithQuantity가 아닌 경우 false를 반환한다", () => {
      const invalidCartItem = {
        id: "1",
        quantity: 2,
        product: {
          id: "product-1",
          name: "상품1",
          price: "1000", // should be number
          imageUrl: "image.jpg",
          category: "카테고리1",
          quantity: 5,
        },
      };

      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    it("null이나 undefined가 입력되면 false를 반환한다", () => {
      expect(isCartItem(null)).toBe(false);
      expect(isCartItem(undefined)).toBe(false);
    });

    it("객체가 아닌 값이 입력되면 false를 반환한다", () => {
      expect(isCartItem("string")).toBe(false);
      expect(isCartItem(123)).toBe(false);
      expect(isCartItem([])).toBe(false);
    });
  });

  describe("isProduct", () => {
    it("올바른 Product 객체를 검증할 수 있다", () => {
      const validProduct = {
        id: "product-1",
        name: "상품1",
        price: 1000,
        imageUrl: "image.jpg",
        category: "카테고리1",
      };

      expect(isProduct(validProduct)).toBe(true);
    });

    it("필수 필드가 누락된 경우 false를 반환한다", () => {
      const invalidProduct = {
        id: "product-1",
        name: "상품1",
        price: 1000,
        category: "카테고리1",
      };

      expect(isProduct(invalidProduct)).toBe(false);
    });

    it("필드 타입이 잘못된 경우 false를 반환한다", () => {
      const invalidProduct = {
        id: 123,
        name: "상품1",
        price: "1000",
        imageUrl: "image.jpg",
        category: "카테고리1",
      };

      expect(isProduct(invalidProduct)).toBe(false);
    });
  });

  describe("isProductWithQuantity", () => {
    it("올바른 ProductWithQuantity 객체를 검증할 수 있다", () => {
      const validProductWithQuantity = {
        id: "product-1",
        name: "상품1",
        price: 1000,
        imageUrl: "image.jpg",
        category: "카테고리1",
        quantity: 5,
      };

      expect(isProductWithQuantity(validProductWithQuantity)).toBe(true);
    });

    it("quantity가 없는 경우 false를 반환한다", () => {
      const invalidProductWithQuantity = {
        id: "product-1",
        name: "상품1",
        price: 1000,
        imageUrl: "image.jpg",
        category: "카테고리1",
      };

      expect(isProductWithQuantity(invalidProductWithQuantity)).toBe(false);
    });

    it("quantity가 숫자가 아닌 경우 false를 반환한다", () => {
      const invalidProductWithQuantity = {
        id: "product-1",
        name: "상품1",
        price: 1000,
        imageUrl: "image.jpg",
        category: "카테고리1",
        quantity: "5",
      };

      expect(isProductWithQuantity(invalidProductWithQuantity)).toBe(false);
    });
  });
});
