import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { LOCAL_STORAGE_KEYWORD, SHOPPING_QUANTITY } from '@Constants/index';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import shoppingCartState from '@Atoms/shoppingCartState';

import { LocalData } from '@Utils/localData';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = (product) => {
    return (quantity: number) => {
      if (quantity === SHOPPING_QUANTITY.MIN) {
        setShoppingCart((prev) => prev.filter((item) => item.product.id !== product.id));
        return;
      }

      const shoppingItem = shoppingCart.find((item) => item.product.id === product.id);
      if (!shoppingItem) {
        const newShoppingItem = {
          id: Date.now(),
          quantity,
          product,
        };
        setShoppingCart([...shoppingCart, newShoppingItem]);
        return;
      }

      setShoppingCart((prev) =>
        prev.map((item) => {
          if (item.product.id !== shoppingItem.product.id) return item;
          return {
            id: shoppingItem.id,
            quantity,
            product,
          };
        }),
      );
    };
  };

  const deleteShoppingItems = (productsId: number[]) => {
    setShoppingCart(shoppingCart.filter((item) => !productsId.includes(item.id)));
  };

  useEffect(() => {
    LocalData.setDate(LOCAL_STORAGE_KEYWORD.SHOPPING_CART, shoppingCart);
  }, [shoppingCart]);

  return { shoppingCart, updateShoppingCart, deleteShoppingItems };
};

export default useShoppingCart;
