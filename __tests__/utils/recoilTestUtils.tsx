import { CartItem } from '@appTypes/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom, couponListAtom, selectedIdsAtom, surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { INITIAL_ITEMS } from '../mockData/cartItems';
import { COUPON_LIST } from '../mockData/coupon';

export const renderHookWithRecoilRoot = <T,>(
  hook: () => T,
  initialItems?: CartItem[],
  initialSelectedIds?: number[],
) => {
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(cartItemsAtom, initialItems || INITIAL_ITEMS);
          set(selectedIdsAtom, initialSelectedIds || []);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

export const renderCouponHookWithRecoilRoot = <T,>(
  hook: () => T,
  initialItems: CartItem[],
  initialSelectedIds: number[],
  isSurchargeShippingFee?: boolean,
) => {
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(cartItemsAtom, initialItems);
          set(selectedIdsAtom, initialSelectedIds);
          set(couponListAtom, COUPON_LIST);
          set(surchargeShippingFeeAtom, isSurchargeShippingFee ? PRICE.shippingFee.surcharge : 0);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};
