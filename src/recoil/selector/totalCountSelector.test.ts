import { checkedIdListAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { totalCountSelector } from "./selector";
import { mockCartItems, mockCheckedIds } from "../mocks";

jest.mock("../../api/cartItem", () => ({
  fetchCartItems: jest.fn().mockImplementation(async () => mockCartItems),
}));
describe("quantitySelector 테스트", () => {
  let result;

  beforeEach(async () => {
    const hook = renderHook(
      () => {
        const [checkedIds, setCheckedIds] = useRecoilState(checkedIdListAtom);
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
