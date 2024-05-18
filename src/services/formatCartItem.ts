import { CartItemData } from '@/types';

const formatCartItems = (allCartItems: CartItemData[]) => {
  return allCartItems.map((cartItem) => {
    const cartItemId = cartItem.id;
    const cartItemCheckedStatus = localStorage.getItem(JSON.stringify(cartItemId));

    const isCheckedCartItem = cartItemCheckedStatus === 'false' ? false : true;

    return {
      ...cartItem,
      product: {
        ...cartItem.product,
        isChecked: isCheckedCartItem,
      },
    };
  });
};

export default formatCartItems;
