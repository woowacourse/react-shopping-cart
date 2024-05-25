import { useRecoilState } from 'recoil';
import { updateCartItemQuantity } from '../api';
import { cartItemQuantity } from '../recoil/atoms';

export default function useQuantityControls(itemId: number) {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(itemId));

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
