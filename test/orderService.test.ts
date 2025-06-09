import { OrderService } from "../src/services/orderService";
import { ResponseCartItem } from "../src/types/order";
import { Coupon } from "../src/types/coupon";

const mockCartItems: ResponseCartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "상품1",
      price: 30000,
      imageUrl: "image1.jpg",
      category: "카테고리1",
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      name: "상품2",
      price: 40000,
      imageUrl: "image2.jpg",
      category: "카테고리2",
    },
  },
];

const mockFreeShippingCoupon: Coupon = {
  id: 1,
  code: "FREESHIP",
  description: "무료 배송 쿠폰",
  discountType: "freeShipping",
  minimumAmount: 50000,
  expirationDate: "2025-08-31",
};

describe("OrderService 테스트", () => {
  describe("기본 주문 정보 계산", () => {
    it("쿠폰 없는 기본 주문 계산 - 일반 지역", () => {
      const result = OrderService.calculateBasicOrderBreakdown(
        mockCartItems,
        false
      );

      expect(result.orderAmount).toBe(100000);
      expect(result.deliveryFee).toBe(0);
      expect(result.couponDiscount).toBe(0);
      expect(result.totalPrice).toBe(100000);
      expect(result.orderSummary.itemTypeCount).toBe(2);
      expect(result.orderSummary.totalCount).toBe(3);
    });

    it("쿠폰 없는 기본 주문 계산 - 도서산간 지역", () => {
      const result = OrderService.calculateBasicOrderBreakdown(
        mockCartItems,
        true
      );

      expect(result.orderAmount).toBe(100000);
      expect(result.deliveryFee).toBe(3000);
      expect(result.totalPrice).toBe(103000);
    });

    it("쿠폰 없는 기본 주문 계산 - 10만원 미만 주문", () => {
      const smallOrderItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: "소액상품",
            price: 50000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const result = OrderService.calculateBasicOrderBreakdown(
        smallOrderItems,
        false
      );

      expect(result.orderAmount).toBe(50000);
      expect(result.deliveryFee).toBe(3000);
      expect(result.totalPrice).toBe(53000);
    });
  });

  describe("쿠폰 적용 주문 정보 계산", () => {
    it("무료 배송 쿠폰 적용", () => {
      const result = OrderService.calculateOrderBreakdownWithCoupons(
        mockCartItems,
        true,
        [mockFreeShippingCoupon]
      );

      expect(result.orderAmount).toBe(100000);
      expect(result.deliveryFee).toBe(0);
      expect(result.couponDiscount).toBe(0);
      expect(result.totalPrice).toBe(100000);
    });

    it("복합 쿠폰 적용", () => {
      const fixedCoupon: Coupon = {
        id: 2,
        code: "FIXED5000",
        description: "5000원 할인",
        discountType: "fixed",
        discount: 5000,
        minimumAmount: 50000,
        expirationDate: "2025-12-31",
      };

      const result = OrderService.calculateOrderBreakdownWithCoupons(
        mockCartItems,
        true,
        [fixedCoupon, mockFreeShippingCoupon]
      );

      expect(result.orderAmount).toBe(100000);
      expect(result.deliveryFee).toBe(0);
      expect(result.couponDiscount).toBe(5000);
      expect(result.totalPrice).toBe(95000);
    });
  });

  describe("OrderInfo 생성", () => {
    it("OrderInfo 객체가 올바르게 생성됨", () => {
      const orderInfo = OrderService.createOrderInfo(mockCartItems, true);

      expect(orderInfo.cartItems).toEqual(mockCartItems);
      expect(orderInfo.originalOrderAmount).toBe(100000);
      expect(orderInfo.originalDeliveryFee).toBe(3000);
      expect(orderInfo.isRemoteArea).toBe(true);
    });

    it("빈 장바구니로 OrderInfo 생성", () => {
      const orderInfo = OrderService.createOrderInfo([], false);

      expect(orderInfo.cartItems).toEqual([]);
      expect(orderInfo.originalOrderAmount).toBe(0);
      expect(orderInfo.originalDeliveryFee).toBe(0);
      expect(orderInfo.isRemoteArea).toBe(false);
    });
  });

  describe("쿠폰 결과 변환", () => {
    it("CouponCalculationResult를 OrderBreakdown으로 변환", () => {
      const couponResult = {
        totalDiscount: 5000,
        deliveryDiscount: 3000,
        appliedCoupons: [mockFreeShippingCoupon],
        finalOrderAmount: 95000,
        finalDeliveryFee: 0,
      };

      const result = OrderService.convertCouponResultToOrderBreakdown(
        mockCartItems,
        couponResult,
        {
          cartItems: mockCartItems,
          originalOrderAmount: 100000,
          originalDeliveryFee: 3000,
          isRemoteArea: true,
        }
      );

      expect(result.orderAmount).toBe(100000);
      expect(result.deliveryFee).toBe(0);
      expect(result.couponDiscount).toBe(5000);
      expect(result.totalPrice).toBe(95000);
      expect(result.orderSummary.itemTypeCount).toBe(2);
    });
  });
});
