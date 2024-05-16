import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { mockCartItems } from "../../mocks/mockData";
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

describe("mockData를 이용한 테스트", () => {
  it("장바구니 데이터 로딩 ", () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockCartItems.content));

    expect(result.current[0].length).toBe(3);
  });
});
