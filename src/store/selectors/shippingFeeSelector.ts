import { DEFAULT_SHIPPING_FEE, EXTRA_SHIPPING_FEE } from '@/constants/system';

import { selector } from 'recoil';
import { shippingAreaState } from '../atoms';

export const shippingFeeState = selector({
  key: 'shippingFeeState',
  get: ({ get }) => {
    const shippingArea = get(shippingAreaState);

    if (shippingArea === 'Island') return EXTRA_SHIPPING_FEE;

    return DEFAULT_SHIPPING_FEE;
  },
});
