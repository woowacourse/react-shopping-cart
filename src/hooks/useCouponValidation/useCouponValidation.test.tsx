import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import useCouponValidation from "./useCouponValidation";
import { couponCheckedAtom } from "../../recoil/atom/atom";
import { checkedCartItemsSelector, orderPriceSelector, shippingFeeSelector } from "../../recoil/selector/selector";
import { mockCartItems } from "../../mocks/cartItems";
import { mockCoupons } from "../../mocks/coupons";
import { Coupon } from "../../types/coupon";
import { CHECKED_COUPONS_LENGTH } from "../../constants/setting";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValue: jest.fn(),
}));

const mockUseRecoilValue = jest.requireMock("recoil").useRecoilValue;

describe("useCouponValidation 훅 테스트", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-03-09 05:00:00")); // 현재 시간을 고정
  });

  afterAll(() => {
    jest.useRealTimers(); // 실제 타이머를 복원
  });

  beforeEach(() => {
    mockUseRecoilValue.mockImplementation((selector) => {
      if (selector === checkedCartItemsSelector) return mockCartItems;
      if (selector === orderPriceSelector) return 60000;
      if (selector === shippingFeeSelector) return 3000;
      if (selector === couponCheckedAtom) return [];
    });
  });

  describe("유효 기간 테스트", () => {
    it("만료일이 지난 쿠폰은 유효하지 않다", () => {
      const expiredCoupon: Coupon = {
        id: 1,
        code: "EXPIRED_COUPON",
        description: "만료된 쿠폰",
        discountType: "fixed",
        expirationDate: "2024-03-01",
      };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(expiredCoupon)).toBe(false);
    });

    it("만료일이 지나지 않은 쿠폰은 유효하다", () => {
      const validCoupon: Coupon = {
        id: 2,
        code: "VALID_COUPON",
        description: "유효한 쿠폰",
        discountType: "fixed",
        expirationDate: "2024-06-30",
      };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(validCoupon)).toBe(true);
    });
  });

  describe("BOGO 테스트", () => {
    it("조건에 맞지 않는 구매 수량일 때 쿠폰은 유효하지 않다", () => {
      const invalidQuantityCoupon: Coupon = {
        id: 5,
        code: "INVALID_QUANTITY",
        description: "구매 수량 조건 불충족",
        discountType: "buyXgetY",
        buyQuantity: 5,
        getQuantity: 1,
        expirationDate: "2024-05-21",
      };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(invalidQuantityCoupon)).toBe(false);
    });

    it("조건에 맞는 구매 수량일 때 쿠폰은 유효하다", () => {
      const validQuantityCoupon: Coupon = {
        id: 6,
        code: "VALID_QUANTITY",
        description: "구매 수량 조건 충족",
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
        expirationDate: "2024-05-21",
      };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(validQuantityCoupon)).toBe(true);
    });
  });

  describe("최소 금액 주문 테스트", () => {
    it("최소 금액 조건을 만족하지 않는 쿠폰은 유효하지 않다", () => {
      const invalidMinAmountCoupon: Coupon = {
        id: 3,
        code: "MIN_AMOUNT_COUPON",
        description: "최소 금액 조건을 만족하지 않음",
        discountType: "fixed",
        minimumAmount: 150000,
        expirationDate: "2024-05-21",
      };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(invalidMinAmountCoupon)).toBe(false);
    });

    it("최소 금액 조건을 만족하는 쿠폰은 유효하다", () => {
      const validMinAmountCoupon: Coupon = {
        id: 4,
        code: "VALID_MIN_AMOUNT_COUPON",
        description: "최소 금액 조건을 만족함",
        discountType: "fixed",
        minimumAmount: 10000,
        expirationDate: "2024-05-21",
      };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(validMinAmountCoupon)).toBe(true);
    });
  });

  describe("사용 가능 시간 테스트", () => {
    it("시간 제한이 있는 쿠폰이 현재 시간에 유효하지 않다", () => {
      const invalidTimeCoupon: Coupon = { ...mockCoupons[0], availableTime: { start: "01:00:00", end: "02:00:00" } };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(invalidTimeCoupon)).toBe(false);
    });

    it("시간 제한이 있는 쿠폰이 현재 시간에 유효하다", () => {
      const validTimeCoupon: Coupon = { ...mockCoupons[3] };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(validTimeCoupon)).toBe(true);
    });
  });

  describe("무료 배송 테스트", () => {
    // it("배송비가 0원인 경우 쿠폰은 유효하지 않다", () => {
    //   mockUseRecoilValue.mockImplementationOnce((selector) => {
    //     if (selector === checkedCartItemsSelector) return mockCartItems;
    //     if (selector === orderPriceSelector) return 130000;
    //     if (selector === shippingFeeSelector) return 0;
    //     if (selector === couponCheckedAtom) return [];
    //   });

    //   const { isCouponValid } = useCouponValidation();
    //   expect(isCouponValid(mockCoupons[2])).toBe(false);
    // });

    it("배송비가 0원이 아닌 경우 유효하다", () => {
      mockUseRecoilValue.mockImplementationOnce((selector) => {
        if (selector === checkedCartItemsSelector) return mockCartItems;
        if (selector === orderPriceSelector) return 70000;
        if (selector === shippingFeeSelector) return 3000;
        if (selector === couponCheckedAtom) return [];
      });

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(mockCoupons[2])).toBe(true);
    });
  });

  describe("쿠폰 최대 사용 개수 테스트", () => {
    it(`사용 중인 쿠폰이 ${CHECKED_COUPONS_LENGTH}개일 때 추가 쿠폰은 유효하지 않다`, () => {
      mockUseRecoilValue.mockImplementation((selector) => {
        if (selector === checkedCartItemsSelector) return mockCartItems;
        if (selector === orderPriceSelector) return 130000;
        if (selector === shippingFeeSelector) return 5000;
        if (selector === couponCheckedAtom) return mockCoupons.slice(0, 2);
      });
      const additionalCoupon: Coupon = { ...mockCoupons[3] };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(additionalCoupon)).toBe(false);
    });

    it(`사용 중인 쿠폰이 ${CHECKED_COUPONS_LENGTH}개 이하일 때 추가 쿠폰은 유효하다`, () => {
      mockUseRecoilValue.mockImplementationOnce((selector) => {
        if (selector === checkedCartItemsSelector) return mockCartItems;
        if (selector === orderPriceSelector) return 130000;
        if (selector === shippingFeeSelector) return 5000;
        if (selector === couponCheckedAtom) return mockCoupons.slice(0, 1);
      });
      const additionalCoupon: Coupon = { ...mockCoupons[3] };

      const { isCouponValid } = useCouponValidation();
      expect(isCouponValid(additionalCoupon)).toBe(true);
    });
  });
});
