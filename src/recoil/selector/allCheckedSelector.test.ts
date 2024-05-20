import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState } from "recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { isAllCheckedSelector } from "./selector";
import { Product } from "../../types";

// mock data
const mockCartItems: Product[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];

const mockCheckedIds: number[] = [1, 2];

jest.mock("../../api/cartItem", () => {
  return {
    fetchCartItems: jest.fn().mockImplementation(async () => mockCartItems),
  };
});
describe("allCheckedSelector 테스트", () => {
  let result;

  beforeEach(async () => {
    const hook = renderHook(
      () => {
        const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
        const [allChecked, setAllChecked] = useRecoilState(isAllCheckedSelector);
        return { checkedIds, setCheckedIds, allChecked, setAllChecked };
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

  it("전체 선택을 선택했을 때 모든 아이템들이 선택된다.", () => {
    act(() => {
      result.current.setCheckedIds(mockCheckedIds);
    });

    act(() => result.current.setAllChecked(true));

    expect(result.current.allChecked).toEqual(true);
    expect(result.current.checkedIds).toEqual([1, 2, 3]);
  });

  it("전체 선택을 해제했을 때, 모든 아이템의 선택이 해제된다.", () => {
    act(() => {
      result.current.setCheckedIds([1, 2, 3]);
    });

    act(() => result.current.setAllChecked(false));

    expect(result.current.allChecked).toEqual(false);
    expect(result.current.checkedIds).toEqual([]);
  });

  it("전체 선택 상태에서 하나만 선택을 해제했을 때, 전체 선택 상태는 false가 된다.", () => {
    act(() => {
      result.current.setCheckedIds([1, 2, 3]);
    });

    act(() => result.current.setCheckedIds([1, 2]));

    expect(result.current.allChecked).toEqual(false);
  });

  it("하나를 선택했을 때 전체가 선택된 상태이면 전체 선택이 true가 된다.", () => {
    act(() => {
      result.current.setCheckedIds([1, 2]);
    });

    act(() => result.current.setCheckedIds([1, 2, 3]));

    expect(result.current.allChecked).toEqual(true);
  });
});
