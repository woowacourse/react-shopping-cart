import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { DELIVERY } from "../../constants";
import { mockCartItemsData } from "../../mocks/mockCartItemsData";
import { cartItemsState } from "../atoms/atoms";
import { cartSummarySelectorState } from "./selector";

describe("mockData를 이용한 테스트", () => {
  it("cartSummarySelectorState에 mockData를 로드하고, 금액이 올바르게 계산되는지 확인한다.", () => {
    const { result } = renderHook(
      () => {
        const setCartItems = useSetRecoilState(cartItemsState);
        const cartSummary = useRecoilValue(cartSummarySelectorState);
        return { setCartItems, cartSummary };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartItems(mockCartItemsData.content);
    });

    const expectedOrderPrice = 23000;
    const expectedDeliveryPrice = DELIVERY.STANDARD;
    const expectedTotalPrice = expectedOrderPrice + expectedDeliveryPrice;

    expect(result.current.cartSummary.orderPrice).toBe(expectedOrderPrice);
    expect(result.current.cartSummary.orderDeliveryPrice).toBe(expectedDeliveryPrice);
    expect(result.current.cartSummary.orderTotalPrice).toBe(expectedTotalPrice);
  });
});
