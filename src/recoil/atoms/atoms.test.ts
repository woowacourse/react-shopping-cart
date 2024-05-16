import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { cartItemsCountState, cartItemsState } from "./atoms";

describe("초기값 테스트", () => {
  it("상품 목록 조회 초기값은 빈 배열이다.", () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual([]);
  });

  it("상품 총 수량 초기값은 0이다. ", () => {
    const { result } = renderHook(() => useRecoilState(cartItemsCountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toBe(0);
  });
});
