import { useRecoilState } from 'recoil';
import { requestSetCartItemQuantity } from '../../apis/cartItemList/cartItemList';
import { cartItemQuantityAtomFamily } from './cartItemAtom';

export const useCartItemQuantity = (cartItemId: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityAtomFamily(cartItemId));

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
