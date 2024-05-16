import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { categoryCountState, orderPriceState } from "./selector";

describe("초기값 테스트", () => {
  it("상품 종류 수량 초기값은 0이다.", () => {
    const { result } = renderHook(() => useRecoilValue(categoryCountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toBe(0);
  });
  it("주문 금액 초기값은 0이다.", () => {
    const { result } = renderHook(() => useRecoilValue(orderPriceState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toBe(0);
  });
});
