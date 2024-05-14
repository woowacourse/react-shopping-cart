import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { isSelectedState } from "./atoms";

describe("개별 선택", () => {
  it("개별 선택 초기값은 false이다.", () => {
    const { result } = renderHook(() => useRecoilValue(isSelectedState(1234)), {
      wrapper: RecoilRoot,
    });
    expect(result.current).toBe(false);
  });

  it("개별 선택을 선택하면 값이 true로 변경된다.", () => {
    const { result } = renderHook(() => useRecoilState(isSelectedState(1234)), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });
});
