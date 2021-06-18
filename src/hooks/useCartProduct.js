import { useSelector } from 'react-redux';
import { getFormattedAsKRW } from '../utils';

export const useCartProduct = () => {
  const cartProducts = useSelector(({ cartReducer }) => Object.values(cartReducer.products));
  const selectedProducts = cartProducts.filter(({ isSelected }) => isSelected);
  const totalPrice = selectedProducts.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);
  const totalPriceAsKRW = getFormattedAsKRW(totalPrice);
  const isAllSelected = cartProducts.every(({ isSelected }) => isSelected);
  const isAllUnselected = !cartProducts.some(({ isSelected }) => isSelected);

  return {
    cartProducts,
    selectedProducts,
    totalPrice,
    totalPriceAsKRW,
    isAllSelected,
    isAllUnselected,
  };
};
