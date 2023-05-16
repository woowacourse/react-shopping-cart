import { useRecoilState } from 'recoil';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import shoppingCartState from '@Atoms/shoppingCartState';

import { SHOPPING_QUANTITY } from '@Constants/index';

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
  return { shoppingCart, updateShoppingCart };
};

export default useShoppingCart;
