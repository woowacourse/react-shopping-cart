import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { totalAmountSelector } from "../store/selector/selectors";
import { act } from "react";
import { cartState, cartItemCheckedState } from "../store/atom/atoms";

const DUMMY_CART_ITEMS: { content: CartItemInfo[] } = {
  content: [
    {
      id: 1,
      product: {
        id: 100,
        name: "abc",
        price: 20000,
        imageUrl: "",
        category: "fashion",
      },
      quantity: 4,
    },
    {
      id: 2,
      product: {
        id: 101,
        name: "def",
        price: 10000,
        imageUrl: "",
        category: "fashion",
      },
      quantity: 2,
    },
  ],
};

jest.mock("../store/api", () => ({
  fetchProducts: jest.fn().mockImplementation(async () => DUMMY_CART_ITEMS),
}));

describe("totalAmountState", () => {
  it("상품 개수에 따른 총 가격 계산", async () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(totalAmountSelector);
        const [cartItems, setCartState] = useRecoilState(cartState);
        const setItemEachCheckState1 = useSetRecoilState(cartItemCheckedState(1));
        const setItemEachCheckState2 = useSetRecoilState(cartItemCheckedState(2));
        return {
          cartItems,
          totalPrice,
          setCartState,
          setItemEachCheckState1,
          setItemEachCheckState2,
        };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current.setCartState).toBeDefined();
    });

    act(() => {
      result.current.setCartState(DUMMY_CART_ITEMS.content);
      result.current.setItemEachCheckState1(true);
      result.current.setItemEachCheckState2(true);
    });

    expect(result.current.totalPrice).toBe(100000);

    act(() => {
      result.current.setItemEachCheckState2(false);
    });

    expect(result.current.totalPrice).toBe(83000);
  });
});
