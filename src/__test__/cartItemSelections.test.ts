import { act } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

import { isCartItemsSelectedState } from "../stores/cartItemSelections";
import { cartAmountState } from "../stores/cartAmount";

import { CART_PRICE } from "../constants/cart";
import { MOCK_CART_LIST } from "./__mocks__/cart";

jest.mock("../apis/cartItem", () => ({
  getCartItems: jest.fn(),
}));

describe("CartItem Selections", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("상품을 선택하면 체크 상태 값이 변경된다. ", () => {
    const { result } = renderHook(
      () => useRecoilState(isCartItemsSelectedState(1274)),
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]((prev) => !prev);
    });

    expect(result.current[0]).toBe(true);
  });
});

describe("cartAmountState", () => {
  beforeEach(() => {
    const { getCartItems } = require("../apis/cartItem");
    getCartItems.mockResolvedValue(MOCK_CART_LIST);
  });

  it(`총 결제금액이 ${CART_PRICE.minOrderAmount}원 미만일 때, 배송비가 ${CART_PRICE.shippingFees.standard}원이다.`, async () => {
    const { result } = renderHook(() => useRecoilValue(cartAmountState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current.orderAmount).toBeLessThan(
        CART_PRICE.minOrderAmount
      );
      expect(result.current.shippingFee).toBe(CART_PRICE.shippingFees.standard);
    });
  });

  it("총 결제금액이 선택된 항목의 가격 합계와 배송비의 합과 일치해야 한다.", async () => {
    const { result } = renderHook(
      () => {
        const setSelection1 = useRecoilState(isCartItemsSelectedState(1274))[1];
        const setSelection2 = useRecoilState(isCartItemsSelectedState(1335))[1];
        const setSelection3 = useRecoilState(isCartItemsSelectedState(1336))[1];

        act(() => {
          setSelection1(true);
          setSelection2(true);
          setSelection3(true);
        });

        return useRecoilValue(cartAmountState);
      },
      {
        wrapper: RecoilRoot,
      }
    );

    const selectedItems = MOCK_CART_LIST.filter((item) =>
      [1274, 1335, 1336].includes(item.id)
    );

    const expectedOrderAmount = selectedItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const expectedShippingFee =
      expectedOrderAmount >= CART_PRICE.minOrderAmount
        ? 0
        : CART_PRICE.shippingFees.standard;
    const expectedTotalAmount = expectedOrderAmount + expectedShippingFee;

    await waitFor(() => {
      expect(result.current.orderAmount).toBe(expectedOrderAmount);
      expect(result.current.shippingFee).toBe(expectedShippingFee);
      expect(result.current.totalAmount).toBe(expectedTotalAmount);
    });
  });
});
