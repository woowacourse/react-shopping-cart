import { act } from "react";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { renderHook } from "@testing-library/react";

import { cartItemsAtom } from "../atom/atom";
import { quantitySelectorFamily } from "./selector";
import { mockCartItems } from "../../mocks/cartItems";

describe("quantitySelectorFamily 테스트", () => {
  let result;

  beforeEach(() => {
    const hook = renderHook(
      () => {
        const setCartItems = useSetRecoilState(cartItemsAtom);
        const [quantity, setQuantity] = useRecoilState(quantitySelectorFamily(1));
        return { quantity, setCartItems, setQuantity };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;
  });

  it("quantitySelectorFamily가 해당 id에 대한 quantity를 잘 반환하는지 확인한다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setQuantity(mockCartItems.find((item) => item.id === 1).quantity);
    });

    expect(result.current.quantity).toEqual(mockCartItems.find((item) => item.id === 1).quantity);
  });

  it("quantitySelectorFamily의 상태를 업데이트하고, cartItemsAtom에도 반영되는지 확인한다.", () => {
    const newQuantity = 5;

    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setQuantity(mockCartItems.find((item) => item.id === 1).quantity);
    });

    act(() => {
      result.current.setQuantity(newQuantity);
    });

    expect(result.current.quantity).toEqual(newQuantity);

    const updatedCartItems = mockCartItems.map((item) => (item.id === 1 ? { ...item, quantity: newQuantity } : item));
    expect(updatedCartItems.find((item) => item.id === 1).quantity).toEqual(newQuantity);
  });
});
