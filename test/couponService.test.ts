import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { DISCOUNT_TYPE_KEY } from "../src/constants/coupon";
import {
  CartItemType,
  CategoryType,
  ProductItemType,
} from "../src/types/response";
import getCouponHandler from "../src/domain/coupon/couponHandler";
import {
  BuyXGetYCouponType,
  FixedCouponType,
  FreeShippingCouponType,
  PercentageCouponType,
} from "../src/components/Coupon/types";
import couponService from "../src/domain/coupon/couponService";

const makeProduct = (
  id: number,
  price: number,
  category: CategoryType = "식료품"
): ProductItemType => ({
  id,
  name: `Product${id}`,
  category,
  price,
  imageUrl: `http://img/${id}.png`,
});

describe("couponHandlerMap 기본 동작", () => {
  const sampleItems: CartItemType[] = [
    { id: 1, product: makeProduct(1, 100, "식료품"), quantity: 3 },
    { id: 2, product: makeProduct(2, 50, "패션잡화"), quantity: 1 },
  ];
  const orderCost = 200;
  const deliveryCost = 15;
  const baseCouponFields = {
    id: 1,
    code: "TEST",
    description: "테스트 쿠폰",
    expirationDate: { year: "2025", month: "06", day: "20" },
  };

  it("고정 할인(fixed) 쿠폰: 최소 금액 경계값", () => {
    const coupon: FixedCouponType = {
      ...baseCouponFields,
      discountType: "fixed",
      discount: 20,
      minimumAmount: 100,
    };
    const handler = getCouponHandler(DISCOUNT_TYPE_KEY.fixed);

    expect(
      handler.canRedeem({
        coupon,
        orderCost: 99,
        selectedItems: [],
        deliveryCost,
      })
    ).toBe(false);

    expect(
      handler.canRedeem({
        coupon,
        orderCost: 100,
        selectedItems: [],
        deliveryCost,
      })
    ).toBe(true);

    expect(
      handler.calculate({
        coupon,
        orderCost,
        selectedItems: [],
        deliveryCost,
      })
    ).toBe(20);
  });

  it("무료 배송(freeShipping) 쿠폰: 최소 금액 경계값", () => {
    const coupon: FreeShippingCouponType = {
      ...baseCouponFields,
      discountType: "freeShipping",
      minimumAmount: 50,
    };
    const handler = getCouponHandler(DISCOUNT_TYPE_KEY.freeShipping);

    expect(
      handler.canRedeem({
        coupon,
        orderCost: 49,
        selectedItems: [],
        deliveryCost,
      })
    ).toBe(false);

    expect(
      handler.canRedeem({
        coupon,
        orderCost: 50,
        selectedItems: [],
        deliveryCost,
      })
    ).toBe(true);

    expect(
      handler.calculate({
        coupon,
        orderCost,
        selectedItems: [],
        deliveryCost,
      })
    ).toBe(deliveryCost);
  });

  it("Buy X Get Y 쿠폰: getQuantity 경계값", () => {
    const coupon: BuyXGetYCouponType = {
      ...baseCouponFields,
      discountType: "buyXgetY",
      buyQuantity: 2,
      getQuantity: 1,
    };
    const handler = getCouponHandler(DISCOUNT_TYPE_KEY.buyXgetY);

    expect(
      handler.canRedeem({
        coupon,
        orderCost,
        selectedItems: [{ id: 3, product: makeProduct(3, 100), quantity: 1 }],
        deliveryCost,
      })
    ).toBe(false);

    expect(
      handler.canRedeem({
        coupon,
        orderCost,
        selectedItems: [{ id: 4, product: makeProduct(4, 80), quantity: 2 }],
        deliveryCost,
      })
    ).toBe(true);

    expect(
      handler.calculate({
        coupon,
        orderCost,
        selectedItems: sampleItems,
        deliveryCost,
      })
    ).toBe(100 * 1);
  });
});

describe("couponService 함수 테스트", () => {
  const sampleItems: CartItemType[] = [
    { id: 1, product: makeProduct(1, 100), quantity: 3 },
  ];
  const orderCost = 200;
  const deliveryCost = 15;
  const baseCouponFields = {
    id: 1,
    code: "COMBO",
    description: "조합 테스트",
    expirationDate: { year: "2025", month: "07", day: "31" },
  };

  it("redeemAll을 호출하여 여러 쿠폰을 합산한 할인 금액을 계산한다.", () => {
    const fixed: FixedCouponType = {
      ...baseCouponFields,
      discountType: "fixed",
      discount: 10,
      minimumAmount: 0,
    };
    const freeShip: FreeShippingCouponType = {
      ...baseCouponFields,
      discountType: "freeShipping",
      minimumAmount: 0,
    };
    const total = couponService.redeemAll({
      selectedCoupons: [fixed, freeShip],
      orderCost,
      selectedItems: sampleItems,
      deliveryCost,
    });
    expect(total).toBe(10 + 15);
  });

  it("calculateBestCouponDiscount을 호출하여 최적의 쿠폰조합을 찾아 할인 금액을 계산한다.", () => {
    const fixed: FixedCouponType = {
      ...baseCouponFields,
      discountType: "fixed",
      discount: 20,
      minimumAmount: 0,
    };
    const percentage: PercentageCouponType = {
      ...baseCouponFields,
      discountType: "percentage",
      discount: 50,
      availableTime: {
        start: { hour: 4, minute: 0 },
        end: { hour: 8, minute: 0 },
      },
    };
    const buyXgetY: BuyXGetYCouponType = {
      ...baseCouponFields,
      discountType: "buyXgetY",
      buyQuantity: 2,
      getQuantity: 1,
    };

    const best = couponService.calculateBestCouponDiscount({
      selectedCoupons: [fixed, percentage, buyXgetY],
      orderCost,
      selectedItems: sampleItems,
      deliveryCost,
    });
    expect(best).toBe(220);
  });
});

describe("미라클 모닝(percentage) 쿠폰 시간 경계값 테스트", () => {
  const miracleMorning: PercentageCouponType = {
    id: 99,
    code: "MIRACLESALE",
    description: "미라클 모닝 30%",
    expirationDate: { year: "2025", month: "07", day: "31" },
    discountType: "percentage",
    discount: 30,
    availableTime: {
      start: { hour: 4, minute: 0 },
      end: { hour: 8, minute: 0 },
    },
  };
  const orderCost = 200;
  const deliveryCost = 0;
  const items: CartItemType[] = [];

  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it("04:00 직전에는 불가", () => {
    vi.setSystemTime(new Date("2025-06-14T03:59:59+09:00"));
    expect(
      couponService.decideCanRedeem({
        coupon: miracleMorning,
        orderCost,
        selectedItems: items,
        deliveryCost,
      })
    ).toBe(false);
  });

  it("04:00에부터 가능", () => {
    vi.setSystemTime(new Date("2025-06-14T04:00:00+09:00"));
    expect(
      couponService.decideCanRedeem({
        coupon: miracleMorning,
        orderCost,
        selectedItems: items,
        deliveryCost,
      })
    ).toBe(true);
  });

  it("07:00까지 가능", () => {
    vi.setSystemTime(new Date("2025-06-14T07:00:00+09:00"));
    expect(
      couponService.decideCanRedeem({
        coupon: miracleMorning,
        orderCost,
        selectedItems: items,
        deliveryCost,
      })
    ).toBe(true);
  });

  it("09:00 직후 불가", () => {
    vi.setSystemTime(new Date("2025-06-14T09:00:01+09:00"));
    expect(
      couponService.decideCanRedeem({
        coupon: miracleMorning,
        orderCost,
        selectedItems: items,
        deliveryCost,
      })
    ).toBe(false);
  });
});
