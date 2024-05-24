import { RecoilRoot, SetRecoilState } from "recoil";
import { renderHook } from "@testing-library/react";
import useCalculateShippingFee from "../useCalculateShippingFee";

import { act } from "react";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { CartItemListMock } from "@/tests/mock";
import { cartItemQuantity } from "@/recoil/cartItemQuantity";
import { cartItems } from "@/recoil/cartItems";

jest.mock("../../auth/utils/url", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

const initializeState = ({ set }: { set: SetRecoilState }) => {
  set(cartItems, CartItemListMock);

  CartItemListMock.forEach((item) => {
    set(selectedCartItemsIdState, (prev) => [...prev, item.id]);
    set(cartItemQuantity(item.id), item.quantity);
  });
};

describe("useCalculatorShippingFee", () => {
  describe("배송비 타입 계산하기", () => {
    it("현재 금액에 따라 맞는 배송비 타입을 보여줄 수 있다.", () => {
      const { result } = renderHook(() => useCalculateShippingFee(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              initializeState;
              set(selectedCartItemsIdState, [4]);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      act(() => {
        result.current.calculateShippingFee();
      });

      expect(result.current.shippingFeeType).toBe("FREE");
    });
  });
});
