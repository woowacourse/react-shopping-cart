import { vi } from "vitest";
import { isCouponDisabled } from "../src/components/OrderSummary/CouponModal/CouponItem/couponDisabled.domain";
import { CouponType } from "../src/types/coupon";
import { CartItemType, CategoryType } from "../src/types/response";

describe("쿠폰 비활성화 조건 테스트", () => {
  const baseCoupon = {
    id: 1,
    code: "TEST",
    description: "테스트 쿠폰",
    expirationDate: "2099-12-31",
  };

  const cartItems: CartItemType[] = [
    {
      id: 1,
      product: {
        price: 10000,
        name: "상품1",
        imageUrl: "image1.jpg",
        category: "식료품",
        id: 1,
      },
      quantity: 5,
    },
  ];

  const baseParams = {
    orderCost: 20000,
    deliveryCost: 3000,
    selectedCoupon: [],
    cartItems,
  };

  it("쿠폰이 만료된 경우 true를 반환해야 한다", () => {
    const expiredCoupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 5000,
      expirationDate: "2000-01-01",
    };
    expect(
      isCouponDisabled({ ...baseParams, coupon: expiredCoupon, type: "fixed" })
    ).toBe(true);
  });

  it("쿠폰이 만료되지 않은 경우 false를 반환해야 한다", () => {
    const expiredCoupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 5000,
    };
    expect(
      isCouponDisabled({ ...baseParams, coupon: expiredCoupon, type: "fixed" })
    ).toBe(false);
  });

  it("쿠폰이 이미 2개 선택되어 있고 현재 쿠폰이 포함되지 않은 경우 true를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 5000,
    };
    const selected = [
      { ...coupon, code: "A" },
      { ...coupon, code: "B" },
    ];
    expect(
      isCouponDisabled({
        ...baseParams,
        coupon: { ...coupon, code: "C" },
        selectedCoupon: selected,
        type: "fixed",
      })
    ).toBe(true);
  });

  it("쿠폰이 이미 2개 선택되어 있고 현재 쿠폰이 포함된 경우 false를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 5000,
    };
    const selected = [
      { ...coupon, code: "A" },
      { ...coupon, code: "B" },
    ];
    expect(
      isCouponDisabled({
        ...baseParams,
        coupon: { ...coupon, code: "B" },
        selectedCoupon: selected,
        type: "fixed",
      })
    ).toBe(false);
  });

  it("시간 조건이 맞지 않는 퍼센트 쿠폰인 경우 true를 반환해야 한다", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-04T12:00:00"));

    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "percentage",
      discount: 10,
      availableTime: {
        start: "11:00",
        end: "11:30",
      },
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        coupon,
        selectedCoupon: [],
        type: "percentage",
      })
    ).toBe(true);
  });

  it("시간 조건이 맞는 퍼센트 쿠폰인 경우 false를 반환해야 한다", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-04T11:30:00"));

    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "percentage",
      discount: 10,
      availableTime: {
        start: "11:00",
        end: "11:30",
      },
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        coupon,
        selectedCoupon: [],
        type: "percentage",
      })
    ).toBe(false);
  });

  it("BuyXGetY 쿠폰 조건을 만족하는 상품이 없는 경우 true를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "buyXgetY",
      buyQuantity: 3,
      getQuantity: 3,
    };
    const items = [
      {
        id: 1,
        quantity: 5,
        product: {
          price: 10000,
          name: "상품1",
          imageUrl: "image1.jpg",
          category: "식료품" as CategoryType,
          id: 1,
        },
      },
    ];
    expect(
      isCouponDisabled({
        ...baseParams,
        cartItems: items,
        coupon,
        type: "buyXgetY",
      })
    ).toBe(true);
  });

  it("BuyXGetY 쿠폰 조건을 만족하지 않는 상품이 있는 경우 false를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "buyXgetY",
      buyQuantity: 3,
      getQuantity: 3,
    };
    const items = [
      {
        id: 1,
        quantity: 6,
        product: {
          price: 10000,
          name: "상품1",
          imageUrl: "image1.jpg",
          category: "식료품" as CategoryType,
          id: 1,
        },
      },
    ];
    expect(
      isCouponDisabled({
        ...baseParams,
        cartItems: items,
        coupon,
        type: "buyXgetY",
      })
    ).toBe(false);
  });

  it("최소 주문 금액보다 주문 금액이 낮은 경우 true를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 3000,
      minimumAmount: 50000,
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        orderCost: 20000,
        coupon,
        type: "fixed",
      })
    ).toBe(true);
  });

  it("최소 주문 금액보다 주문 금액이 높은 경우 false를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 3000,
      minimumAmount: 50000,
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        orderCost: 70000,
        coupon,
        type: "fixed",
      })
    ).toBe(false);
  });

  it("배송비가 0원인 경우 무료배송 쿠폰은 비활성화되어야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "freeShipping",
      minimumAmount: 1000,
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        deliveryCost: 0,
        coupon,
        type: "freeShipping",
      })
    ).toBe(true);
  });

  it("배송비가 0원이 아닌 경우 무료배송 쿠폰은 비활성화되어야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "freeShipping",
      minimumAmount: 1000,
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        deliveryCost: 3000,
        coupon,
        type: "freeShipping",
      })
    ).toBe(false);
  });

  it("모든 조건을 만족하는 경우 false를 반환해야 한다", () => {
    const coupon: CouponType = {
      ...baseCoupon,
      discountType: "fixed",
      discount: 1000,
      minimumAmount: 5000,
    };
    expect(
      isCouponDisabled({
        ...baseParams,
        coupon,
        type: "fixed",
      })
    ).toBe(false);
  });
});
