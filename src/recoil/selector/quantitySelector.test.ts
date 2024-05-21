import { cartItemListAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState } from "recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { itemQuantitiesSelector } from "./selector";
import { CartItem } from "../../types";

const mockCartItems: CartItem[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];

jest.mock("../../api/cartItem", () => ({
  fetchCartItems: jest.fn().mockImplementation(() => Promise.resolve(mockCartItems)),
}));
describe("quantitySelector 테스트", () => {
  let result;

  beforeEach(async () => {
    const hook = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemListAtom);
        const [quantities, setQuantity] = useRecoilState(itemQuantitiesSelector);
        return { cartItems, setCartItems, quantities, setQuantity };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;

    await waitFor(() => {
      expect(result.current.setCartItems).toBeDefined();
    });
  });

  it("quantities의 상태를 확인했을 때, cartItems의 quantity들이 얻어진다.", () => {
    expect(result.current.quantities).toEqual({ 1: 2, 2: 3, 3: 1 });
  });

  it("cartItems의 quantity를 변경하고 quantities 상태를 확인했을때, 변경된 cartItems의 quantity들이 얻어진다.", () => {
    act(() => result.current.setQuantity({ id: 3, quantity: 5 }));

    expect(result.current.quantities).toEqual({ 1: 2, 2: 3, 3: 5 });
  });
});
