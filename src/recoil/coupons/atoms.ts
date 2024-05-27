import { atom } from 'recoil';

import { couponChecklistSelector } from './selectors';

export const couponChecklistState = atom({
  key: 'couponCheckList',
  default: couponChecklistSelector,
});

export const isAdditionalShippingState = atom({
  key: 'isAdditionalShippingState',
  default: false,
});
