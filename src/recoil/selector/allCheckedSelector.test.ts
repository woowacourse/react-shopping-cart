import { renderHook, act, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import useCartItemChecks from "../../hooks/useCartItemChecks";
import { mockCartItems, mockCheckedIds } from "../../mocks/cartItems";

jest.mock("../../api/cartItemApi", () => ({
  fetchCartItems: jest.fn().mockImplementation(async () => mockCartItems),
}));

describe("isAllCheckedSelector 테스트", () => {
  let result;

  beforeEach(async () => {
    const hook = renderHook(() => useCartItemChecks(), {
      wrapper: RecoilRoot,
    });

    result = hook.result;
    await waitFor(() => {
      expect(result.current.setCartItems).toBeDefined();
    });
  });

  it("전체 선택을 선택했을 때 모든 아이템들이 선택된다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setCheckedIds(mockCheckedIds);
    });

    act(() => result.current.setIsAllChecked(true));

    expect(result.current.isAllChecked).toEqual(true);
    expect(result.current.checkedIds).toEqual([1, 2, 3]);
  });

  it("전체 선택을 해제했을 때, 모든 아이템의 선택이 해제된다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setCheckedIds([1, 2, 3]);
    });

    act(() => result.current.setIsAllChecked(false));

    expect(result.current.isAllChecked).toEqual(false);
    expect(result.current.checkedIds).toEqual([]);
  });

  it("전체 선택 상태에서 하나만 선택을 해제했을 때, 전체 선택 상태는 false가 된다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setCheckedIds([1, 2, 3]);
    });

    act(() => result.current.setCheckedIds([1, 2]));

    expect(result.current.isAllChecked).toEqual(false);
  });

  it("하나를 선택했을 때 전체가 선택된 상태이면 전체 선택이 true가 된다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setCheckedIds([1, 2]);
    });

    act(() => result.current.setCheckedIds([1, 2, 3]));

    expect(result.current.isAllChecked).toEqual(true);
  });
});
