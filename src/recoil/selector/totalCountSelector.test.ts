import { act } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { renderHook } from "@testing-library/react";

import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { totalCountSelector } from "./selector";
import { mockCartItems, mockCheckedIds } from "../../mocks/cartItems";

describe("quantitySelector 테스트", () => {
  let result;

  beforeEach(() => {
    const hook = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
        const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
        const totalCount = useRecoilValue(totalCountSelector);
        return { cartItems, setCartItems, checkedIds, setCheckedIds, totalCount };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;
  });

  it("선택된 아이템들의 수량들을 합해 주문된 전체 수량을 계산할 수 있다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setCheckedIds(mockCheckedIds);
    });

    expect(result.current.totalCount).toEqual(5);
  });
});
