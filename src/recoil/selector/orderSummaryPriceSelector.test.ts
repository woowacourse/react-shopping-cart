import { act } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { renderHook } from "@testing-library/react";

import { cartItemCheckedIdsAtom, cartItemsAtom, shippingCheckedAtom } from "../atom/atom";
import { orderPriceSelector, shippingFeeSelector } from "./selector";
import { EXTRA_SHIPPING_FEE, ORDER_PRICE_THRESHOLD, SHIPPING_FEE } from "../../constants/setting";
import { formatCurrency } from "../../utils/formatCurrency";
import { mockCartItems, mockCheckedIds } from "../../mocks/cartItems";

describe("orderPriceSelector 테스트", () => {
  let result;

  beforeEach(() => {
    const hook = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
        const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
        const orderPrice = useRecoilValue(orderPriceSelector);
        const shippingFee = useRecoilValue(shippingFeeSelector);
        const setIsShippingChecked = useSetRecoilState(shippingCheckedAtom);
        return { cartItems, setCartItems, checkedIds, setCheckedIds, orderPrice, shippingFee, setIsShippingChecked };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;
  });

  it("orderPrice 상태를 확인했을 때, 체크되어있는 아이템들의 가격과 수량으로 계산된 주문 금액이 얻어진다.", () => {
    act(() => {
      result.current.setCartItems(mockCartItems);
      result.current.setCheckedIds(mockCheckedIds);
    });

    expect(result.current.orderPrice).toEqual(145000);
  });

  describe("shippingFeeSelector 테스트", () => {
    it(`주문 금액이 ${formatCurrency(ORDER_PRICE_THRESHOLD)}이 넘지 않으면 배달비가 ${formatCurrency(SHIPPING_FEE)}이다.`, () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds([1]);
      });

      expect(result.current.shippingFee).toEqual(SHIPPING_FEE);
    });

    it(`주문 금액이 ${formatCurrency(ORDER_PRICE_THRESHOLD)}이 넘으면 배달비가 0원이다.`, () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds(mockCheckedIds);
      });

      expect(result.current.shippingFee).toEqual(0);
    });

    it("제주도 및 도서 산간 지역을 선택했을 때, 추가 배달비가 포함된다.", () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds([1]);
        result.current.setIsShippingChecked(true);
      });

      expect(result.current.shippingFee).toEqual(SHIPPING_FEE + EXTRA_SHIPPING_FEE);
    });
  });
});
