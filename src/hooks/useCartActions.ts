import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { client, path } from '../api';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { CartItem, Product } from '../type';
import useCartMutations from './useCartMutations';
import useMutation from './useMutation';

const useCartActions = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const { createCartItem, updateCartItemQuantity, deleteCartItem } = useCartMutations();

  const findCartItemByProductId = useCallback(
    (productId: Product['id']) =>
      cartItems.find((cartItem) => cartItem.product.id === productId) ?? null,
    [cartItems],
  );

  const setQuantity = useCallback(
    async (product: Product, quantity: number) => {
      const cartItem = findCartItemByProductId(product.id);

      if (quantity <= 0) {
        if (cartItem) deleteCartItem.mutate(cartItem.id);

        setCartItems((cartItems) =>
          cartItems.filter((cartItem) => cartItem.product.id !== product.id),
        );
        return;
      }

      if (cartItem) {
        updateCartItemQuantity.mutate(cartItem.id, quantity);
        setCartItems(cartItems.map((it) => (it.id === cartItem.id ? { ...it, quantity } : it)));
        return;
      }

      const cartItemId = await createCartItem.mutate(product.id);
      setCartItems([
        ...cartItems,
        { id: cartItemId, product, quantity, unselectedForOrder: false },
      ]);
    },
    [
      cartItems,
      setCartItems,
      findCartItemByProductId,
      createCartItem,
      updateCartItemQuantity,
      deleteCartItem,
    ],
  );

  const { mutate: deleteCartItems } = useMutation(async (cartItemIds: Array<CartItem['id']>) => {
    setCartItems((cartItems) => cartItems.filter((cartItem) => !cartItemIds.includes(cartItem.id)));

    await Promise.all(
      cartItemIds.map((cartItemId) =>
        client.delete(path('/cart-items/:cartItemId', cartItemId)).acceptOrThrow(204),
      ),
    );
  });

  return { cartItems, findCartItemByProductId, setQuantity, deleteCartItems };
};

export default useCartActions;
