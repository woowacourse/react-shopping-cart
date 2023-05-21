import { client, path } from '../api';
import type { CartItem, Product } from '../type';
import useMutation from './useMutation';

const useCartMutations = () => {
  const createCartItem = useMutation(async (productId: Product['id']) => {
    const response = await client.post('/cart-items', { productId }).acceptOrThrow(201);
    const cartItemId = Number(
      String(response.headers.location)
        .match(/(\d+)$/)
        ?.at(0),
    );
    return cartItemId;
  });

  const updateCartItemQuantity = useMutation(
    async (cartItemId: CartItem['id'], quantity: number) => {
      await client
        .patch(path('/cart-items/:cartItemId', cartItemId), { quantity })
        .acceptOrThrow(200);
    },
  );

  const deleteCartItem = useMutation(async (cartItemId: CartItem['id']) => {
    await client.delete(path('/cart-items/:cartItemId', cartItemId)).acceptOrThrow(204);
  });

  return { createCartItem, updateCartItemQuantity, deleteCartItem };
};

export default useCartMutations;
