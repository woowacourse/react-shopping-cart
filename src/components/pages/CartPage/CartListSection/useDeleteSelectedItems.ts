import { useResetRecoilState, useSetRecoilState } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { CartItem, CartItems } from '@customTypes/Product';
import { cartItemsState, checkedCartItemsState } from '@recoil/atom';

export const useDeleteSelectedItems = (selectedItems: CartItems) => {
  const resetCheckedCartItems = useResetRecoilState(checkedCartItemsState);
  const setCartItems = useSetRecoilState(cartItemsState);

  const deleteSelectedItems = () => {
    const { deleteData } = fetchApis();
    const checkedCartItemList = Object.values(selectedItems);

    checkedCartItemList.forEach((selectedCartItem: CartItem) => {
      deleteData('/cart-items', `/${selectedCartItem.product.id}`);
      setCartItems(prev => {
        const newCartItems = { ...prev };
        const key = selectedCartItem.id ?? '';
        delete newCartItems[key];

        return newCartItems;
      });
    });

    resetCheckedCartItems();
  };

  return deleteSelectedItems;
};
