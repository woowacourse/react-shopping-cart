import { CartItem } from '@/features/Cart/types/Cart.types';

const isCartItem = (item: unknown): item is CartItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as CartItem).id === 'number' &&
    typeof (item as CartItem).isChecked === 'boolean' &&
    typeof (item as CartItem).quantity === 'number' &&
    typeof (item as CartItem).product === 'object'
  );
};

export const isCartItemArray = (data: unknown): data is CartItem[] => {
  return Array.isArray(data) && data.length > 0 && data.every(isCartItem);
};
