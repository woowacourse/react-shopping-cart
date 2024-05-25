import { CartItem } from '@appTypes/shoppingCart';
import { isInaccessibleAreaAtom } from '@recoil/orderConfirm';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { INITIAL_ITEMS } from '../constants/cartItems';

export const executeIsInaccessibleAreaRenderHook = <T,>(
  callback: () => T,
  items?: CartItem[],
  ids?: Set<number>,
  isInaccessibleArea?: boolean,
) => {
  return renderHook(callback, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(cartItemsAtom, items ?? INITIAL_ITEMS);
          set(selectedIdsAtom, ids ?? new Set());
          set(isInaccessibleAreaAtom, isInaccessibleArea ?? true);
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};
