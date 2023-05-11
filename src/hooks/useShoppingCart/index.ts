import shoppingCartState from '@Atoms/shoppingCartState';
import { SHOPPING_QUANTITY } from '@Constants/index';
import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import { useRecoilState } from 'recoil';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = (product, quantity) => {
    const shoppingItem = shoppingCart.find((item) => item.product.id === product.id);

    if (!shoppingItem) {
      const newShoppingItem = {
        id: Date.now(),
        quantity,
        product,
      };
      setShoppingCart([...shoppingCart, newShoppingItem]);
    } else if (quantity !== SHOPPING_QUANTITY.MIN) {
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
    } else {
      setShoppingCart((prev) => prev.filter((item) => item.product.id !== shoppingItem.product.id));
    }
  };

  return { shoppingCart, updateShoppingCart };
};

export default useShoppingCart;
