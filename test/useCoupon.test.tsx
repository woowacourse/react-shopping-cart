import { SHIPPING_FEE } from "../src/constants";
import {
  BuyXGetYCoupon,
  CartItem,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
  Product,
} from "../src/types/type";
import { calculateFixedDiscount } from "../src/utils/coupons/calculateFixedDiscount";
import { calculateFreeShippingDiscount } from "../src/utils/coupons/calculateFreeShippingDiscount";
import { calculatePercentageDiscount } from "../src/utils/coupons/calculatePercentageDiscount";
import { calculateBuyXgetYDiscount } from "../src/utils/coupons/calulateBuyXgetYDiscount";
import { isValidExpiration } from "../src/utils/coupons/isValidExpiration";
import { vi } from "vitest";

describe("쿠폰 유효기간 검증", () => {
  it("쿠폰 만료기한이 오늘이면 true를 반환해야 한다", () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    expect(isValidExpiration(todayStr)).toBe(true);
  });

  it("쿠폰 만료기한이 하루 전이면 false를 반환해야 한다", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const date = String(yesterday.getDate()).padStart(2, "0");
    const yesterdayStr = `${year}-${month}-${date}`;

    expect(isValidExpiration(yesterdayStr)).toBe(false);
  });

  it("쿠폰 만료기한이 하루 뒤면 true를 반환해야 한다", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const tomorrowStr = `${yyyy}-${mm}-${dd}`;

    expect(isValidExpiration(tomorrowStr)).toBe(true);
  });
});

describe("고정 할인 쿠폰 계산", () => {
  const fixedCoupon: FixedDiscountCoupon = {
    id: 1,
    code: "FIXED1000",
    description: "1000원 할인 쿠폰",
    expirationDate: "2099-12-31",
    discountType: "fixed",
    discount: 1000,
    minimumAmount: 5000,
  };

  it("주문 금액이 minimumAmount보다 적으면 0을 반환한다", () => {
    expect(calculateFixedDiscount(4999, fixedCoupon)).toBe(0);
  });

  it("주문 금액이 minimumAmount와 같으면 할인 금액을 반환한다", () => {
    expect(calculateFixedDiscount(5000, fixedCoupon)).toBe(1000);
  });

  it("주문 금액이 minimumAmount보다 크면 할인 금액을 반환한다", () => {
    expect(calculateFixedDiscount(5001, fixedCoupon)).toBe(1000);
  });
});

describe("무료 배송 쿠폰 계산", () => {
  const freeShippingCoupon: FreeShippingCoupon = {
    id: 1,
    code: "FREE-SHIPPING",
    description: "무료 배송 쿠폰",
    expirationDate: "2099-12-31",
    discountType: "freeShipping",
    minimumAmount: 5000,
  };
  it("주문 금액이 minimumAmount보다 적으면 0을 반환한다.", () => {
    expect(calculateFreeShippingDiscount(4999, freeShippingCoupon, false)).toBe(
      0
    );
  });
  it(`주문 금액이 minimumAmount과 같고, 제주도 및 도서 산간지역이 아니면 ${SHIPPING_FEE}을 반환한다.`, () => {
    expect(calculateFreeShippingDiscount(5000, freeShippingCoupon, false)).toBe(
      SHIPPING_FEE
    );
  });
  it(`주문 금액이 minimumAmount보다 크고, 제주도 및 도서 산간지역이 아니면 ${SHIPPING_FEE}을 반환한다.`, () => {
    expect(calculateFreeShippingDiscount(5001, freeShippingCoupon, false)).toBe(
      SHIPPING_FEE
    );
  });
  it(`주문 금액이 minimumAmount보다 같고, 제주도 및 도서 산간지역이면 ${
    SHIPPING_FEE * 2
  }을 반환한다.`, () => {
    expect(calculateFreeShippingDiscount(5000, freeShippingCoupon, true)).toBe(
      SHIPPING_FEE * 2
    );
  });
  it(`주문 금액이 minimumAmount보다 크고, 제주도 및 도서 산간지역이면 ${
    SHIPPING_FEE * 2
  }을 반환한다.`, () => {
    expect(calculateFreeShippingDiscount(5001, freeShippingCoupon, true)).toBe(
      SHIPPING_FEE * 2
    );
  });
});

describe("퍼센트 할인 쿠폰 계산", () => {
  const percentageCoupon: PercentageDiscountCoupon = {
    id: 1,
    code: "PERCENTAGE1000",
    description: "20% 할인 쿠폰",
    expirationDate: "2099-12-31",
    discountType: "percentage",
    discount: 20,
    availableTime: {
      start: "05:00:00",
      end: "17:00:00",
    },
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("현재 시간이 시작 전이면 0을 반환해야 한다", () => {
    vi.setSystemTime(new Date("2025-06-09T04:59:59"));
    expect(calculatePercentageDiscount(10000, percentageCoupon)).toBe(0);
  });

  it("현재 시간이 시작과 종료 사이면 할인을 적용해야 한다", () => {
    vi.setSystemTime(new Date("2025-06-09T14:00:00"));
    expect(calculatePercentageDiscount(10000, percentageCoupon)).toBe(2000);
  });

  it("현재 시간이 종료 이후면 0을 반환해야 한다", () => {
    vi.setSystemTime(new Date("2025-06-09T17:00:01"));
    expect(calculatePercentageDiscount(10000, percentageCoupon)).toBe(0);
  });
});

describe("BXGX 할인 쿠폰 계산", () => {
  const BOGOCoupon: BuyXGetYCoupon = {
    id: 1,
    code: "BuyOneGetOne",
    description: "1+1 쿠폰",
    expirationDate: "2099-12-31",
    discountType: "buyXgetY",
    buyQuantity: 3,
    getQuantity: 2,
  };

  const product: Product = {
    id: 1,
    name: "아메리카노",
    price: 1000,
    category: "식료품",
    imageUrl: "americano.jpg",
  };

  it("구매 수량이 부족하면 0을 반환한다", () => {
    const selectedItems: CartItem[] = [{ id: 1, product, quantity: 1 }];

    expect(calculateBuyXgetYDiscount(BOGOCoupon, selectedItems)).toBe(0);
  });

  it("Buy X get Y을 만족하면 상품 가격을 반환한다", () => {
    const selectedItems: CartItem[] = [{ id: 1, product, quantity: 5 }];

    expect(calculateBuyXgetYDiscount(BOGOCoupon, selectedItems)).toBe(2000);
  });

  it("조건을 초과해도 상품 하나 가격만 반환한다", () => {
    const selectedItems: CartItem[] = [{ id: 1, product, quantity: 10 }];

    expect(calculateBuyXgetYDiscount(BOGOCoupon, selectedItems)).toBe(2000);
  });

  it("조건을 충족하는 여러 상품 중 가장 큰 금액의 제품으로 반영한다.", () => {
    const selectedItems: CartItem[] = [
      {
        id: 1,
        product: { ...product, price: 2000 },
        quantity: 5,
      },
      {
        id: 2,
        product: { ...product, price: 100000 },
        quantity: 5,
      },
    ];

    expect(calculateBuyXgetYDiscount(BOGOCoupon, selectedItems)).toBe(200000);
  });
});
