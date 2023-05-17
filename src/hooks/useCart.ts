import { useRecoilState, useSetRecoilState } from 'recoil';
import client from '../api';
import cartState from '../recoil/atoms/cartState';
import type { CartItem } from '../type';
import useMutation from './useMutation';

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const { mutate: deleteCartItems } = useMutation(async (cartItemIds: Array<CartItem['id']>) => {
    setCart((cart) => cart.filter((cartItem) => !cartItemIds.includes(cartItem.id)));

    await Promise.all(cartItemIds.map((cartItemId) => client.delete(`/cart-items/${cartItemId}`)));
  });

  return { cart, deleteCartItems };
};

export default useCart;
