import { cartItemsAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState } from "recoil";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { quantitySelector } from "./selector";
import { mockCartItems } from "../mockData";

describe("quantitySelector 테스트", () => {
  let result;

  beforeEach(() => {
    const hook = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
        const [quantities, setQuantity] = useRecoilState(quantitySelector);
        return { cartItems, setCartItems, quantities, setQuantity };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;
  });

  it("quantities의 상태를 확인했을 때, cartItems의 quantity들이 얻어진다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
    });

    expect(result.current.quantities).toEqual({ 1: 2, 2: 3, 3: 1 });
  });

  it("cartItems의 quantity를 변경하고 quantities 상태를 확인했을때, 변경된 cartItems의 quantity들이 얻어진다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
    });

    act(() => result.current.setQuantity({ 3: 5 }));

    expect(result.current.quantities).toEqual({ 1: 2, 2: 3, 3: 5 });
  });
});
