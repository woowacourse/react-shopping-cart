import { CartItemWithSelection } from "../../cart/types/response";
import {
  calculateOrderQuantity,
  filterSelectedItems,
} from "../calculations/itemCalculations";

describe("itemCalculations 테스트", () => {
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

  describe("filterSelectedItems 함수", () => {
    it("빈 배열을 전달하면 빈 배열을 반환한다", () => {
      const result = filterSelectedItems([]);
      expect(result).toEqual([]);
    });

    it("선택된 상품만 필터링한다", () => {
      const selectedItems = filterSelectedItems(mockItems);

      expect(selectedItems).toHaveLength(2);
      expect(selectedItems[0].id).toBe(101);
      expect(selectedItems[1].id).toBe(103);
      expect(selectedItems.every((item) => item.selected)).toBe(true);
    });

    it("선택된 상품이 없으면 빈 배열을 반환한다", () => {
      const unselectedItems: CartItemWithSelection[] = [
        {
          id: 101,
          quantity: 3,
          selected: false,
          product: {
            id: 1,
            name: "유기농 바나나",
            price: 5000,
            imageUrl: "https://banana.jpg",
            category: "식료품",
            stock: 100,
          },
        },
      ];

      const result = filterSelectedItems(unselectedItems);
      expect(result).toEqual([]);
    });
  });

  describe("calculateOrderQuantity 함수", () => {
    it("빈 배열을 전달하면 0을 반환한다", () => {
      const result = calculateOrderQuantity([]);
      expect(result).toBe(0);
    });

    it("모든 상품의 수량을 합산한다", () => {
      const totalQuantity = calculateOrderQuantity(mockItems);
      expect(totalQuantity).toBe(6); // 3 + 2 + 1
    });

    it("선택된 상품만 필터링한 후 수량을 합산한다", () => {
      const selectedItems = filterSelectedItems(mockItems);
      const selectedQuantity = calculateOrderQuantity(selectedItems);

      expect(selectedQuantity).toBe(4); // 선택된 상품(3 + 1)
    });

    it("수량이 0인 상품을 포함해도 정확히 계산한다", () => {
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

      const totalQuantity = calculateOrderQuantity(itemsWithZeroQuantity);

      expect(totalQuantity).toBe(6); // 3 + 2 + 1 + 0
    });
  });
});
