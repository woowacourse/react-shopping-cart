import { Coupon } from '@appTypes/orderConfirm';
import { couponListAtom } from '@recoil/orderConfirm';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { SHIPPING_FREE_ITEMS } from '../constants/cartItems';
import { INITIAL_COUPONS } from '../constants/coupon';

const executeCouponRenderHook = <T,>(callback: () => T, coupons?: Coupon[]) => {
  return renderHook(callback, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(couponListAtom, coupons ?? INITIAL_COUPONS);
          set(cartItemsAtom, SHIPPING_FREE_ITEMS);
          set(selectedIdsAtom, new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)));
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

export default executeCouponRenderHook;
