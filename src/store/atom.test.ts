import { RecoilRoot, useRecoilState } from "recoil";

import { INIT_CART_ITEM_STATE } from "@/constants/defaultStateValue";
import { act } from "react";
import { filteredCartItemState } from "@/store/atoms";
import { renderHook } from "@testing-library/react";

jest.mock("../api/config", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe("filteredCartItemState test", () => {
  const mockId = 1;
  it("초기값은 default value", () => {
    const { result } = renderHook(
      () => useRecoilState(filteredCartItemState(mockId)),
      {
        wrapper: RecoilRoot,
      }
    );
    expect(result.current[0]).toBe(INIT_CART_ITEM_STATE);
    expect(1).toBe(1);
  });

  it("값 변경 가능", () => {
    const { result } = renderHook(
      () => useRecoilState(filteredCartItemState(mockId)),
      {
        wrapper: RecoilRoot,
      }
    );

    const changeQuantity = { ...result.current[0] };
    changeQuantity.quantity = 3;
    act(() => {
      result.current[1](changeQuantity);
    });
    expect(result.current[0]).toBe(changeQuantity);

    const changeIsSelected = { ...result.current[0] };
    changeIsSelected.isSelected = true;

    act(() => {
      result.current[1](changeIsSelected);
    });
    expect(result.current[0]).toBe(changeIsSelected);
  });
});
