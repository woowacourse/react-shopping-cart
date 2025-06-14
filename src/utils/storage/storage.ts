import { STORAGE_KEYS } from '../../constants/localStorageKey';
import { SelectedItem } from '../../page/OrderPage';
import { getLocalStorage } from '../localStorage';

export const getOrderItemsFromStorage = () => {
  return getLocalStorage<SelectedItem[]>(STORAGE_KEYS.SELECTED_ITEMS, []);
};

export const getOrderAmountFromStorage = () => {
  const items = getOrderItemsFromStorage();
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getShippingInfoFromStorage = () => {
  const value = getLocalStorage<boolean>(STORAGE_KEYS.IS_REMOTE_AREA, false);
  return { isRemoteArea: value === true };
};
