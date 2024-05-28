import { CartItem } from '@appTypes/shoppingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { INITIAL_ITEMS } from '../constants/cartItems';

const executeCartItemRenderHook = <T,>(callback: () => T, items?: CartItem[], ids?: Set<number>) => {
  return renderHook(callback, {
    wrapper: ({ children }) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(cartItemsAtom, items ?? INITIAL_ITEMS);
          set(selectedIdsAtom, ids ?? new Set());
        }}
      >
        {children}
      </RecoilRoot>
    ),
  });
};

export default executeCartItemRenderHook;
