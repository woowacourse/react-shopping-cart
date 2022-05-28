import { useSelector } from 'react-redux';

export const useCartItem = () => {
  const { items } = useSelector((state) => state.cart);
  return items;
};
