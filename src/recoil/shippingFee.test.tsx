import { RecoilRoot, SetRecoilState, useRecoilValue } from "recoil";
import { mockCartItemList } from "@/mocks/cartItemList";
import { renderHook, waitFor } from "@testing-library/react";
import { shippingFeeSelector } from "@/recoil/shippingFeeType";
import { cartItemsState } from "@/recoil/cartItems";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";

jest.mock("../auth/apis/cart", () => ({
  getCartItems: jest.fn().mockImplementation(() => mockCartItemList),
}));

describe("상품 배송비 테스트", () => {
  it("10만원 이하일 때는 배송비가 3000원(basic) 인지 확인한다..", async () => {
    const initializeState = ({ set }: { set: SetRecoilState }) => {
      set(cartItemsState, mockCartItemList);

      set(selectedCartItemsIdState, [mockCartItemList[0].id]);
    };

    const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toBe("basic");
    });
  });

  it("10만원 이상이 나오면 배송비가 무료 타입으로 나오는지 확인한다.", async () => {
    const initializeState = ({ set }: { set: SetRecoilState }) => {
      set(cartItemsState, mockCartItemList);

      mockCartItemList.forEach((item) => {
        set(selectedCartItemsIdState, (prev) => [...prev, item.product.id]);
      });
    };

    const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toBe("free");
    });
  });
});
