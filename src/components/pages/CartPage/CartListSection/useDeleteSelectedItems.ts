import { useSetRecoilState } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { CartItem, CartItems } from '@customTypes/Product';
import { cartItemsState } from '@recoil/atom';

export const useDeleteSelectedItems = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const { deleteData } = fetchApis();

  const deleteSelectedItems = (cartItems: CartItems) => {
    const cartItemList = Object.values(cartItems);
    const checkedCartItems = cartItemList.filter(
      cartItem => cartItem.isChecked
    );

    checkedCartItems.forEach(async (checkedCartItem: CartItem) => {
      await deleteData('/cart-items', `/${checkedCartItem.product.id}`);

      setCartItems(prev => {
        const newCartItems = { ...prev };
        const key = checkedCartItem.id ?? '';
        delete newCartItems[key];

        return newCartItems;
      });
    });
  };

  return deleteSelectedItems;
};
