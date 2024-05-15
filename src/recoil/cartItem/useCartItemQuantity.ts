import { useRecoilState, useSetRecoilState } from 'recoil';
import { setCartItemQuantity } from '../../apis/cartItemList/cartItemList';
import { cartItemQuantityAtomFamily } from './cartItemAtom';

export const useCartItemQuantity = (cartItemId: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityAtomFamily(`${cartItemId}`)); // 대체 필요

  const updateQuantity = useSetRecoilState(cartItemQuantityAtomFamily(`${cartItemId}`));

  const increaseQuantity = async () => {
    const increasedQuantity = quantity + 1;
    await setCartItemQuantity(cartItemId, increasedQuantity);

    setQuantity(increasedQuantity);
  };

  const decreaseQuantity = async () => {
    const decreasedQuantity = Math.max(0, quantity - 1);
    await setCartItemQuantity(cartItemId, decreasedQuantity);

    setQuantity(decreasedQuantity);
  };

  return { quantity, updateQuantity, increaseQuantity, decreaseQuantity };
};
