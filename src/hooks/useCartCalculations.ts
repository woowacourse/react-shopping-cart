import {
  filterCheckedItems,
  calculateTotalPrice,
  calculateTotalQuantity,
  calculateShippingFee,
} from '../utils/cartCalculations';
import { useCartItemsData } from './useCartItemsData';

interface UseCartCalculationsProps {
  checkedIds: number[];
}

export const useCartCalculations = ({ checkedIds }: UseCartCalculationsProps) => {
  const cartItems = useCartItemsData();
  const items = cartItems?.content;

  const checkedCartItems = items ? filterCheckedItems(items, checkedIds) : [];
  const price = calculateTotalPrice(checkedCartItems);
  const totalCount = calculateTotalQuantity(checkedCartItems);
  const hasItems = checkedIds.length > 0;
  const shippingFee = calculateShippingFee(price, hasItems);
  const totalPrice = price + shippingFee;

  return {
    checkedCartItems,
    price,
    totalCount,
    shippingFee,
    totalPrice,
  };
};
