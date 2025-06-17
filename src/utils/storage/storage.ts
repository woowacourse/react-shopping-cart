import { STORAGE_KEYS } from '../../constants/localStorageKey';
import { CartItemType } from '../../domain/mapper/cartItemMapper';

import { getLocalStorage } from '../localStorage';

export const getOrderItemsFromStorage = () => {
  return getLocalStorage<CartItemType[]>(STORAGE_KEYS.SELECTED_ITEMS, []);
};

export const getShippingInfoFromStorage = () => {
  const value = getLocalStorage<boolean>(STORAGE_KEYS.IS_REMOTE_AREA, false);
  return { isRemoteArea: value === true };
};
