import { CouponCalculator } from "../src/utils/couponCalculator";
import { OrderService } from "../src/services/orderService";
import { Coupon } from "../src/types/coupon";
import { ResponseCartItem } from "../src/types/order";

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

const mockHighValueCartItems: ResponseCartItem[] = [
  {
    id: 1,
    quantity: 4,
    product: {
      id: 1,
      name: "고가상품",
      price: 50000,
      imageUrl: "image1.jpg",
      category: "카테고리1",
    },
  },
];

const mockCoupons = {
  fixed5000: {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    discountType: "fixed" as const,
    discount: 5000,
    minimumAmount: 100000,
    expirationDate: "2025-11-30",
  },
  bogo: {
    id: 2,
    code: "BOGO",
    description: "2+1 쿠폰",
    discountType: "buyXgetY" as const,
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: "2025-06-30",
  },
  freeShipping: {
    id: 3,
    code: "FREESHIP",
    description: "무료 배송 쿠폰",
    discountType: "freeShipping" as const,
    minimumAmount: 50000,
    expirationDate: "2025-08-31",
  },
  miracleSale: {
    id: 4,
    code: "MIRACLE30",
    description: "30% 시간제 할인 쿠폰",
    discountType: "percentage" as const,
    discount: 30,
    availableTime: { start: "04:00", end: "07:00" },
    expirationDate: "2025-07-31",
  },
} satisfies Record<string, Coupon>;

describe("CouponCalculator 테스트", () => {
  describe("단일 쿠폰 할인 계산", () => {
    it("5000원 고정 할인 쿠폰 - 최소 주문 금액 만족", () => {
      const orderInfo = OrderService.createOrderInfo(
        mockHighValueCartItems,
        false
      );

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.fixed5000,
        orderInfo
      );

      expect(discount).toBe(5000);
    });

    it("5000원 고정 할인 쿠폰 - 최소 주문 금액 미만", () => {
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

      const orderInfo = OrderService.createOrderInfo(smallOrderItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.fixed5000,
        orderInfo
      );

      expect(discount).toBe(0);
    });

    it("2+1 쿠폰 - 구매 조건 만족", () => {
      const orderInfo = OrderService.createOrderInfo(mockCartItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.bogo,
        orderInfo
      );

      expect(discount).toBe(30000);
    });

    it("무료 배송 쿠폰 - 일반 지역, 최소 주문 금액 만족", () => {
      const orderInfo = OrderService.createOrderInfo(mockCartItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.freeShipping,
        orderInfo
      );

      expect(discount).toBe(0);
    });

    it("무료 배송 쿠폰 - 도서산간 지역, 최소 주문 금액 만족", () => {
      const orderInfo = OrderService.createOrderInfo(mockCartItems, true);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.freeShipping,
        orderInfo
      );

      expect(discount).toBe(3000);
    });

    it("무료 배송 쿠폰 - 소액 주문, 도서산간 지역", () => {
      const smallOrderItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "소액상품",
            price: 30000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(smallOrderItems, true);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.freeShipping,
        orderInfo
      );

      expect(discount).toBe(6000);
    });

    it("무료 배송 쿠폰 - 이미 무료 배송 적용된 경우", () => {
      const orderInfo = OrderService.createOrderInfo(
        mockHighValueCartItems,
        false
      );

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.freeShipping,
        orderInfo
      );

      expect(discount).toBe(0);
    });
  });

  describe("시간 조건 쿠폰 테스트", () => {
    let originalDate: typeof Date;

    beforeEach(() => {
      originalDate = global.Date;
    });

    afterEach(() => {
      global.Date = originalDate;
    });

    it("미라클 모닝 쿠폰 - 적용 시간 내 (오전 5시)", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 5,
      })) as unknown as DateConstructor;

      const orderInfo = OrderService.createOrderInfo(mockCartItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.miracleSale,
        orderInfo
      );

      expect(discount).toBe(30000);
    });

    it("미라클 모닝 쿠폰 - 적용 시간 외 (오전 8시)", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 8,
      })) as unknown as DateConstructor;

      const orderInfo = OrderService.createOrderInfo(mockCartItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.miracleSale,
        orderInfo
      );

      expect(discount).toBe(0);
    });

    it("미라클 모닝 쿠폰 - 경계값 테스트 (오전 4시)", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 4,
      })) as unknown as DateConstructor;

      const orderInfo = OrderService.createOrderInfo(mockCartItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.miracleSale,
        orderInfo
      );

      expect(discount).toBe(30000);
    });

    it("미라클 모닝 쿠폰 - 경계값 테스트 (오전 7시)", () => {
      global.Date = jest.fn(() => ({
        getHours: () => 7,
      })) as unknown as DateConstructor;

      const orderInfo = OrderService.createOrderInfo(mockCartItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.miracleSale,
        orderInfo
      );

      expect(discount).toBe(0);
    });
  });

  describe("복합 쿠폰 적용", () => {
    it("고정 할인 + 무료 배송 쿠폰 조합", () => {
      const orderInfo = OrderService.createOrderInfo(
        mockHighValueCartItems,
        true
      );

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [mockCoupons.fixed5000, mockCoupons.freeShipping],
        orderInfo
      );

      expect(result.totalDiscount).toBe(5000);
      expect(result.deliveryDiscount).toBe(3000);
      expect(result.finalOrderAmount).toBe(195000);
      expect(result.finalDeliveryFee).toBe(0);
    });

    it("2+1 쿠폰 + 무료 배송 쿠폰 조합", () => {
      const smallOrderItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "소액상품",
            price: 30000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(smallOrderItems, true);

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [mockCoupons.bogo, mockCoupons.freeShipping],
        orderInfo
      );

      expect(result.totalDiscount).toBe(30000);
      expect(result.deliveryDiscount).toBe(6000);
      expect(result.finalOrderAmount).toBe(30000);
      expect(result.finalDeliveryFee).toBe(0);
    });

    it("중복 무료 배송 쿠폰 방지", () => {
      const anotherFreeShipping = { ...mockCoupons.freeShipping, id: 5 };

      const smallOrderItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "소액상품",
            price: 30000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(smallOrderItems, false);

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [mockCoupons.freeShipping, anotherFreeShipping],
        orderInfo
      );

      expect(result.deliveryDiscount).toBe(3000);
      expect(result.appliedCoupons.length).toBe(1);
    });
  });

  describe("최적 쿠폰 조합 찾기", () => {
    let originalDate: typeof Date;

    beforeEach(() => {
      originalDate = global.Date;
      global.Date = jest.fn(() => ({
        getHours: () => 5,
      })) as unknown as DateConstructor;
    });

    afterEach(() => {
      global.Date = originalDate;
    });

    it("고액 주문에서 최적 조합 선택", () => {
      const orderInfo = OrderService.createOrderInfo(
        mockHighValueCartItems,
        false
      );
      const availableCoupons = Object.values(mockCoupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons,
        orderInfo
      );

      expect(result.totalDiscount).toBe(160000);
      expect(result.appliedCoupons).toHaveLength(2);
      expect(
        result.appliedCoupons.some((c) => c.discountType === "percentage")
      ).toBe(true);
      expect(
        result.appliedCoupons.some((c) => c.discountType === "buyXgetY")
      ).toBe(true);
    });

    it("중간 금액에서 최적 조합 선택", () => {
      const orderInfo = OrderService.createOrderInfo(mockCartItems, true);
      const availableCoupons = Object.values(mockCoupons);

      const result = CouponCalculator.findOptimalCouponCombination(
        availableCoupons,
        orderInfo
      );

      const totalBenefit = result.totalDiscount + result.deliveryDiscount;
      expect(totalBenefit).toBe(60000);
    });
  });

  describe("배송비 정책 테스트", () => {
    it("주문 금액 10만원 이상 - 쿠폰 적용 후에도 무료 배송 유지", () => {
      const orderInfo = OrderService.createOrderInfo(
        mockHighValueCartItems,
        false
      );

      global.Date = jest.fn(() => ({
        getHours: () => 5,
      })) as unknown as DateConstructor;

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [mockCoupons.miracleSale],
        orderInfo
      );

      expect(result.finalOrderAmount).toBe(140000);
      expect(result.finalDeliveryFee).toBe(0);
    });

    it("도서산간 지역 추가 배송비", () => {
      const smallOrderItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "소액상품",
            price: 30000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(smallOrderItems, true);

      const deliveryFee = CouponCalculator.calculateDeliveryFeeWithCoupons(
        orderInfo.originalOrderAmount,
        orderInfo.isRemoteArea,
        []
      );

      expect(deliveryFee).toBe(6000);
    });
  });

  describe("경계값 테스트", () => {
    it("최소 주문 금액 경계값 - 정확히 10만원", () => {
      const exactBoundaryItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: "경계값상품",
            price: 100000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(exactBoundaryItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.fixed5000,
        orderInfo
      );

      expect(discount).toBe(5000);
    });

    it("최소 주문 금액 경계값 - 99,999원", () => {
      const belowBoundaryItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: "경계값상품",
            price: 99999,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(belowBoundaryItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.fixed5000,
        orderInfo
      );

      expect(discount).toBe(0);
    });

    it("2+1 쿠폰 - 수량이 정확히 조건과 일치", () => {
      const exactBogoItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "상품",
            price: 10000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(exactBogoItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.bogo,
        orderInfo
      );

      expect(discount).toBe(10000);
    });

    it("2+1 쿠폰 - 수량이 조건보다 1개 적음", () => {
      const belowBogoItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: "상품",
            price: 10000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(belowBogoItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.bogo,
        orderInfo
      );

      expect(discount).toBe(0);
    });
  });

  describe("복잡한 할인 시나리오", () => {
    it("여러 상품에 2+1 쿠폰 적용 - 가장 비싼 상품에 적용", () => {
      const multipleBogoItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: "저가상품",
            price: 10000,
            imageUrl: "image1.jpg",
            category: "카테고리1",
          },
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "고가상품",
            price: 50000,
            imageUrl: "image2.jpg",
            category: "카테고리2",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(multipleBogoItems, false);

      const discount = CouponCalculator.calculateSingleCouponDiscount(
        mockCoupons.bogo,
        orderInfo
      );

      expect(discount).toBe(60000);
    });

    it("할인 후 주문 금액이 0원 이하가 되지 않음", () => {
      const smallOrderItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: "소액상품",
            price: 3000,
            imageUrl: "image.jpg",
            category: "카테고리",
          },
        },
      ];

      const orderInfo = OrderService.createOrderInfo(smallOrderItems, false);

      const largeFixedCoupon: Coupon = {
        id: 99,
        code: "LARGE10000",
        description: "대형 할인 쿠폰",
        discountType: "fixed",
        discount: 10000,
        expirationDate: "2025-12-31",
      };

      const result = CouponCalculator.calculateSelectedCouponsDiscount(
        [largeFixedCoupon],
        orderInfo
      );

      expect(result.finalOrderAmount).toBe(0);
      expect(result.totalDiscount).toBe(10000);
    });
  });
});
