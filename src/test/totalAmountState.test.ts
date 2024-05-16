import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { totalAmountState } from "../store/selector/selectors";
import { act } from "react";
import { cartState, itemEachCheckState, itemQuantityState } from "../store/atom/atoms";

const DUMMY_CART_ITEMS: CartItemInfo[] = [
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
];

describe("totalAmountState", () => {
  it("상품 개수에 따른 총 가격 계산", () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(totalAmountState);
        const [cartItems, setCartState] = useRecoilState(cartState);
        const setItemEachCheckState1 = useSetRecoilState(itemEachCheckState(1));
        const setItemEachCheckState2 = useSetRecoilState(itemEachCheckState(2));
        const setItemQuantityState = useSetRecoilState(itemQuantityState);
        return {
          cartItems,
          totalPrice,
          setCartState,
          setItemEachCheckState1,
          setItemEachCheckState2,
          setItemQuantityState,
        };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartState(DUMMY_CART_ITEMS);
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
