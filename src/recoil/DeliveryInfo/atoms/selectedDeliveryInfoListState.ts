import { atom } from 'recoil';

import { DeliveryInfo } from '../../../types/DeliveryInfo.type';

export const selectedDeliveryInfoListState = atom<DeliveryInfo[]>({
  key: 'selectedDeliveryInfoListState',
  default: [],
});
