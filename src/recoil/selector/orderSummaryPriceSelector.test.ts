import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { orderPriceSelector, shippingFeeSelector, totalPriceSelector } from "./selector";
import { formatCurrency } from "../../utils/formatCurrency";
import { ORDER_PRICE_THRESHOLD, SHIPPING_FEE } from "../../constants/setting";
import { mockCartItems, mockCheckedIds } from "../mockData";

jest.mock("../../api/cartItemApi", () => ({
  fetchCartItems: jest.fn().mockImplementation(async () => mockCartItems),
}));

describe("orderPriceSelector 테스트", () => {
  let result;

  beforeEach(async () => {
    const hook = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
        const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
        const orderPrice = useRecoilValue(orderPriceSelector);
        const shippingFee = useRecoilValue(shippingFeeSelector);
        const totalPrice = useRecoilValue(totalPriceSelector);
        return { cartItems, setCartItems, checkedIds, setCheckedIds, orderPrice, shippingFee, totalPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    result = hook.result;
    await waitFor(() => {
      expect(result.current.setCartItems).toBeDefined();
    });
  });

  describe("orderPriceSelector 테스트", () => {
    it("orderPrice 상태를 확인했을때, 체크되어있는 아이템들의 가격과 수량으로 계산된 주문 금액이 얻어진다.", () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds(mockCheckedIds);
      });

      expect(result.current.orderPrice).toEqual(145000);
    });
  });

  describe("shippingFeeSelector 테스트", () => {
    it(`주문 금액이 ${formatCurrency(ORDER_PRICE_THRESHOLD)}이 넘지 않으면 배달비가 ${formatCurrency(SHIPPING_FEE)}이다.`, () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds([1]);
      });

      console.log(result.current.shippingFee, result.current.orderPrice);
      expect(result.current.shippingFee).toEqual(3000);
    });

    it("주문 금액이 100,000원이 넘으면 배달비가 0원이다.", () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds(mockCheckedIds);
      });

      expect(result.current.shippingFee).toEqual(0);
    });
  });

  describe("totalPriceSelector 테스트", () => {
    it("배달비가 0원일 때, 주문 금액과 배달비를 합한 전체 금액을 계산한다.", () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds(mockCheckedIds);
      });

      expect(result.current.totalPrice).toEqual(145000);
    });

    it("배달비가 3,000원일 때, 주문 금액과 배달비를 합한 전체 금액을 계산한다.", () => {
      act(() => {
        result.current.setCartItems(mockCartItems);
        result.current.setCheckedIds([1]);
      });

      expect(result.current.totalPrice).toEqual(73000);
    });
  });
});
