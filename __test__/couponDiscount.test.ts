import { getTotalDiscount } from "../src/components/feature/Coupon/CouponList/utils/calculate";

const coupons = {
  FIXED5000: {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  BOGO: {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  FREESHIPPING: {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  MIRACLESALE: {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
} as const;

const PRODUCT = {
  "100000": {
    id: 1,
    quantity: 3,
    product: {
      category: "음료",
      id: 9001,
      imageUrl: "",
      name: "콜라",
      price: 100_000,
      quantity: 10,
    },
  },
  "50000": {
    id: 1,
    quantity: 1,
    product: {
      category: "음료",
      id: 9001,
      imageUrl: "",
      name: "콜라",
      price: 50_000,
      quantity: 10,
    },
  },
  "70000": {
    id: 1,
    quantity: 3,
    product: {
      category: "음료",
      id: 9001,
      imageUrl: "",
      name: "콜라",
      price: 50_000,
      quantity: 10,
    },
  },
  "150000": {
    id: 1,
    quantity: 1,
    product: {
      category: "음료",
      id: 9001,
      imageUrl: "",
      name: "콜라",
      price: 150_000,
      quantity: 10,
    },
  },
};

describe("쿠폰 할인 금액 계산 테스트", () => {
  test("5,000원 할인 쿠폰 할인 금액 계산 테스트", () => {
    const discount = getTotalDiscount({
      appliedCoupons: [coupons.FIXED5000],
      orderItems: [PRODUCT["100000"]],
      isRemoteArea: true,
    });
    expect(discount).toBe(5000);
  });

  test("2개 구매 시 1개 무료 쿠폰 할인 금액 계산 테스트", () => {
    const discount = getTotalDiscount({
      appliedCoupons: [coupons.BOGO],
      orderItems: [PRODUCT["70000"], PRODUCT["100000"], PRODUCT["150000"]],
      isRemoteArea: true,
    });
    expect(discount).toBe(100000);
  });

  test("5만원 이상 구매 시 무료 배송 쿠폰 할인 금액 계산 테스트", () => {
    const discount = getTotalDiscount({
      appliedCoupons: [coupons.FREESHIPPING],
      orderItems: [PRODUCT["50000"]],
      isRemoteArea: false,
    });
    expect(discount).toBe(3000);
  });

  test("제주 및 도서 산간 지역 5만원 이상 구매 시 무료 배송 쿠폰 할인 금액 계산 테스트", () => {
    const discount = getTotalDiscount({
      appliedCoupons: [coupons.FREESHIPPING],
      orderItems: [PRODUCT["50000"]],
      isRemoteArea: true,
    });
    expect(discount).toBe(6000);
  });

  test("미라클모닝 30% 할인 쿠폰 금액 계산 테스트", () => {
    const discount = getTotalDiscount({
      appliedCoupons: [coupons.MIRACLESALE],
      orderItems: [PRODUCT["150000"]],
      isRemoteArea: true,
    });
    expect(discount).toBe(45000);
  });

  test("percentage 쿠폰을 포함한 쿠폰 적용시 percentage 쿠폰을 우선 적용", () => {
    const testCases = [
      [coupons.FIXED5000, coupons.MIRACLESALE],
      [coupons.MIRACLESALE, coupons.FIXED5000],
    ];

    testCases.forEach((appliedCoupons) => {
      const discount = getTotalDiscount({
        appliedCoupons,
        orderItems: [PRODUCT["150000"]],
        isRemoteArea: true,
      });

      expect(discount).toBe(50000);
    });
  });
});
