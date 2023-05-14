import { useRecoilState } from 'recoil';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import shoppingCartState from '@Atoms/shoppingCartState';

import { SHOPPING_QUANTITY } from '@Constants/index';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = (product, quantity) => {
    const shoppingItem = shoppingCart.find((item) => item.product.id === product.id);

    if (!shoppingItem) {
      addNewShoppingItem(product, quantity);
      return;
    }

    const productId = shoppingItem.product.id;

    if (quantity !== SHOPPING_QUANTITY.MIN) {
      updateShoppingItem(productId, quantity);
      return;
    }

    removeShoppingItem(productId);
  };

  const addNewShoppingItem: UpdateShoppingCart = (product, quantity) => {
    const newShoppingItem = {
      id: Date.now(),
      quantity,
      product,
    };
    setShoppingCart([...shoppingCart, newShoppingItem]);
  };

  const removeShoppingItem = (productId: number) => {
    setShoppingCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateShoppingItem = (productId: number, quantity: number) => {
    setShoppingCart((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        return {
          ...item,
          quantity,
        };
      }),
    );
  };

  return { shoppingCart, updateShoppingCart };
};

export default useShoppingCart;
