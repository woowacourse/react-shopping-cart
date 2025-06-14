import { CartItemCheckType } from "../hooks/useCartAPI";
import { Coupon } from "../types/response";
import {
  isCouponAvailable,
  isFreeShippingAvailable,
} from "../utils/coupons/isCouponAvailable";
import getCurrentTime from "../utils/getCurrentTime";

jest.mock("../utils/getCurrentTime");
const mockGetCurrentTime = getCurrentTime as jest.MockedFunction<
  typeof getCurrentTime
>;

describe("isCouponAvailable 테스트", () => {
  const sampleCoupon: Coupon = {
    id: 1,
    code: "SALE_TEST",
    description: "메이토가 주는 할인 쿠폰",
    discountType: "fixed",
    expirationDate: "2025-11-30",
    minimumAmount: 100000,
  };

  const sampleCartItems: CartItemCheckType[] = [
    {
      id: 101,
      quantity: 2,
      price: 5000,
      name: "방울토마토",
      imageUrl: "",
      checked: true,
    },
    {
      id: 102,
      quantity: 3,
      price: 3000,
      name: "완숙 토마토",
      imageUrl: "",
      checked: true,
    },
  ];

  beforeEach(() => {
    mockGetCurrentTime.mockReturnValue({
      currentYear: 2025,
      currentMonth: 6,
      currentDate: 12,
      currentHour: 10,
    });

    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-06-12T10:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe("날짜 만료 확인", () => {
    it("만료되지 않은 쿠폰은 사용 가능해야 한다", () => {
      const coupon = { ...sampleCoupon, expirationDate: "2025-12-31" };
      const result = isCouponAvailable(sampleCartItems, coupon, 1000001);
      expect(result).toBe(true);
    });

    it("만료된 쿠폰은 사용 불가능해야 한다", () => {
      const coupon = { ...sampleCoupon, expirationDate: "2025-01-01" };
      const result = isCouponAvailable(sampleCartItems, coupon, 100001);
      expect(result).toBe(false);
    });

    it("패딩 없는 월/일도 올바르게 처리해야 한다", () => {
      const coupon = { ...sampleCoupon, expirationDate: "2025-1-1" };
      const result = isCouponAvailable(sampleCartItems, coupon, 100000);
      expect(result).toBe(false);
    });
  });

  describe("시간 조건 확인", () => {
    it("사용 가능 시간 내에서는 쿠폰을 사용할 수 있어야 한다", () => {
      const coupon = {
        ...sampleCoupon,
        availableTime: { start: "04:00", end: "07:00" },
      };
      mockGetCurrentTime.mockReturnValue({
        currentYear: 2025,
        currentMonth: 6,
        currentDate: 12,
        currentHour: 5,
      });

      // 사용 시간만 통제 (최소 주문 금액은 넘긴 상황)
      const result = isCouponAvailable(sampleCartItems, coupon, 100001);
      expect(result).toBe(true);
    });

    it("사용 가능 시간 외에서는 쿠폰을 사용할 수 없어야 한다", () => {
      const coupon = {
        ...sampleCoupon,
        availableTime: { start: "09:00", end: "18:00" },
      };
      mockGetCurrentTime.mockReturnValue({
        currentYear: 2025,
        currentMonth: 6,
        currentDate: 12,
        currentHour: 20,
      });

      // 사용 시간만 통제 (최소 주문 금액은 넘긴 상황)
      const result = isCouponAvailable(sampleCartItems, coupon, 100001);
      expect(result).toBe(false);
    });
  });

  describe("최소 주문 금액 확인", () => {
    it("최소 주문 금액을 만족하면 사용 가능해야 한다", () => {
      const coupon = { ...sampleCoupon };
      const result = isCouponAvailable(sampleCartItems, coupon, 100001);
      expect(result).toBe(true);
    });

    it("최소 주문 금액을 만족하지 않으면 사용 불가능해야 한다", () => {
      const coupon = { ...sampleCoupon };
      const result = isCouponAvailable(sampleCartItems, coupon, 99999);
      expect(result).toBe(false);
    });

    it("최소 주문 금액과 정확히 같으면 사용 가능해야 한다", () => {
      const coupon = { ...sampleCoupon };
      const result = isCouponAvailable(sampleCartItems, coupon, 100000);
      expect(result).toBe(true);
    });
  });

  describe("할인 타입별 조건 확인", () => {
    describe("무료배송 쿠폰 테스트", () => {
      it("무료배송 쿠폰은 최소 주문 금액을 만족하면 사용 가능해야 한다", () => {
        const coupon = {
          ...sampleCoupon,
          discountType: "freeShipping" as const,
          minimumAmount: 50000,
        };
        const result = isCouponAvailable(sampleCartItems, coupon, 50000);
        expect(result).toBe(true);
      });

      it("무료배송 쿠폰은 최소 주문 금액을 만족하지 않으면 사용 불가능해야 한다", () => {
        const coupon = {
          ...sampleCoupon,
          discountType: "freeShipping" as const,
        };
        const result = isCouponAvailable(sampleCartItems, coupon, 49000);
        expect(result).toBe(false);
      });
    });

    describe("Buy X Get Y", () => {
      it("구매 수량 조건을 만족하면 사용 가능해야 한다", () => {
        const coupon = {
          ...sampleCoupon,
          discountType: "buyXgetY" as const,
          buyQuantity: 2,
          getQuantity: 1,
        };
        const cartItems = [
          {
            id: 101,
            quantity: 3,
            price: 5000,
            imageUrl: "",
            name: "방울토마토",
            checked: true,
          },
        ];
        const result = isCouponAvailable(cartItems, coupon, 15000);
        expect(result).toBe(true);
      });

      it("구매 수량 조건을 만족하지 않으면 사용 불가능해야 한다", () => {
        const coupon = {
          ...sampleCoupon,
          discountType: "buyXgetY" as const,
          buyQuantity: 3,
          getQuantity: 1,
          minimumAmount: undefined,
        };
        const cartItems = [
          {
            id: 101,
            quantity: 2,
            price: 5000,
            imageUrl: "",
            name: "방울토마토",
            checked: true,
          },
        ];
        const result = isCouponAvailable(cartItems, coupon, 15000);
        expect(result).toBe(false);
      });
    });
  });

  describe("복합 조건 테스트", () => {
    it("모든 조건을 만족하면 쿠폰을 사용할 수 있어야 한다", () => {
      const coupon = {
        ...sampleCoupon,
        expirationDate: "2025-12-31",
        availableTime: { start: "04:00", end: "17:00" },
        discountType: "fixed" as const,
        minimumAmount: 10000,
      };
      mockGetCurrentTime.mockReturnValue({
        currentYear: 2025,
        currentMonth: 6,
        currentDate: 12,
        currentHour: 14,
      });

      const result = isCouponAvailable(sampleCartItems, coupon, 15000);
      expect(result).toBe(true);
    });

    it("하나의 조건이라도 만족하지 않으면 쿠폰을 사용할 수 없어야 한다", () => {
      const coupon = {
        ...sampleCoupon,
        expirationDate: "2025-12-31",
        availableTime: { start: "09:00", end: "18:00" },
        discountType: "fixed" as const,
        minimumAmount: 30000,
      };
      mockGetCurrentTime.mockReturnValue({
        currentYear: 2025,
        currentMonth: 6,
        currentDate: 12,
        currentHour: 14,
      });

      const result = isCouponAvailable(sampleCartItems, coupon, 15000);
      expect(result).toBe(false);
    });
  });
});

describe("isFreeShippingAvailable 테스트", () => {
  const sampleCoupon: Coupon = {
    id: 1,
    code: "FREESHIPPING",
    description: "5만원 이상 구매시 무료 배송 쿠폰",
    discountType: "freeShipping",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    buyQuantity: undefined,
    getQuantity: undefined,
  };

  it("무료배송 쿠폰이고 최소 주문 금액을 만족하면 true를 반환해야 한다", () => {
    const result = isFreeShippingAvailable(sampleCoupon, 50001);
    expect(result).toBe(true);
  });

  it("무료배송 쿠폰이 아니면 false를 반환해야 한다", () => {
    const coupon = { ...sampleCoupon, discountType: "freeShipping" as const };
    const result = isFreeShippingAvailable(coupon, 15000);
    expect(result).toBe(false);
  });

  it("무료배송 쿠폰이지만 최소 주문 금액을 만족하지 않으면 false를 반환해야 한다", () => {
    const result = isFreeShippingAvailable(sampleCoupon, 5000);
    expect(result).toBe(false);
  });
});
