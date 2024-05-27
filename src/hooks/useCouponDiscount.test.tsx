import { renderHook } from "@testing-library/react";
import { CouponType } from "../types/Coupon";
import useCouponDiscount from "./useCouponDiscount";
import { act } from "react";
import FixedCoupon from "../domain/coupons/FixedCoupon";
import { RecoilRoot, SetRecoilState } from "recoil";
import { checkedCartItemsState } from "../recoil/atoms";
import ORDER from "../constants/order";
import { setCartPriceAndQuantitySelector } from "../recoil/selectors";
import { mockedCartItems } from "../mock/mockData";
import PercentageCoupon from "../domain/coupons/PercentageCoupon";
import BuyXgetYCoupon from "../domain/coupons/BuyXgetYCoupon";

const basedMockedCoupon: CouponType = {
  id: 1,
  code: "FIXED5000",
  description: "5,000원 할인 쿠폰",
  expirationDate: "2024-11-30",
  discount: 5000,
  discountType: "fixed",
};

const initialState = ({ set }: { set: SetRecoilState }) => {
  set(checkedCartItemsState, [788, 866, 867]);
  set(setCartPriceAndQuantitySelector, mockedCartItems);
};

describe("쿠폰 선택 테스트", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-22"));
  });

  it("최대 갯수를 넘지 않으면 선택된 쿠폰이 추가된다.", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    const fixedCoupon = new FixedCoupon(mockedCoupon);

    const { result } = renderHook(() => useCouponDiscount(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleSelectCoupons(fixedCoupon);
    });

    expect(result.current.selectedCoupons.length).toBe(1);
  });

  it("선택된 쿠폰을 다시 선택하면 쿠폰 선택 취소가 된다.", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    const fixedCoupon = new FixedCoupon(mockedCoupon);

    const { result } = renderHook(() => useCouponDiscount(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleSelectCoupons(fixedCoupon);
    });

    expect(result.current.selectedCoupons.length).toBe(1);

    act(() => {
      result.current.handleSelectCoupons(fixedCoupon);
    });

    expect(result.current.selectedCoupons.length).toBe(0);
  });

  it(`쿠폰 최대 갯수 ${ORDER.maxCouponCount}개를 넘어가면 선택된 쿠폰이 추가되지 않는다.`, () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    const fixedCoupon1 = new FixedCoupon(mockedCoupon);
    const fixedCoupon2 = new FixedCoupon(mockedCoupon);
    const fixedCoupon3 = new FixedCoupon(mockedCoupon);

    const { result } = renderHook(() => useCouponDiscount(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleSelectCoupons(fixedCoupon1);
      result.current.handleSelectCoupons(fixedCoupon2);
    });

    expect(result.current.selectedCoupons.length).toBe(2);

    act(() => {
      result.current.handleSelectCoupons(fixedCoupon3);
    });

    expect(result.current.selectedCoupons.length).toBe(2);
  });
});

describe("쿠폰 중복 할인 테스트 (총 결제금액 20만원)", () => {
  it("퍼센트 할인, 고정 할인 쿠폰 2장이 적용되면 퍼센트 할인이 된 후 고정 할인 금액이 적용된다.", () => {
    const mockedFixedCoupon = Object.assign({}, basedMockedCoupon);
    const mockedPercentageCoupon = Object.assign({}, basedMockedCoupon);
    mockedPercentageCoupon.discountType = "percentage";
    mockedPercentageCoupon.discount = 10;

    const fixedCoupon = new FixedCoupon(mockedFixedCoupon);
    const percentageCoupon = new PercentageCoupon(mockedPercentageCoupon);

    const { result } = renderHook(() => useCouponDiscount(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleSelectCoupons(fixedCoupon);
      result.current.handleSelectCoupons(percentageCoupon);
    });

    expect(result.current.discountAmount).toBe(25_000);
  });

  it("X+Y 쿠폰, 고정 할인 쿠폰 2장이 적용되면 X+Y 쿠폰이 적용된 후 퍼센트 할인이 적용된다.", () => {
    const mockedXgetYCoupon = Object.assign({}, basedMockedCoupon);
    mockedXgetYCoupon.discountType = "buyXgetY";
    mockedXgetYCoupon.buyQuantity = 2;
    mockedXgetYCoupon.getQuantity = 1;

    const mockedPercentageCoupon = Object.assign({}, basedMockedCoupon);
    mockedPercentageCoupon.discountType = "percentage";
    mockedPercentageCoupon.discount = 10;

    const buyXgetYCoupon = new BuyXgetYCoupon(mockedXgetYCoupon);
    const percentageCoupon = new PercentageCoupon(mockedPercentageCoupon);

    const { result } = renderHook(() => useCouponDiscount(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleSelectCoupons(buyXgetYCoupon);
      result.current.handleSelectCoupons(percentageCoupon);
    });

    expect(result.current.discountAmount).toBe(38_000); // 20만원 - 2만원 (buyXgetY 쿠폰) - 1.8만원 (18만원의 10%) => 총 3.8만원
  });

  it("X+Y 쿠폰, 고정 할인 쿠폰 2장이 적용되면 X+Y 쿠폰이 적용된 후 퍼센트 할인이 적용된다.", () => {
    const mockedXgetYCoupon = Object.assign({}, basedMockedCoupon);
    mockedXgetYCoupon.discountType = "buyXgetY";
    mockedXgetYCoupon.buyQuantity = 2;
    mockedXgetYCoupon.getQuantity = 1;

    const mockedFixedCoupon = Object.assign({}, basedMockedCoupon);

    const buyXgetYCoupon = new BuyXgetYCoupon(mockedXgetYCoupon);
    const fixedCoupon = new FixedCoupon(mockedFixedCoupon);

    const { result } = renderHook(() => useCouponDiscount(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleSelectCoupons(buyXgetYCoupon);
      result.current.handleSelectCoupons(fixedCoupon);
    });

    expect(result.current.discountAmount).toBe(25_000);
  });
});
