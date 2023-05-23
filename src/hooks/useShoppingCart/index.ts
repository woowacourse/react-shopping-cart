import { useRecoilState } from 'recoil';

import { SHOPPING_QUANTITY } from '@Constants/index';

import { deleteFetchCartItem, postFetchCartItem, putFetchCartItem } from '@Api/index';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import shoppingCartState from '@Atoms/shoppingCartState';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = (product) => {
    return (quantity: number) => {
      if (quantity === SHOPPING_QUANTITY.MIN) {
        setShoppingCart((prev) => prev.filter((item) => item.product.id !== product.id));
        deleteFetchCartItem({ id: product.id });
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

        if (quantity === SHOPPING_QUANTITY.DEFAULT) {
          postFetchCartItem({ id: product.id });
        } else {
          postFetchCartItem({ id: product.id });
          putFetchCartItem({ quantity: quantity });
        }
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
      if (quantity === SHOPPING_QUANTITY.DEFAULT) {
        postFetchCartItem({ id: product.id });
      } else {
        putFetchCartItem({ quantity: quantity });
      }
      return;
    };
  };

  const deleteShoppingItems = (productsId: number[]) => {
    setShoppingCart(shoppingCart.filter((item) => !productsId.includes(item.id)));
  };

  return { shoppingCart, updateShoppingCart, deleteShoppingItems };
};

export default useShoppingCart;
