import { RecoilRoot, useRecoilState } from "recoil";

import { act } from "react";
import { renderHook } from "@testing-library/react";
import { updateCartItemQuantity } from "../api/cartItems";
import { useCartItemControl } from "./useCartItemControl";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilState: jest.fn(),
}));
jest.mock("../api/cartItems");
jest.mock("../utils/sessionStorage");

describe("useCartItemControl", () => {
  // describe("remove", () => {
  //   const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
  //   const mockRemovingCartItemId = 1;
  //   const mockRemovedCartItems = [{ id: 2 }, { id: 3 }];

  //   it("1. delete api 요청 2. 상태 변경", async () => {
  //     const mockDeleteCartItemRequest = removeCartItem as jest.Mock;
  //     const setRawCartItems = jest.fn();

  //     (useRecoilState as jest.Mock).mockImplementation(() => [mockCartItems, setRawCartItems]);

  //     const { result } = renderHook(() => useCartItemControl(), {
  //       wrapper: RecoilRoot,
  //     });

  //     await act(async () => result.current.remove(mockRemovingCartItemId));

  //     expect(mockDeleteCartItemRequest).toHaveBeenCalledWith(mockRemovingCartItemId);
  //     expect(setRawCartItems).toHaveBeenCalledWith(mockRemovedCartItems);
  //   });
  // });

  describe("updateQuantity", () => {
    const mockUpdatingCartItemId = 1;
    const updatingQuantity = 2;
    const mockCartItems = [{ id: 1, quantity: 1 }];
    it(`updateQuantity 함수를 호출하면 -> 1. patch api 요청을 위해 'updateCartItemQuantity' 함수를 호출하고,  2. 상태 변경을 위해 'setRawCartItems' 함수를 호출한다.`, async () => {
      const mockUpdateCartItemQuantity = updateCartItemQuantity as jest.Mock;
      const setRawCartItems = jest.fn();

      (useRecoilState as jest.Mock).mockImplementation(() => [
        mockCartItems,
        setRawCartItems,
      ]);

      const { result } = renderHook(() => useCartItemControl(), {
        wrapper: RecoilRoot,
      });

      await act(async () =>
        result.current.updateQuantity(mockUpdatingCartItemId, updatingQuantity)
      );

      expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith(
        mockUpdatingCartItemId,
        updatingQuantity
      );
      expect(setRawCartItems).toHaveBeenCalledWith([{ id: 1, quantity: 2 }]);
    });
  });

  /**
   * TODO: 상태 변경에 대한 테스트 케이스 작성 요망 (모킹한 setSelectedCartItemIds의 내부 callback에서 문제 발생)
  describe("toggleSelection", () => {
    const mockCartItemId = 1;
    const mockSelectedCartItemIds = [1, 2];
    const mockPutInSelectedCartItemIds = putInSelectedCartItemIds as jest.Mock;
    const mockSetSelectedCartItemIds = jest.fn();

    it("1. 스토리지 동기화 2. 상태 변경", () => {
      (useRecoilState as jest.Mock).mockImplementation(() => [
        mockSelectedCartItemIds,
        mockSetSelectedCartItemIds,
      ]);

      const { result } = renderHook(() => useCartItemControl(), {
        wrapper: RecoilRoot,
      });

      act(() => result.current.toggleSelection(mockCartItemId));

      expect(mockPutInSelectedCartItemIds).toHaveBeenCalledWith([2]);
    });
  });
   */
});
