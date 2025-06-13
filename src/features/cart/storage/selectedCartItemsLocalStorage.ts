import { CartItem } from '../types/cart';

const SELECTED_CART_ITEMS_KEY = 'selectedCartItems';

export const loadSelectedCartItemsFromStorage = (): CartItem[] | null => {
  try {
    const stored = localStorage.getItem(SELECTED_CART_ITEMS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('localStorage에서 데이터를 불러오는데 실패했습니다:', error);
    return null;
  }
};

export const saveSelectedCartItemsToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem(SELECTED_CART_ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('localStorage에 데이터를 저장하는데 실패했습니다:', error);
  }
};
