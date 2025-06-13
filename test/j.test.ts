
import { ResponseCartItem } from "../src/types/order";
import {
  formatPrice,
  formatPriceWithUnit,
  formatDate,
  formatTime,
} from "../src/utils/formatters";
import { OrderCalculator } from "../src/utils/orderCalculator";

describe("기본 유틸리티 테스트", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
});

describe("가격 계산 및 포맷팅 유틸리티 테스트", () => {
  const mockItems: ResponseCartItem[] = [
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

  describe("OrderCalculator.calculateOrderAmount", () => {
    it("선택된 상품들의 총 가격을 계산한다", () => {
      const total = OrderCalculator.calculateOrderAmount(mockItems);
      expect(total).toBe(40000);
    });

    it("선택된 상품이 없을 경우 0을 반환한다", () => {
      const total = OrderCalculator.calculateOrderAmount([]);
      expect(total).toBe(0);
    });

    it("모든 상품이 선택된 경우 전체 총합을 계산한다", () => {
      const allItems = [
        ...mockItems,
        {
          id: 3,
          product: {
            id: 3,
            name: "상품3",
            price: 15000,
            imageUrl: "image3",
            category: "category3",
          },
          quantity: 3,
        },
      ];

      const total = OrderCalculator.calculateOrderAmount(allItems);
      expect(total).toBe(85000);
    });
  });

  describe("OrderCalculator.calculateBaseDeliveryFee", () => {
    it("총 금액이 10만원 미만일 경우 배송비 3000원을 반환한다", () => {
      const deliveryFee = OrderCalculator.calculateBaseDeliveryFee(
        50000,
        false
      );
      expect(deliveryFee).toBe(3000);
    });

    it("총 금액이 10만원 이상일 경우 배송비 0원을 반환한다", () => {
      expect(OrderCalculator.calculateBaseDeliveryFee(100000, false)).toBe(0);
      expect(OrderCalculator.calculateBaseDeliveryFee(150000, false)).toBe(0);
    });

    it("도서산간 지역의 경우 추가 배송비가 적용된다", () => {
      expect(OrderCalculator.calculateBaseDeliveryFee(50000, true)).toBe(6000);
      expect(OrderCalculator.calculateBaseDeliveryFee(100000, true)).toBe(3000);
    });

    it("주문 금액이 0인 경우 배송비도 0이다", () => {
      expect(OrderCalculator.calculateBaseDeliveryFee(0, false)).toBe(0);
      expect(OrderCalculator.calculateBaseDeliveryFee(0, true)).toBe(3000);
    });
  });

  describe("formatPrice", () => {
    it("가격을 원화 형식으로 포맷팅한다", () => {
      expect(formatPrice(1000)).toBe("1,000");
      expect(formatPrice(100000)).toBe("100,000");
      expect(formatPrice(0)).toBe("0");
      expect(formatPrice(1234567)).toBe("1,234,567");
    });
  });

  describe("formatPriceWithUnit", () => {
    it("가격을 원화 단위와 함께 포맷팅한다", () => {
      expect(formatPriceWithUnit(1000)).toBe("1,000원");
      expect(formatPriceWithUnit(100000)).toBe("100,000원");
    });
  });

  describe("formatDate", () => {
    it("날짜를 한국어 형식으로 포맷팅한다", () => {
      expect(formatDate("2025-11-30")).toBe("2025년 11월 30일");
      expect(formatDate("2025-06-30")).toBe("2025년 6월 30일");
    });
  });

  describe("formatTime", () => {
    it("시간을 한국어 형식으로 포맷팅한다", () => {
      expect(formatTime("04:00")).toBe("오전 4시");
      expect(formatTime("07:00")).toBe("오전 7시");
      expect(formatTime("12:00")).toBe("오후 12시");
      expect(formatTime("13:00")).toBe("오후 1시");
      expect(formatTime("00:00")).toBe("오전 12시");
    });
  });

  describe("OrderCalculator.calculateOrderSummary", () => {
    it("주문 요약 정보를 생성한다", () => {
      const summary = OrderCalculator.calculateOrderSummary(mockItems);

      expect(summary.totalCount).toBe(3);
      expect(summary.itemTypeCount).toBe(2);
      expect(summary.summaryText).toBe("총 2종류의 상품 3개");
    });

    it("빈 장바구니의 요약 정보를 생성한다", () => {
      const summary = OrderCalculator.calculateOrderSummary([]);

      expect(summary.totalCount).toBe(0);
      expect(summary.itemTypeCount).toBe(0);
      expect(summary.summaryText).toBe("총 0종류의 상품 0개");
    });
  });
});
