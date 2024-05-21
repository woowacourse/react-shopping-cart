import {
  MOCK_FILTERED_CART_LIST_FREE_SHIPPING_FEE,
  MOCK_FILTERED_CART_LIST_NEED_SHIPPING_FEE,
} from "@/constants/_mock/mockFilteredCartList";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { cartListState, filteredCartItemState } from "@/store/atoms";

import MOCK_CART_LIST from "@/constants/_mock/mockCartList";
import { recipeState } from "@/store/selectors/recipeSelector";
import { renderHook } from "@testing-library/react";

jest.mock("../../api/config", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe("cartTotalPriceState", () => {
  it("상품 개수에 따른 총 가격 계산(10만원 이하 배송비 포함)", () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_NEED_SHIPPING_FEE.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const { orderPrice, shippingFee, totalPrice } =
          useRecoilValue(recipeState);

        return { orderPrice, shippingFee, totalPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.orderPrice).toBe(7000);
    expect(result.current.shippingFee).toBe(3000);
    expect(result.current.totalPrice).toBe(10000);
  });

  it("상품 개수에 따른 총 가격 계산(10만원 이상 배송비 무료)", () => {
    const { result } = renderHook(
      () => {
        const setCartList = useSetRecoilState(cartListState);
        setCartList(MOCK_CART_LIST);

        MOCK_FILTERED_CART_LIST_FREE_SHIPPING_FEE.forEach((item) => {
          const setFilteredCartList = useSetRecoilState(
            filteredCartItemState(item.id)
          );
          setFilteredCartList(item);
        });

        const { orderPrice, shippingFee, totalPrice } =
          useRecoilValue(recipeState);

        return { orderPrice, shippingFee, totalPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.orderPrice).toBe(169000);
    expect(result.current.shippingFee).toBe(0);
    expect(result.current.totalPrice).toBe(169000);
  });
});
