import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import useSortedCheckedCoupons from "./useSortCheckedCoupons";
import { Coupon } from "../../types/coupon";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilState: jest.fn(),
}));

const mockUseRecoilState = jest.requireMock("recoil").useRecoilState;

const mockCheckedCoupons: Coupon[] = [
  {
    id: 1,
    code: "PERCENT20",
    description: "20% 할인 쿠폰",
    discountType: "percentage",
    discount: 20,
    expirationDate: "2024-11-30",
  },
  {
    id: 2,
    code: "PERCENT10",
    description: "10% 할인 쿠폰",
    discountType: "percentage",
    discount: 10,
    expirationDate: "2024-11-30",
  },
  {
    id: 3,
    code: "FIXED5000",
    description: "5000원 할인 쿠폰",
    discountType: "fixed",
    discount: 5000,
    expirationDate: "2024-11-30",
  },
  {
    id: 4,
    code: "FREESHIP",
    description: "무료 배송 쿠폰",
    discountType: "freeShipping",
    expirationDate: "2024-11-30",
  },
];

describe("useSortedCheckedCoupons 훅 테스트", () => {
  beforeEach(() => {
    mockUseRecoilState.mockImplementation(() => [mockCheckedCoupons, jest.fn()]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("퍼센트 할인 쿠폰을 우선적으로 정렬한다.", () => {
    const { result } = renderHook(() => useSortedCheckedCoupons(), {
      wrapper: RecoilRoot,
    });

    const sortedCoupons = result.current.sortedCoupons;
    const expectedOrder = ["PERCENT20", "PERCENT10", "FIXED5000", "FREESHIP"];

    expect(sortedCoupons).toHaveLength(mockCheckedCoupons.length);
    expectedOrder.forEach((code, index) => {
      expect(sortedCoupons[index].code).toBe(code);
    });
  });

  it("퍼센트 할인 쿠폰이 없는 경우 순서가 변경되지 않는다.", () => {
    const nonPercentageCoupons = mockCheckedCoupons.filter((coupon) => coupon.discountType !== "percentage");
    mockUseRecoilState.mockImplementationOnce(() => [nonPercentageCoupons, jest.fn()]);

    const { result } = renderHook(() => useSortedCheckedCoupons(), {
      wrapper: RecoilRoot,
    });

    const sortedCoupons = result.current.sortedCoupons;
    expect(sortedCoupons).toHaveLength(nonPercentageCoupons.length);
    expect(sortedCoupons[0].code).toBe("FIXED5000");
    expect(sortedCoupons[1].code).toBe("FREESHIP");
  });

  it("쿠폰이 없는 경우 빈 배열을 반환한다.", () => {
    mockUseRecoilState.mockImplementationOnce(() => [[], jest.fn()]);

    const { result } = renderHook(() => useSortedCheckedCoupons(), {
      wrapper: RecoilRoot,
    });

    const sortedCoupons = result.current.sortedCoupons;
    expect(sortedCoupons).toHaveLength(0);
  });
});
