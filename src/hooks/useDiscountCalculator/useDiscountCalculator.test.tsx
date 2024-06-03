import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useDiscountCalculator } from "./useDiscountCalculator";
import { checkedCartItemsSelector, shippingFeeSelector } from "../../recoil/selector/selector";
import { mockCartItems } from "../../mocks/cartItems";
import { mockCoupons } from "../../mocks/coupons";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValue: jest.fn(),
}));

const mockUseRecoilValue = jest.requireMock("recoil").useRecoilValue;

describe("useDiscountCalculator 훅 테스트", () => {
  beforeEach(() => {
    mockUseRecoilValue.mockImplementation((selector) => {
      if (selector === checkedCartItemsSelector) return mockCartItems;
      if (selector === shippingFeeSelector) return 3000;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const setupHook = () => {
    return renderHook(() => useDiscountCalculator(), {
      wrapper: RecoilRoot,
    }).result.current;
  };

  it("고정 할인 쿠폰의 할인을 올바르게 계산한다", () => {
    const { calculateDiscountAmount } = setupHook();
    expect(calculateDiscountAmount(mockCoupons[0], 100000)).toBe(5000);
  });

  it("구매X개 무료Y개의 할인을 올바르게 계산한다", () => {
    const { calculateDiscountAmount } = setupHook();
    const expectedDiscount = Math.max(...mockCartItems.map((item) => item.product.price)) * mockCoupons[1].getQuantity;
    expect(calculateDiscountAmount(mockCoupons[1], 100000)).toBe(expectedDiscount);
  });

  it("퍼센트 할인 쿠폰의 할인을 올바르게 계산한다", () => {
    const { calculateDiscountAmount } = setupHook();
    expect(calculateDiscountAmount(mockCoupons[3], 100000)).toBe(30000);
  });

  it("무료 배송 쿠폰의 할인을 올바르게 계산한다", () => {
    const { calculateDiscountAmount } = setupHook();
    expect(calculateDiscountAmount(mockCoupons[2], 70000)).toBe(3000);
  });
});
