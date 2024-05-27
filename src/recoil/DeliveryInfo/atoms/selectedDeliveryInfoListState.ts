import { atom } from 'recoil';

import type { DeliveryInfo } from '../../../types/DeliveryInfo';

export const selectedDeliveryInfoListState = atom<DeliveryInfo[]>({
  key: 'selectedDeliveryInfoListState',
  default: [],
});
