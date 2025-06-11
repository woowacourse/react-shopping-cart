import { deleteCartItem } from '../api/deleteCartItem';
import { updateCartItem } from '../api/updateCartItem';
import { useCartContext } from '../contexts/CartContext';

const useCartMutations = (id: number) => {
  const { fetch } = useCartContext();

  const remove = () => deleteCartItem(id).then(fetch);
  const increase = (quantity: number) =>
    updateCartItem(id, quantity + 1).then(fetch);
  const decrease = (quantity: number) =>
    updateCartItem(id, quantity - 1).then(fetch);

  return { remove, increase, decrease };
};

export default useCartMutations;
