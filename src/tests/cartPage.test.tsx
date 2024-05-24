import { SetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { RecoilRoot } from "recoil";
import { CartItemListMock } from "./mock";

import { cartItemQuantityState } from "@/recoil/cartItemQuantity";
import { cartItemsState } from "../recoil/cartItems";

import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import { waitFor, renderHook, act } from "@testing-library/react";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";

jest.mock("../auth/apis/cart", () => ({
  getCartItems: jest.fn().mockImplementation(() => CartItemListMock),
}));

describe("상품 수량 테스트", () => {
  it("초기의 상품 수량이 잘 나오는지 확인한다.", async () => {
    const { result } = renderHook(
      () => useRecoilValue(cartItemQuantityState(CartItemListMock[0].id)),
      {
        wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
      }
    );

    await waitFor(() => {
      expect(result.current).toBe(CartItemListMock[0].quantity);
    });
  });

  it("상품 수량을 올리면 기존 수량에서 +1이 된다.", async () => {
    const { result } = renderHook(
      () => useRecoilState(cartItemQuantityState(CartItemListMock[0].id)),
      {
        wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
      }
    );

    const [quantity, setQuantity] = result.current;
    expect(quantity).toBe(CartItemListMock[0].quantity);

    act(() => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    });

    await waitFor(() => {
      const [updatedQuantity] = result.current;
      expect(updatedQuantity).toBe(CartItemListMock[0].quantity + 1);
    });
  });
});

describe("상품 주문 금액 계산 테스트", () => {
  it("상품을 선택하면 주문금액에 선택된 상품의 가격이 잘 계산된다.", async () => {
    const initializeState = ({ set }: { set: SetRecoilState }) => {
      set(selectedCartItemsIdState, [CartItemListMock[0].id]);
    };

    const { result } = renderHook(
      () => useRecoilValue(totalOrderPriceSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        ),
      }
    );

    await waitFor(() => {
      expect(result.current).toBe(CartItemListMock[0].product.price);
    });
  });
});

describe("상품 삭제 테스트", () => {
  it("상품을 삭제할 경우, 상품 갯수가 줄어든다", async () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    expect(result.current[0].length).toBe(CartItemListMock.length);

    await act(() => {
      result.current[1](
        result.current[0].filter((item) => item.id !== CartItemListMock[0].id)
      );
    });

    await waitFor(() => {
      const [updatedItems] = result.current;
      expect(updatedItems.length).toBe(CartItemListMock.length - 1);
    });
  });
});
