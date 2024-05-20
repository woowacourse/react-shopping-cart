import { CartItemData } from '@/types';
import CheckedCartItemStorage from './CheckedProductStorage';

const formatCartItems = (allCartItems: CartItemData[]): CartItemData[] => {
  const checkedProductIds = new Set(CheckedCartItemStorage.getCheckedProductIds());

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
