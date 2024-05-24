import { atom } from 'recoil';

import type { DeliveryInfo } from '../../../types/DeliveryInfo.type';

export const selectedDeliveryInfoListState = atom<DeliveryInfo[]>({
  key: 'selectedDeliveryInfoListState',
  default: [],
});
