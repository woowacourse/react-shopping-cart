import { useRecoilState } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { CartItem } from '@customTypes/Product';
import { cartItemsState } from '@recoil/atom';

export const useDeleteSelectedItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const cartItemList = Object.values(cartItems);
  const checkedCartItems = cartItemList.filter(cartItem => cartItem.isChecked);
  const { deleteData } = fetchApis();

  const deleteSelectedItems = () => {
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
