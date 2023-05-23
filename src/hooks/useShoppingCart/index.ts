import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { LOCAL_STORAGE_KEYWORD, SHOPPING_QUANTITY } from '@Constants/index';

import { deleteFetchCartItem, postFetchCartItem, putFetchCartItem } from '@Api/index';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import shoppingCartState from '@Atoms/shoppingCartState';

import { localData } from '@Utils/localData';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = (product) => {
    return (quantity: number) => {
      if (quantity === SHOPPING_QUANTITY.MIN) {
        const targetItem = shoppingCart.find((item) => item.product.id === product.id);
        targetItem && deleteFetchCartItem({ id: targetItem.id });
        setShoppingCart((prev) => prev.filter((item) => item.product.id !== product.id));
        return;
      }

      const shoppingItem = shoppingCart.find((item) => item.product.id === product.id);
      if (!shoppingItem) {
        if (quantity === SHOPPING_QUANTITY.DEFAULT) {
          postFetchCartItem({ id: product.id });
        } else {
          postFetchCartItem({ id: product.id });
          putFetchCartItem({ id: product.id, quantity: quantity });
        }

        const newShoppingItem = {
          id: Date.now(),
          quantity,
          product,
        };
        setShoppingCart([...shoppingCart, newShoppingItem]);

        return;
      }

      if (quantity === SHOPPING_QUANTITY.DEFAULT) {
        postFetchCartItem({ id: product.id });
      } else {
        putFetchCartItem({ id: product.id, quantity: quantity });
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

      return;
    };
  };

  const deleteShoppingItems = (productsId: number[]) => {
    productsId.forEach((itemId) => deleteFetchCartItem({ id: itemId }));
    setShoppingCart(shoppingCart.filter((item) => !productsId.includes(item.id)));
  };

  useEffect(() => {
    localData.setData(LOCAL_STORAGE_KEYWORD.SHOPPING_CART, shoppingCart);
  }, [shoppingCart]);

  return { shoppingCart, updateShoppingCart, deleteShoppingItems };
};

export default useShoppingCart;
