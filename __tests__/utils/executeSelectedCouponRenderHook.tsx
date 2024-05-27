import { Coupon } from '@appTypes/orderConfirm';
import { CartItem } from '@appTypes/shoppingCart';
import { couponListAtom, selectedCouponListAtom } from '@recoil/orderConfirm';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { SHIPPING_FREE_ITEMS } from '../constants/cartItems';
import { INITIAL_COUPONS } from '../constants/coupon';

const executeSelectedCouponRenderHook = <T,>(
  callback: () => T,
  coupons?: Coupon[],
  items?: CartItem[],
  ids?: Set<number>,
) => {
  return renderHook(callback, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(couponListAtom, INITIAL_COUPONS);
          set(selectedCouponListAtom, coupons ?? []);
          set(cartItemsAtom, items ?? SHIPPING_FREE_ITEMS);
          set(selectedIdsAtom, ids ?? new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)));
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

export default executeSelectedCouponRenderHook;
