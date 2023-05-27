import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { checkedCartItemsState } from '@recoil/atom';
import { CartItem, CartItems } from '@customTypes/Product';

export const useUpdateCheckedCartItems = (
  cartItems: CartItems,
  isChecked: boolean
) => {
  const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);

  useEffect(() => {
    const cartItemList = Object.values(cartItems);

    const updateCheckedCartItems = (cartItem: CartItem) => {
      setCheckedCartItems(prev => {
        const newCheckedCartItems = {
          ...prev,
        };

        delete newCheckedCartItems[`productId${cartItem.product.id}`];

        return !isChecked
          ? newCheckedCartItems
          : Object.assign(newCheckedCartItems, {
              [`productId${cartItem.product.id}`]: cartItem,
            });
      });
    };

    cartItemList.forEach(cartItem => {
      updateCheckedCartItems(cartItem);
    });
  }, [cartItems, isChecked, setCheckedCartItems]);
};
