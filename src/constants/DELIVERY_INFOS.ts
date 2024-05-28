import type { DeliveryInfo } from '../types/DeliveryInfo';

export const DEFAULT_DELIVERY_FEE = 3000;
export const DELIVERY_FEE_DISCOUNT_THRESHOLD = 100000;

export const DELIVERY_INFOS: Record<string, DeliveryInfo> = {
  ISLANDS_AND_MOUNTAINS: { title: '제주도 및 도서 산간 지역', surcharge: 3000 },
};
