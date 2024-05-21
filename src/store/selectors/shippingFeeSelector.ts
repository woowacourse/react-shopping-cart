import { DEFAULT_SHIPPING_FEE, EXTRA_SHIPPING_FEE } from '@/constants/system';

import { selector } from 'recoil';
import { shippingAreaState } from '../atoms';

export const shippingFeeState = selector<number>({
  key: 'shippingFeeState',
  get: ({ get }) => {
    const shippingArea = get(shippingAreaState);

    if (shippingArea === 'island') return EXTRA_SHIPPING_FEE;
    return DEFAULT_SHIPPING_FEE;
  },
});
