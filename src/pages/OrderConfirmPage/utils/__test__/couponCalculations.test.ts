import { calculateSingleCouponDiscount, calculateOrderTotal } from "../couponCalculations";
import { CouponData, OrderItem } from "../../types";

describe("쿠폰 계산 로직 테스트 (수정됨)", () => {
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
  const orderAmount = 180000;

  describe("단일 쿠폰 할인 계산", () => {
    describe("고정 할인 쿠폰", () => {
      const fixedCoupon: CouponData = {
        id: 1,
        code: "FIXED5000",
        description: "5000원 할인",
        expirationDate: "2025-12-31",
        discountType: "fixed",
        discount: 5000,
      };

      it("고정 할인 금액이 정상적으로 적용되어야 한다", () => {
        const discount = calculateSingleCouponDiscount(fixedCoupon, mockOrderItems, orderAmount);
        expect(discount).toBe(5000);
      });

      it("고정 할인 금액이 주문 금액보다 클 경우 주문 금액만큼만 할인되어야 한다", () => {
        const largeCoupon = { ...fixedCoupon, discount: 200000 };
        const discount = calculateSingleCouponDiscount(largeCoupon, mockOrderItems, orderAmount);
        expect(discount).toBe(orderAmount);
      });
    });

    describe("비율 할인 쿠폰", () => {
      const percentageCoupon: CouponData = {
        id: 2,
        code: "PERCENT20",
        description: "20% 할인",
        expirationDate: "2025-12-31",
        discountType: "percentage",
        discount: 20,
      };

      it("비율 할인이 정상적으로 적용되어야 한다", () => {
        const discount = calculateSingleCouponDiscount(percentageCoupon, mockOrderItems, orderAmount);
        expect(discount).toBe(36000); // 180000 * 0.2
      });

      it("소수점 할인 시 내림 처리가 되어야 한다", () => {
        const fractionalCoupon = { ...percentageCoupon, discount: 15.5 };
        const discount = calculateSingleCouponDiscount(fractionalCoupon, mockOrderItems, orderAmount);
        expect(discount).toBe(Math.floor(180000 * 0.155)); // 27900
      });
    });

    describe("BOGO 쿠폰", () => {
      const bogoCoupon: CouponData = {
        id: 3,
        code: "BOGO",
        description: "2개 구매 시 1개 무료",
        expirationDate: "2025-12-31",
        discountType: "buyXgetY",
      };

      it("BOGO 조건을 만족하는 상품이 있으면 해당 상품 가격만큼 할인되어야 한다", () => {
        const discount = calculateSingleCouponDiscount(bogoCoupon, mockOrderItems, orderAmount);
        expect(discount).toBe(50000); // Product 1이 2개 있으므로 50000원 할인
      });

      it("BOGO 조건을 만족하지 않으면 할인되지 않아야 한다", () => {
        const singleItems: OrderItem[] = [
          { id: 1, quantity: 1, product: { id: 1, name: "Product 1", price: 50000, imageUrl: "img1.jpg" } },
        ];

        const discount = calculateSingleCouponDiscount(bogoCoupon, singleItems, 50000);
        expect(discount).toBe(0);
      });
    });

    describe("무료배송 쿠폰", () => {
      const freeShippingCoupon: CouponData = {
        id: 4,
        code: "FREESHIP",
        description: "무료배송",
        expirationDate: "2025-12-31",
        discountType: "freeShipping",
      };

      it("무료배송 쿠폰은 상품 할인 금액이 0원이어야 한다", () => {
        const discount = calculateSingleCouponDiscount(freeShippingCoupon, mockOrderItems, orderAmount);
        expect(discount).toBe(0);
      });
    });
  });

  describe("전체 주문 계산", () => {
    const coupons: CouponData[] = [
      {
        id: 1,
        code: "FIXED5000",
        description: "5000원 할인",
        expirationDate: "2025-12-31",
        discountType: "fixed",
        discount: 5000,
      },
      {
        id: 2,
        code: "FREESHIP",
        description: "무료배송",
        expirationDate: "2025-12-31",
        discountType: "freeShipping",
      },
    ];

    it("쿠폰을 적용하지 않은 경우 올바른 계산이 되어야 한다", () => {
      const result = calculateOrderTotal(mockOrderItems, [], coupons, false);

      expect(result.orderAmount).toBe(180000);
      expect(result.couponDiscount).toBe(0);
      expect(result.shippingFee).toBe(0); // 18만원이므로 무료배송
      expect(result.finalAmount).toBe(180000);
    });

    it("고정 할인 쿠폰 적용 시 올바른 계산이 되어야 한다", () => {
      const result = calculateOrderTotal(mockOrderItems, [1], coupons, false);

      expect(result.orderAmount).toBe(180000);
      expect(result.couponDiscount).toBe(5000);
      expect(result.shippingFee).toBe(0);
      expect(result.finalAmount).toBe(175000);
    });

    it("소액 주문에서 무료배송 쿠폰 적용 시 배송비가 0원이어야 한다", () => {
      const smallOrderItems: OrderItem[] = [
        { id: 1, quantity: 1, product: { id: 1, name: "Product 1", price: 50000, imageUrl: "img1.jpg" } },
      ];

      const result = calculateOrderTotal(smallOrderItems, [2], coupons, false);

      expect(result.orderAmount).toBe(50000);
      expect(result.shippingFee).toBe(0); // 무료배송 쿠폰 적용
      expect(result.finalAmount).toBe(50000);
    });

    it("제주도 지역에서 무료배송 쿠폰 적용 시 모든 배송비가 0원이어야 한다", () => {
      const result = calculateOrderTotal(mockOrderItems, [2], coupons, true);

      expect(result.shippingFee).toBe(0);
      expect(result.finalAmount).toBe(180000);
    });
  });
});
