import { SetRecoilState } from "recoil";
import { renderHook } from "@testing-library/react";

import RecoilTestWrapper from "./RecoilTestWrapper";

import { cartItemQuantity } from "@/recoil/cartItemQuantity";
import { cartItems } from "@/recoil/cartItems";
import { selectedCartItemIds } from "@/recoil/selectedCardItems";
import { couponsState } from "@/recoil/coupon";

import { Coupon } from "@/types/cart";

import MOCK_CART_ITEMS from "../mocks/cartItem";

const createInitializeState = (mockCoupons: Coupon[] = []) => {
  return ({ set }: { set: SetRecoilState }) => {
    set(cartItems, MOCK_CART_ITEMS);

    set(couponsState, mockCoupons);

    MOCK_CART_ITEMS.forEach((item) => {
      set(selectedCartItemIds(item.id), true);
      set(cartItemQuantity(item.id), item.quantity);
    });
  };
};

export const renderTestHook = <T,>(
  callback: () => T,
  mockCoupons: Coupon[] = []
) =>
  renderHook(callback, {
    wrapper: ({ children }) => (
      <RecoilTestWrapper initializeState={createInitializeState(mockCoupons)}>
        {children}
      </RecoilTestWrapper>
    ),
  });
