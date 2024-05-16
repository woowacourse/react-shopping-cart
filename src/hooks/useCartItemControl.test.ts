import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { act } from "react";
import { updateCartItemQuantity } from "../api/cartItems";
import { useCartItemControl } from "./useCartItemControl";

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilState: jest.fn(),
}));
jest.mock("../api/cartItems");
jest.mock("../utils/sessionStorage");

describe("useCartItemControl", () => {
  describe("updateQuantity", () => {
    const mockUpdatingCartItemId = 1;
    const updatingQuantity = 2;
    const mockCartItems = [{ id: 1, quantity: 1 }];
    it("1. patch api 요청 2. 상태 변경", async () => {
      const mockUpdateCartItemQuantity = updateCartItemQuantity as jest.Mock;
      const setRawCartItems = jest.fn();

      (useRecoilState as jest.Mock).mockImplementation(() => [mockCartItems, setRawCartItems]);

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
});
