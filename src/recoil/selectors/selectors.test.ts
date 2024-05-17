import { renderHook, waitFor } from "@testing-library/react";
import { useRecoilValue } from "recoil";
import { RecoilRoot } from "recoil";
import { cartItemsState } from "./selectors";

describe("장바구니", () => {
  it("장바구니 데이터 로딩.", async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).not.toEqual([]);
    });
  });
});
