import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../../../features/toast/ToastContext";
import { MAX_COUPON_SELECTION } from "../constants";
import useCouponSelection from "../hooks/useCouponSelection";
import { Coupon } from "../types/response";

jest.mock("../../../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../../../apis/config", () => ({
  API_BASE_URL: "http://mock-api-url.com",
  CLIENT_BASE_PATH: "/react-shopping-cart",
}));

const mockShowToast = jest.fn();
jest.mock("../../../features/toast/useToast", () => ({
  __esModule: true,
  default: () => ({
    showToast: mockShowToast,
  }),
}));

const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
];

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <ToastProvider>{children}</ToastProvider>
  </MemoryRouter>
);

describe("useCouponSelection 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShowToast.mockClear();
  });

  it("초기 상태로 선택된 쿠폰이 없다", () => {
    const { result } = renderHook(() => useCouponSelection(mockCoupons), {
      wrapper,
    });
    expect(result.current.selectedCoupons).toEqual([]);
    expect(result.current.hasNoSelectedCoupons).toBe(true);
  });

  it("쿠폰 선택 및 해제가 가능하다", () => {
    const { result } = renderHook(() => useCouponSelection(mockCoupons), {
      wrapper,
    });

    act(() => {
      result.current.toggleCouponSelection(1);
    });
    expect(result.current.isCouponSelected(1)).toBe(true);
    expect(result.current.selectedCoupons).toEqual([mockCoupons[0]]);
    expect(result.current.hasNoSelectedCoupons).toBe(false);

    act(() => {
      result.current.toggleCouponSelection(1);
    });
    expect(result.current.isCouponSelected(1)).toBe(false);
    expect(result.current.selectedCoupons).toEqual([]);
    expect(result.current.hasNoSelectedCoupons).toBe(true);
  });

  it(`최대 ${MAX_COUPON_SELECTION}개 이상 쿠폰을 선택할 수 없다`, () => {
    const { result } = renderHook(() => useCouponSelection(mockCoupons), {
      wrapper,
    });

    for (let i = 1; i <= MAX_COUPON_SELECTION; i++) {
      act(() => {
        result.current.toggleCouponSelection(i);
      });
    }

    act(() => {
      result.current.toggleCouponSelection(MAX_COUPON_SELECTION + 1);
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      message: `쿠폰은 최대 ${MAX_COUPON_SELECTION}개까지 적용 가능합니다.`,
      type: "error",
    });

    expect(result.current.selectedCoupons.length).toBe(MAX_COUPON_SELECTION);
  });

  it("모든 선택된 쿠폰을 초기화할 수 있다", () => {
    const { result } = renderHook(() => useCouponSelection(mockCoupons), {
      wrapper,
    });

    act(() => {
      result.current.toggleCouponSelection(1);
      result.current.toggleCouponSelection(2);
    });
    expect(result.current.selectedCoupons.length).toBe(2);

    act(() => {
      result.current.resetSelectedCoupons();
    });
    expect(result.current.hasNoSelectedCoupons).toBe(true);
    expect(result.current.selectedCoupons).toEqual([]);
  });
});
