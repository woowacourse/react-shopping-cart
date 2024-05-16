import { RecoilRoot, useRecoilState } from "recoil";
import { cartItemCheckedIdsAtom } from "./atom";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { Product } from "../../types";

// mock data
const mockCartItems: Product[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];

const mockCheckedIds: number[] = [1, 2];
describe("cartItemCheckedIdsAtom 테스트", () => {
  it("checkIds 에 정상적으로 입력 된다.", () => {
    const { result } = renderHook(() => useRecoilState(cartItemCheckedIdsAtom), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockCheckedIds));

    const ids = result.current[0];

    expect(ids[0]).toBe(1);
    expect(ids[1]).toBe(2);
  });
});
