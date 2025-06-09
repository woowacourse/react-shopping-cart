import { ReactNode } from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import useShoppingCart from "../src/hooks/useShoppingCart/useShoppingCart";
import { CartItemsProvider } from "../src/contexts/CartItemsProvider";
import { ErrorToastContextProvider } from "../src/contexts/ErrorToastContext";
import { testStateStore } from "../src/mock/handlers";
import { cartItems } from "../src/mock/data/cartItems";

// 테스트용 래퍼 컴포넌트
function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <ErrorToastContextProvider>
      <CartItemsProvider>{children}</CartItemsProvider>
    </ErrorToastContextProvider>
  );
}

describe("useShoppingCart는", () => {
  beforeEach(() => {
    testStateStore.reset();
  });
  it("초기 상태가 올바르게 설정되어야 한다", async () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: TestWrapper,
    });

    // 초기 로딩 상태 확인
    expect(result.current.isCartItemsLoading).toBe(true);
    expect(result.current.cartItemsData).toEqual([]);
    expect(result.current.cartItemsFetchError).toBeUndefined();
    expect(result.current.isQuantityUpdateLoading).toBe(false);
    expect(result.current.isDeleteItemLoading).toBe(false);

    // 함수들이 정의되어 있는지 확인
    expect(typeof result.current.refetchCartItems).toBe("function");
    expect(typeof result.current.handleCartItemQuantity).toBe("function");
    expect(typeof result.current.handleDeleteCartItem).toBe("function");
  });

  it("카트 아이템 데이터를 성공적으로 가져와야 한다", async () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: TestWrapper,
    });

    // 데이터 로딩 완료까지 대기
    await waitFor(
      () => {
        expect(result.current.isCartItemsLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    // 성공적으로 데이터가 로드되었는지 확인
    expect(result.current.cartItemsData).toBeDefined();
    expect(result.current.cartItemsData.length).toBe(cartItems.length);
    expect(result.current.cartItemsFetchError).toBeUndefined();
  });

  it("카트 아이템 데이터를 못가져오면 해당되는 에러를 가져와야 한다", async () => {
    testStateStore.shouldFailCart = true; // 에러 발생 상태로 설정
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: TestWrapper,
    });

    await waitFor(
      () => {
        expect(result.current.isCartItemsLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    // 성공적으로 데이터가 로드되었는지 확인
    expect(result.current.cartItemsFetchError).toMatchObject({
      message: "서버 오류가 발생했습니다.",
    });
  });

  it("refetchCartItems 함수가 정상적으로 동작해야 한다", async () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: TestWrapper,
    });

    // 초기 로딩 완료까지 대기
    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    // refetch 실행
    await act(async () => {
      await result.current.refetchCartItems();
    });

    // refetch 후에도 데이터가 유지되는지 확인
    expect(result.current.cartItemsData).toBeDefined();
    expect(result.current.cartItemsData.length).toBe(cartItems.length);
  });

  it("handleCartItemQuantity 함수가 정상적으로 동작해야 한다", async () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: TestWrapper,
    });

    // 초기 로딩 완료까지 대기
    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    const initialLoading = result.current.isQuantityUpdateLoading;
    expect(initialLoading).toBe(false);

    // quantity 업데이트 실행
    await act(() =>
      result.current.handleCartItemQuantity({ id: 1, quantity: 2 })
    );

    // 로딩 상태가 정상적으로 처리되는지 확인
    await waitFor(() => {
      expect(result.current.isQuantityUpdateLoading).toBe(false);
      const updatedItem = result.current.cartItemsData.find(
        (item) => item.id === 1
      );
      expect(updatedItem?.quantity).toBe(2);
    });

    await act(async () => {
      await result.current.handleCartItemQuantity({ id: 2, quantity: 1 });
    });

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });
    await waitFor(() => {
      expect(result.current.isQuantityUpdateLoading).toBe(false);
      const updatedItem = result.current.cartItemsData.find(
        (item) => item.id === 2
      );

      expect(updatedItem?.quantity).toBe(1);
    });
  });

  it("handleDeleteCartItem 함수가 정상적으로 동작해야 한다", async () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: TestWrapper,
    });

    // 초기 로딩 완료까지 대기
    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });
    const initialCartItemLength = result.current.cartItemsData.length;
    const initialLoading = result.current.isDeleteItemLoading;
    expect(initialLoading).toBe(false);

    // 아이템 삭제 실행
    await act(async () => {
      result.current.handleDeleteCartItem(1);
    });

    // 로딩 상태가 정상적으로 처리되는지 확인
    await waitFor(() => {
      expect(result.current.isDeleteItemLoading).toBe(false);
    });
    // 삭제된 아이템이 cartItemsData에서 제거되었는지 확인
    const deletedItem = result.current.cartItemsData.find(
      (item) => item.id === 1
    );
    const existingItems = result.current.cartItemsData.filter(
      (item) => item.id !== 1
    );
    expect(existingItems.length).toBe(initialCartItemLength - 1);
    expect(deletedItem).toBeUndefined();
  });
});
