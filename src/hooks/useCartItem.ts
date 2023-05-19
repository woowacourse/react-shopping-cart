import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { client, path } from '../api';
import cartItemState from '../recoil/selectors/cartItemState';
import type { Product } from '../type';
import useMutation from './useMutation';

const useCartItem = (product: Product) => {
  const [cartItem, setCartItem] = useRecoilState(cartItemState(product.id));

  const { mutate: mutateCartItemQuantity } = useMutation(async (quantity: number) => {
    let cartItemId: number;
    if (cartItem === null) {
      const response = await client.post('/cart-items', { productId: product.id });
      cartItemId = Number(
        String(response.headers.Location)
          .match(/(\d+)$/)
          ?.at(0),
      );
    } else {
      cartItemId = cartItem.id;
    }
    await client.patch(path('/cart-items/:cartItemId', cartItemId), { quantity });
    return cartItemId;
  });

  const { mutate: deleteCartItem } = useMutation(async () => {
    if (cartItem !== null) {
      await client.delete(path('/cart-items/:cartItemId', cartItem.id));
    }
  });

  const setQuantity = useCallback(
    async (quantity: number) => {
      if (quantity <= 0) {
        deleteCartItem();
        setCartItem(null);
        return;
      }
      const cartItemId = await mutateCartItemQuantity(quantity);
      setCartItem({ id: cartItemId, product, quantity });
    },
    [product, setCartItem, deleteCartItem, mutateCartItemQuantity],
  );

  return { cartItem, setQuantity };
};

export default useCartItem;
