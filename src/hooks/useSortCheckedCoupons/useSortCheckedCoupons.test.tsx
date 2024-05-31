import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import useSortedCheckedCoupons from "./useSortCheckedCoupons";
import { mockCoupons } from "../../mocks/coupons";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilState: jest.fn(),
}));

const mockUseRecoilState = jest.requireMock("recoil").useRecoilState;

describe("useSortedCheckedCoupons 훅 테스트", () => {
  beforeEach(() => {
    mockUseRecoilState.mockImplementation(() => [mockCoupons, jest.fn()]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("퍼센트 할인 쿠폰을 우선적으로 정렬한다.", () => {
    const { result } = renderHook(() => useSortedCheckedCoupons(), {
      wrapper: RecoilRoot,
    });

    const sortedCoupons = result.current.sortedCoupons;
    const expectedOrder = ["MIRACLESALE", "FIXED5000", "BOGO", "FREESHIPPING"];

    expect(sortedCoupons).toHaveLength(mockCoupons.length);
    expectedOrder.forEach((code, index) => {
      expect(sortedCoupons[index].code).toBe(code);
    });
  });

  it("퍼센트 할인 쿠폰이 없는 경우 순서가 변경되지 않는다.", () => {
    const nonPercentageCoupons = mockCoupons.filter((coupon) => coupon.discountType !== "percentage");
    mockUseRecoilState.mockImplementation(() => [nonPercentageCoupons, jest.fn()]);

    const { result } = renderHook(() => useSortedCheckedCoupons(), {
      wrapper: RecoilRoot,
    });

    const sortedCoupons = result.current.sortedCoupons;
    expect(sortedCoupons).toHaveLength(nonPercentageCoupons.length);
    expect(sortedCoupons[0].code).toBe("FIXED5000");
    expect(sortedCoupons[1].code).toBe("BOGO");
  });

  it("쿠폰이 없는 경우 빈 배열을 반환한다.", () => {
    mockUseRecoilState.mockImplementation(() => [[], jest.fn()]);

    const { result } = renderHook(() => useSortedCheckedCoupons(), {
      wrapper: RecoilRoot,
    });

    const sortedCoupons = result.current.sortedCoupons;
    expect(sortedCoupons).toHaveLength(0);
  });
});
