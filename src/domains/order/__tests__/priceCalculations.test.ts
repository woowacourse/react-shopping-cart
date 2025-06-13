import { CartItemWithSelection } from "../../cart/types/response";
import {
  calculateOrderPrice,
  calculateTotalPrice,
} from "../calculations/priceCalculations";

describe("priceCalculations 테스트", () => {
  const mockItems: CartItemWithSelection[] = [
    {
      id: 101,
      quantity: 3,
      selected: true,
      product: {
        id: 1,
        name: "유기농 바나나",
        price: 5000,
        imageUrl: "https://banana.jpg",
        category: "식료품",
        stock: 100,
      },
    },
    {
      id: 102,
      quantity: 2,
      selected: true,
      product: {
        id: 2,
        name: "신선한 사과",
        price: 8000,
        imageUrl: "https://apple.jpg",
        category: "식료품",
        stock: 50,
      },
    },
    {
      id: 103,
      quantity: 1,
      selected: true,
      product: {
        id: 3,
        name: "오렌지 주스",
        price: 3000,
        imageUrl: "https://juice.jpg",
        category: "식료품",
        stock: 30,
      },
    },
  ];

  describe("calculateOrderPrice 함수", () => {
    it("빈 배열을 전달하면 0을 반환한다", () => {
      const result = calculateOrderPrice([]);
      expect(result).toBe(0);
    });

    it("모든 상품의 (가격 x 수량)을 합산한다", () => {
      const orderPrice = calculateOrderPrice(mockItems);

      expect(orderPrice).toBe(34000); // (5000 × 3) + (8000 × 2) + (3000 × 1) = 15000 + 16000 + 3000
    });

    it("선택 여부와 관계없이 모든 상품의 가격을 합산한다", () => {
      const mixedSelectionItems: CartItemWithSelection[] = [
        {
          id: 101,
          quantity: 3,
          selected: true,
          product: {
            id: 1,
            name: "유기농 바나나",
            price: 5000,
            imageUrl: "https://banana.jpg",
            category: "식료품",
            stock: 100,
          },
        },
        {
          id: 102,
          quantity: 2,
          selected: false,
          product: {
            id: 2,
            name: "신선한 사과",
            price: 8000,
            imageUrl: "https://apple.jpg",
            category: "식료품",
            stock: 50,
          },
        },
      ];

      const orderPrice = calculateOrderPrice(mixedSelectionItems);

      expect(orderPrice).toBe(31000); // (5000 × 3) + (8000 × 2) = 15000 + 16000
    });

    it("수량이 0인 상품은 가격에 영향을 주지 않는다", () => {
      const itemsWithZeroQuantity: CartItemWithSelection[] = [
        ...mockItems,
        {
          id: 104,
          quantity: 0,
          selected: true,
          product: {
            id: 4,
            name: "품절 상품",
            price: 10000,
            imageUrl: "https://sold-out.jpg",
            category: "기타",
            stock: 0,
          },
        },
      ];

      const orderPrice = calculateOrderPrice(itemsWithZeroQuantity);

      expect(orderPrice).toBe(34000); // 기존 상품 가격의 합과 동일 (0 × 10000 = 0)
    });
  });

  describe("calculateTotalPrice 함수", () => {
    it("주문 금액과 배송비를 합산한다", () => {
      const orderPrice = 34000;
      const shippingFee = 3000;

      const totalPrice = calculateTotalPrice(orderPrice, shippingFee);

      expect(totalPrice).toBe(37000); // 34000 + 3000
    });

    it("주문 금액이 0이면 배송비만 반환한다", () => {
      const orderPrice = 0;
      const shippingFee = 3000;

      const totalPrice = calculateTotalPrice(orderPrice, shippingFee);

      expect(totalPrice).toBe(3000);
    });

    it("배송비가 0이면 주문 금액만 반환한다", () => {
      const orderPrice = 34000;
      const shippingFee = 0;

      const totalPrice = calculateTotalPrice(orderPrice, shippingFee);

      expect(totalPrice).toBe(34000);
    });

    it("주문 금액과 배송비가 모두 0이면 0을 반환한다", () => {
      const orderPrice = 0;
      const shippingFee = 0;

      const totalPrice = calculateTotalPrice(orderPrice, shippingFee);

      expect(totalPrice).toBe(0);
    });
  });
});
