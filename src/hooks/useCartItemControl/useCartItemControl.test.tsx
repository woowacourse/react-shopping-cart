import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { act } from "react";
import { fetchCartItems, removeCartItem, updateCartItemQuantity } from "../../api/cartItems";
import { useCartItemControl } from ".";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";

jest.mock("../../api/cartItems");

const mockRecoil = () => {
  jest.mock("recoil", () => ({
    useSetRecoilState: jest.fn(),
  }));
};

describe("useCartItemControl", () => {
  describe("remove", () => {
    mockRecoil();
    const mockRemoveCartItem = removeCartItem as jest.Mock;
    const mockFetchCartItems = fetchCartItems as jest.Mock;

    it("장바구니 상품을 삭제하고 장바구니 상품을 최신 데이터로 갱신한다.", async () => {
      const { result } = renderHook(() => useCartItemControl(), { wrapper: RecoilRoot });

      await act(async () => {
        result.current.remove(1);
      });

      expect(mockRemoveCartItem).toHaveBeenCalledWith(1);
      expect(mockFetchCartItems).toHaveBeenCalled();
    });
  });

  describe("updateQuantity", () => {
    const mockUpdatingCartItemId = 1;
    const updatingQuantity = 2;
    it("장바구니 상품의 수량을 수정하고 최신 데이터로 갱신한다.", async () => {
      const mockUpdateCartItemQuantity = updateCartItemQuantity as jest.Mock;
      const mockFetchCartItems = fetchCartItems as jest.Mock;

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
      expect(mockFetchCartItems).toHaveBeenCalled();
    });
  });

  describe("toggleSelection", () => {
    it("selectedCartItemIds에서 해당 cartId를 토글한다.", async () => {
      const TOGGLING_CART_ITEM_ID = 1;

      const { result } = renderHook(
        () => {
          const selectedCartItemIds = useRecoilValue(selectedCartItemIdsState);
          const { toggleSelection } = useCartItemControl();
          return { selectedCartItemIds, toggleSelection };
        },
        {
          wrapper: RecoilRoot,
        }
      );

      // 초기값은 빈 배열
      expect(result.current.selectedCartItemIds).toEqual([]);

      // 토글 후에는 해당 아이디가 포함되어야 함
      act(() => result.current.toggleSelection(TOGGLING_CART_ITEM_ID));
      expect(result.current.selectedCartItemIds).toContain(TOGGLING_CART_ITEM_ID);

      // 다시 토글하면 해당 아이디가 제거되어야 함
      act(() => result.current.toggleSelection(TOGGLING_CART_ITEM_ID));
      expect(result.current.selectedCartItemIds).toEqual([]);
    });
  });
});
