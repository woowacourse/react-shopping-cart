import { CartItem } from '@appTypes/shoppingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { INITIAL_ITEMS } from '../mockData/cartItems';

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
