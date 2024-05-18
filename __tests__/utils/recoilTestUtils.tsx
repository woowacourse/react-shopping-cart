import { CartItem } from '@appTypes/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { INITIAL_ITEMS } from '../constants/cartItems';

export const renderHookWithRecoilRoot = <T,>(
  hook: () => T,
  initialItems?: CartItem[],
  initialSelectedIds?: number[],
) => {
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(cartItemsSelector, initialItems || INITIAL_ITEMS);
          set(selectedIdsAtom, initialSelectedIds || []);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};
