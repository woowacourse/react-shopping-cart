import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../../../features/toast/ToastContext";
import { getCoupons } from "../apis/getCoupons";
import useCouponFetch from "../hooks/useCouponFetch";

jest.mock("../../../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../../../apis/config", () => ({
  API_BASE_URL: "http://mock-api-url.com",
  CLIENT_BASE_PATH: "/react-shopping-cart",
}));
jest.mock("../apis/getCoupons");

const mockCoupons = [
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

describe("useCouponFetch 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기 상태로 빈 쿠폰 배열을 반환한다", () => {
    const { result } = renderHook(() => useCouponFetch(), { wrapper });
    expect(result.current.coupons).toEqual([]);
  });

  it("fetchData 호출 시 쿠폰 데이터를 불러온다", async () => {
    (getCoupons as jest.Mock).mockResolvedValue(mockCoupons);

    const { result } = renderHook(() => useCouponFetch(), { wrapper });

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.coupons).toEqual(mockCoupons);
    expect(getCoupons).toHaveBeenCalled();
  });
});
