import { useRecoilState } from 'recoil';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import shoppingCartState from '@Atoms/shoppingCartState';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = async (url, method, body) => {
    await fetch(url, {
      method,
      body,
    });

    setShoppingCart(localStorageHelper.getValue('cartItems'));
  };

  return { shoppingCart, updateShoppingCart };
};

export default useShoppingCart;
