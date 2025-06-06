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
    expect(result.current.selectedCouponIds).toEqual(new Set());
    expect(result.current.isSelectedToLimit).toBe(false);
  });

  it("initialSelectedIds로 selectedCouponIds를 초기화해야 한다.", () => {
    const initialIds = new Set(["coupon1"]);
    const { result } = renderHook(() => useCouponSelection(initialIds));
    expect(result.current.selectedCouponIds).toEqual(initialIds);
  });

  it("handleSelectCoupon은 쿠폰 ID를 추가/제거해야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    act(() => {
      result.current.handleSelectCoupon("coupon1");
    });
    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon1"]));

    act(() => {
      result.current.handleSelectCoupon("coupon2");
    });
    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon1", "coupon2"])
    );

    act(() => {
      result.current.handleSelectCoupon("coupon1");
    });
    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon2"]));
  });

  it("최대 쿠폰 개수에 도달하면 isSelectedToLimit은 true여야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    act(() => {
      result.current.handleSelectCoupon("coupon1");
    });
    expect(result.current.isSelectedToLimit).toBe(false);

    act(() => {
      result.current.handleSelectCoupon("coupon2");
    });
    expect(result.current.isSelectedToLimit).toBe(true);
  });

  it("최대 쿠폰 개수를 초과하여 추가하려고 하면 showError를 호출하고 ID를 추가하지 않아야 한다.", () => {
    const { result } = renderHook(() => useCouponSelection());

    act(() => {
      result.current.handleSelectCoupon("coupon1");
    });
    act(() => {
      result.current.handleSelectCoupon("coupon2");
    });

    expect(result.current.selectedCouponIds.size).toBe(2);
    expect(result.current.isSelectedToLimit).toBe(true);

    act(() => {
      result.current.handleSelectCoupon("coupon3");
    });

    expect(mockShowError).toHaveBeenCalledWith(
      new Error("최대 쿠폰 선택 수를 초과했습니다.")
    );
    expect(result.current.selectedCouponIds.size).toBe(2);
    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon1", "coupon2"])
    );
  });

  it("이미 선택된 쿠폰을 다시 선택하려고 할 때, 한도를 초과한 상태라도 showError를 호출하지 않고 쿠폰을 제거해야 한다.", () => {
    const initialIds = new Set(["coupon1", "coupon2"]);
    const { result } = renderHook(() => useCouponSelection(initialIds));

    expect(result.current.selectedCouponIds.size).toBe(2);
    expect(result.current.isSelectedToLimit).toBe(true);

    act(() => {
      result.current.handleSelectCoupon("coupon1");
    });

    expect(mockShowError).not.toHaveBeenCalled();
    expect(result.current.selectedCouponIds.size).toBe(1);
    expect(result.current.selectedCouponIds).toEqual(new Set(["coupon2"]));
    expect(result.current.isSelectedToLimit).toBe(false);
  });

  it("initialSelectedIds prop이 변경되면 selectedCouponIds를 업데이트해야 한다.", () => {
    const initialIds1 = new Set(["coupon1"]);
    const { result, rerender } = renderHook(
      ({ initialSelectedIds }: { initialSelectedIds: Set<string> }) =>
        useCouponSelection(initialSelectedIds),
      { initialProps: { initialSelectedIds: initialIds1 } }
    );

    expect(result.current.selectedCouponIds).toEqual(initialIds1);

    const initialIds2 = new Set(["coupon2", "coupon3"]);
    rerender({ initialSelectedIds: initialIds2 });

    expect(result.current.selectedCouponIds).toEqual(initialIds2);
    expect(result.current.isSelectedToLimit).toBe(true); // MAX_COUPON_COUNT is 2
  });

  it("내용이 동일하지만 참조가 다른 initialSelectedIds로 rerender해도 selectedCouponIds는 변경되지 않아야 한다.", () => {
    const { result, rerender } = renderHook(
      ({ initialSelectedIds }: { initialSelectedIds: Set<string> }) =>
        useCouponSelection(initialSelectedIds),
      { initialProps: { initialSelectedIds: new Set(["coupon1"]) } }
    );

    // 내부 상태 변경
    act(() => {
      result.current.handleSelectCoupon("coupon2");
    });
    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon1", "coupon2"])
    );
    const currentSelectedSet = result.current.selectedCouponIds;

    rerender({ initialSelectedIds: new Set(["coupon1"]) }); // 내용이 동일하지만 참조가 다른 initialIds

    // areSetsEqual 덕분에 selectedCouponIds가 초기화되지 않고 유지되어야 한다.
    expect(result.current.selectedCouponIds).toEqual(
      new Set(["coupon1", "coupon2"])
    );
    expect(result.current.selectedCouponIds).toBe(currentSelectedSet); // Check instance equality
  });
});
