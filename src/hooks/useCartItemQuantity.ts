import { useRecoilState } from 'recoil';
import { requestSetCartItemQuantity } from '../apis/requests/cartItemList';
import { cartItemQuantityState } from '../recoil/cartItem/cartItemQuantityState';

export const useCartItemQuantity = (cartItemId: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityState(cartItemId));

  const increaseQuantity = async () => {
    const increasedQuantity = quantity + 1;
    await requestSetCartItemQuantity(cartItemId, increasedQuantity);

    setQuantity(increasedQuantity);
  };

  const decreaseQuantity = async () => {
    const decreasedQuantity = Math.max(0, quantity - 1);
    await requestSetCartItemQuantity(cartItemId, decreasedQuantity);

    setQuantity(decreasedQuantity);
  };

  return { quantity, setQuantity, increaseQuantity, decreaseQuantity };
};
