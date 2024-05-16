import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { act } from "react";
import { removeCartItem } from "../api/cartItems";
import { useCartItemControl } from "./useCartItemControl";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilState: jest.fn(),
}));

jest.mock("../api/cartItems");

describe("useCartItemControl", () => {
  describe("remove", () => {
    const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const mockRemovingCartItemId = 1;
    const mockRemovedCartItems = [{ id: 2 }, { id: 3 }];

    it("1. delete api 요청 2. 상태 변경", async () => {
      const mockDeleteCartItemRequest = removeCartItem as jest.Mock;
      const setRawCartItems = jest.fn();

      (useRecoilState as jest.Mock).mockImplementation(() => [mockCartItems, setRawCartItems]);

      const { result } = renderHook(() => useCartItemControl(mockRemovingCartItemId), {
        wrapper: RecoilRoot,
      });

      await act(async () => result.current.remove());

      expect(mockDeleteCartItemRequest).toHaveBeenCalledWith(mockRemovingCartItemId);
      expect(setRawCartItems).toHaveBeenCalledWith(mockRemovedCartItems);
    });
  });
});
