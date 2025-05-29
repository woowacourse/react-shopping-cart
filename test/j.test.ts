import {
  calculateTotalPrice,
  calculateShippingFee,
  formatPrice,
} from "../src/utils/price";

describe("jest test", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
});

describe("가격 계산 유틸리티 테스트", () => {
  describe("calculateTotalPrice", () => {
    it("선택된 상품들의 총 가격을 계산한다", () => {
      const items = [
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
        {
          id: 3,
          product: {
            id: 3,
            name: "상품3",
            price: 15000,
            imageUrl: "image3",
            category: "category2",
          },
          quantity: 3,
        },
      ];

      expect(calculateTotalPrice(items)).toBe(40000);
    });

    it("선택된 상품이 없을 경우 0을 반환한다", () => {
      const items = [
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

      expect(calculateTotalPrice(items)).toBe(0);
    });
  });

  describe("calculateShippingFee", () => {
    it("총 금액이 10만원 미만일 경우 배송비 3000원을 반환한다", () => {
      expect(calculateShippingFee(50000)).toBe(3000);
    });

    it("총 금액이 10만원 이상일 경우 배송비 0원을 반환한다", () => {
      expect(calculateShippingFee(100000)).toBe(0);
      expect(calculateShippingFee(150000)).toBe(0);
    });
  });

  describe("formatPrice", () => {
    it("가격을 원화 형식으로 포맷팅한다", () => {
      expect(formatPrice(1000)).toBe("1,000");
      expect(formatPrice(100000)).toBe("100,000");
      expect(formatPrice(0)).toBe("0");
    });
  });
});
