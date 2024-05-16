import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState } from "recoil";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { allCheckedSelector, quantitySelector } from "./selector";
import { Product } from "../../types";

// mock data
const mockCartItems: Product[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];

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

  it("cartItems의 quantity가 quantities 상태로 잘 저장된다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
    });

    expect(result.current.quantities).toEqual({ 1: 2, 2: 3, 3: 1 });
  });

  it("cartItems의 quantity가 quantities 상태로 잘 저장된다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
    });

    act(() => result.current.setQuantity({ 3: 5 }));

    expect(result.current.quantities).toEqual({ 1: 2, 2: 3, 3: 5 });
  });
});
