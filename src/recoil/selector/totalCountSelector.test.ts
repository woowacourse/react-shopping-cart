import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { totalCountSelector } from "./selector";
import { CartItem } from "../../types";

// mock data
const mockCartItems: CartItem[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];
const mockCheckedIds: number[] = [1, 2];
jest.mock("../../api/cartItem", () => ({
  fetchCartItems: jest.fn().mockImplementation(async () => mockCartItems),
}));
describe("quantitySelector 테스트", () => {
  let result;

  beforeEach(async () => {
    const hook = renderHook(
      () => {
        const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
        const totalCount = useRecoilValue(totalCountSelector);
        return { checkedIds, setCheckedIds, totalCount };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;
    await waitFor(() => {
      expect(result.current.checkedIds).toBeDefined();
    });
  });

  it("선택된 아이템들의 수량들을 합해 주문된 전체 수량을 계산할 수 있다.", () => {
    act(() => {
      result.current.setCheckedIds(mockCheckedIds);
    });

    expect(result.current.totalCount).toEqual(5);
  });
});
