import { act } from "react";
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCartItemChecked } from "./useCartItemChecked";
import { cartItemsAtom, cartItemCheckedIdsAtom } from "../../recoil/atom/atom";
import { mockCartItems, mockCheckedIds } from "../../mocks/cartItems";

describe("useCartItemChecked 훅 테스트", () => {
  const initializeState = ({ set }) => {
    set(cartItemsAtom, mockCartItems);
    set(cartItemCheckedIdsAtom, mockCheckedIds);
  };

  it("단일 아이템의 체크 상태를 토글할 수 있다.", () => {
    const { result } = renderHook(() => useCartItemChecked(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleCheckedIds(3);
    });

    expect(result.current.checkedIds).toContain(3);

    act(() => {
      result.current.handleCheckedIds(3);
    });

    expect(result.current.checkedIds).not.toContain(3);
  });

  it("어떤 아이템을 선택했을 때 모두 선택이 된 상태라면 전체 선택에 체크 되어야한다.", () => {
    const { result } = renderHook(() => useCartItemChecked(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>,
    });

    expect(result.current.isAllChecked).toBe(false);

    act(() => {
      result.current.handleCheckedIds(3);
    });

    expect(result.current.isAllChecked).toBe(true);
  });

  it("전체 선택에 체크가 되면 모든 아이템에도 선택이 되어야 한다.", () => {
    const { result } = renderHook(() => useCartItemChecked(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.setAllChecked(true);
    });

    expect(result.current.checkedIds).toEqual(mockCartItems.map((item) => item.id));
  });

  it("전체 선택에 체크가 해제되면 모든 아이템에도 선택이 해제되어야 한다.", () => {
    const { result } = renderHook(() => useCartItemChecked(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.setAllChecked(false);
    });

    expect(result.current.checkedIds).toEqual([]);
  });

  it("handleAllChecked 함수를 사용하여 전체 선택/해제를 할 수 있다.", () => {
    const { result } = renderHook(() => useCartItemChecked(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>,
    });

    act(() => {
      result.current.handleAllChecked();
    });

    expect(result.current.checkedIds).toEqual(mockCartItems.map((item) => item.id));

    act(() => {
      result.current.handleAllChecked();
    });

    expect(result.current.checkedIds).toEqual([]);
  });
});
