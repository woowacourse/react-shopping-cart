import { useRecoilState } from 'recoil';
import { updateCartItemQuantity } from '../api';
import { cartItemQuantityState } from '../recoil';

export default function useQuantityControls(itemId: number) {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityState(itemId));

  const updateQuantity = (newQuantity: number) => {
    updateCartItemQuantity(itemId, newQuantity).then(() => {
      setQuantity(newQuantity);
    });
  };

  const increase = () => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  };

  const decrease = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      updateQuantity(newQuantity);
    }
  };
  return {
    quantity,
    increase,
    decrease,
  };
}
