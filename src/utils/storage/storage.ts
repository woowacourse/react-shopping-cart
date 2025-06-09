import { SelectedItem } from '../../page/OrderPage';
import { getLocalStorage } from '../localStorage';

export const getOrderItemsFromStorage = () => {
  return getLocalStorage<SelectedItem[]>('selectedItems', []);
};

export const getOrderAmountFromStorage = () => {
  const items = getOrderItemsFromStorage();
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getShippingInfoFromStorage = () => {
  const value = getLocalStorage<boolean>('isRemoteArea', false);
  return { isRemoteArea: value === true };
};
