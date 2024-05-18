import { CartItemData } from '@/types';
import LocalStorage from './LocalStorage';

const formatCartItems = (allCartItems: CartItemData[]): CartItemData[] => {
  const checkedProductIds = new Set(LocalStorage.getCheckedProductIds());

  return allCartItems.map((cartItem) => {
    const isChecked = checkedProductIds.has(cartItem.id);
    return {
      ...cartItem,
      product: {
        ...cartItem.product,
        isChecked: isChecked,
      },
    };
  });
};

export default formatCartItems;
