import { RecoilRoot, useRecoilValue } from "recoil";
import { selectedCartItemsState, cartItemsState, selectedListState } from "../recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { cartJson } from "./mockData";

describe("장바구니 테스트", () => {
  it("API로 불러온 장바구니 목록이 recoil 상태에 저장된다", async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toEqual(cartJson);
    });
  });

  it("장바구니가 초기화되면 선택된 아이템들이 없다", async () => {
    const { result } = renderHook(() => useRecoilValue(selectedCartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });

  it("장바구니에 들어있는 아이템을 선택한 경우 선택된 아이템들이 selector에 저장됨", async () => {
    const ids = [1481, 1528, 1529];
    const { result } = renderHook(() => useRecoilValue(selectedCartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedListState, ids);
          }}
        >
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toEqual(cartJson.filter((item) => ids.includes(item.id)));
    });
  });
});
