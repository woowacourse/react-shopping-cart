import { CouponResponse } from "../src/type/coupon";
import { getValidCoupons } from "../src/components/feature/Coupon/CouponList/utils/validate";
import { CartProduct } from "../src/type/cart";

const coupons: CouponResponse[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2099-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2099-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2099-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2099-07-31",
    discount: 30,
    availableTime: {
      start: "00:00",
      end: "23:59",
    },
    discountType: "percentage",
  },
];

const cartItems: CartProduct[] = [
  {
    id: 1,
    quantity: 3,
    product: {
      category: "식료품",
      id: 7001,
      imageUrl: "d",
      name: "상품A",
      price: 2000,
      quantity: 50,
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      category: "음료",
      id: 7002,
      imageUrl: "e",
      name: "상품B",
      price: 1500,
      quantity: 100,
    },
  },
];

describe("getValidCoupons - mocking 없이 경계값 테스트", () => {
  test("FIXED5000: totalPrice가 minimumAmount와 같을 때 유효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 100000,
      isRemoteArea: false,
      cartItems,
      selectedCartIds: [1, 2],
    });

    expect(result.some((c) => c.code === "FIXED5000")).toBe(true);
  });

  test("FIXED5000: totalPrice가 minimumAmount보다 작으면 무효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 99999,
      isRemoteArea: false,
      cartItems,
      selectedCartIds: [1, 2],
    });

    expect(result.some((c) => c.code === "FIXED5000")).toBe(false);
  });

  test("BOGO: 상품 수량이 buyQuantity 초과하면 유효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 0,
      isRemoteArea: false,
      cartItems: [
        {
          id: 1,
          quantity: 3,
          product: {
            category: "음료",
            id: 9001,
            imageUrl: "",
            name: "콜라",
            price: 1000,
            quantity: 10,
          },
        },
      ],
      selectedCartIds: [1],
    });

    expect(result.some((c) => c.code === "BOGO")).toBe(true);
  });

  test("BOGO: 상품 수량이 buyQuantity 이하이면 무효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 0,
      isRemoteArea: false,
      cartItems: [
        {
          id: 1,
          quantity: 2,
          product: {
            category: "음료",
            id: 9001,
            imageUrl: "",
            name: "콜라",
            price: 1000,
            quantity: 10,
          },
        },
      ],
      selectedCartIds: [1],
    });

    expect(result.some((c) => c.code === "BOGO")).toBe(false);
  });

  test("FREESHIPPING: 총액과 배송지 조건이 만족하면 유효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 50000,
      isRemoteArea: true,
      cartItems,
      selectedCartIds: [1, 2],
    });

    expect(result.some((c) => c.code === "FREESHIPPING")).toBe(true);
  });

  test("FREESHIPPING: 금액이 부족하면 무효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 49999,
      isRemoteArea: true,
      cartItems,
      selectedCartIds: [1, 2],
    });

    expect(result.some((c) => c.code === "FREESHIPPING")).toBe(false);
  });

  test("FREESHIPPING: 도서산간 아님 → 배송비 없으면 무효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 100000,
      isRemoteArea: false,
      cartItems,
      selectedCartIds: [1, 2],
    });

    expect(result.some((c) => c.code === "FREESHIPPING")).toBe(false);
  });

  test("MIRACLESALE: 시간 조건 만족 시 유효", () => {
    const result = getValidCoupons({
      coupons,
      totalPrice: 0,
      isRemoteArea: false,
      cartItems,
      selectedCartIds: [1],
    });

    expect(result.some((c) => c.code === "MIRACLESALE")).toBe(true);
  });

  test("만료된 쿠폰은 무효 처리", () => {
    const expiredCoupon: CouponResponse = {
      id: 99,
      code: "FIXED5000",
      description: "만료된 쿠폰",
      expirationDate: "2000-01-01",
      discount: 5000,
      minimumAmount: 1000,
      discountType: "fixed",
    };

    const result = getValidCoupons({
      coupons: [expiredCoupon],
      totalPrice: 100000,
      isRemoteArea: false,
      cartItems,
      selectedCartIds: [1],
    });

    expect(result).toHaveLength(0);
  });
});
