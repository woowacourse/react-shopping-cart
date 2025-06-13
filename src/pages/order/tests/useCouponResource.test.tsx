import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useCouponResource from "../hooks/useCouponResource";
import MOCKING_COUPONS_DATA from "../../../shared/apis/mocks/data/coupons.json";
import { CouponResponse } from "../../../shared/types/coupon";
import { server } from "../../../shared/apis/mocks/node";
import { ErrorProvider } from "../../../shared/contexts/ErrorContext";
import { act } from "react";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => <ErrorProvider>{children} </ErrorProvider>;

const mockCoupons = MOCKING_COUPONS_DATA as CouponResponse[];

describe("useCouponResource 훅 테스트", () => {
  it("쿠폰 목록을 가져온다.", async () => {
    const { result } = renderHook(() => useCouponResource(), { wrapper });

    await act(async () => {
      result.current.fetchCoupons();
    });
    await waitFor(() => {
      expect(result.current.coupons).toEqual(mockCoupons);
    });
  });
});
