import { useCouponSelection } from "@/hooks/Coupon/useCouponSelection";
import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

const mockShowError = vi.fn();
vi.mock("@/contexts/ErrorToastContext", () => ({
  useErrorToast: () => ({ showError: mockShowError }),
}));

vi.mock("@/constants/priceSetting", () => ({
  MAX_COUPON_COUNT: 2,
}));

describe("useCouponSelection는", () => {
  beforeEach(() => {
    mockShowError.mockClear();
  });

  it("기본값으로 빈 Set으로 selectedCouponIds를 초기화해야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());
    const { selectedCouponIds } = result.current;
    expect(selectedCouponIds).toEqual(new Set());
  });

  it("toggleCoupon은 쿠폰 ID를 추가/제거해야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    act(() => {
      const { toggleCoupon } = result.current;
      const success = toggleCoupon("coupon1");
      expect(success).toBe(true);
    });
    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon1"]));

    act(() => {
      const { toggleCoupon } = result.current;
      const success = toggleCoupon("coupon2");
      expect(success).toBe(true);
    });
    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon1", "coupon2"])
    );

    act(() => {
      const { toggleCoupon } = result.current;
      const success = toggleCoupon("coupon1");
      expect(success).toBe(true);
    });
    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon2"]));
  });

  it("최대 쿠폰 개수에 도달하면 추가 선택을 시도할 때 false를 반환해야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    act(() => {
      const { toggleCoupon } = result.current;
      toggleCoupon("coupon1");
    });

    act(() => {
      const { toggleCoupon } = result.current;
      toggleCoupon("coupon2");
    });

    expect(result.current.selectedCouponIds.size).toBe(2);

    act(() => {
      const { toggleCoupon } = result.current;
      const success = toggleCoupon("coupon3");
      expect(success).toBe(false);
    });

    expect(result.current.selectedCouponIds.size).toBe(2);
    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon1", "coupon2"])
    );
  });

  it("이미 선택된 쿠폰을 다시 선택하려고 할 때, 한도를 초과한 상태라도 true를 반환하고 쿠폰을 제거해야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    // 먼저 최대 개수까지 쿠폰을 추가
    act(() => {
      const { toggleCoupon } = result.current;
      toggleCoupon("coupon1");
    });

    act(() => {
      const { toggleCoupon } = result.current;
      toggleCoupon("coupon2");
    });

    expect(result.current.selectedCouponIds.size).toBe(2);

    // 이미 선택된 쿠폰을 다시 선택하면 제거되어야 함
    act(() => {
      const { toggleCoupon } = result.current;
      const success = toggleCoupon("coupon1");
      expect(success).toBe(true);
    });

    expect(result.current.selectedCouponIds.size).toBe(1);
    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon2"]));
  });

  it("resetToOptimal은 선택된 쿠폰들을 최적의 조합으로 설정해야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    act(() => {
      const { toggleCoupon } = result.current;
      toggleCoupon("coupon1");
    });

    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon1"]));

    act(() => {
      const { resetToOptimal } = result.current;
      resetToOptimal(["coupon2", "coupon3"]);
    });

    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon2", "coupon3"])
    );
  });
});
